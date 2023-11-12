<script setup>
import { VMap, VMapGoogleTileLayer, VMapZoomControl, VMapTileLayer, VMapDivMarker } from 'vue-map-ui';
import ModalComponent from '../components/ModalComponent.vue';
import InformationComponent from '../components/InformationComponent.vue';
import StyledTableComponent from './StyledTableComponent.vue';
</script>

<template>
  <VMap style="height: calc(100vh - 64px)" ref="map" theme="dark" :zoom="2" :min-zoom="2">
    <VMapGoogleTileLayer />
    <VMapTileLayer :max-zoom="19" url="https:/\/{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png" attribution="&copy; OpenRailwayMap"/>
    <VMapZoomControl />
    <VMapDivMarker
        v-for="train in additionalTrains"
        v-model:latlng="train.coords"
        :icon-class="['train']"
        :icon-size="[20, 20]"
        :icon-anchor="[10, 10]"
        :key="train.id"
        @click="focusOnTrain(train.id)" />
    <VMapDivMarker
        v-model:latlng="position"
        :icon-class="['pulse', currentTrain != -1 ? '' : 'transparent']"
        :icon-size="[20, 20]"
        :icon-anchor="[10, 10]"
        :key="markerKey">
        <div class="pulse_back"></div>
    </VMapDivMarker>
    <VMapDivMarker
        v-for="station in stations"
        :key="station.id"
        :latlng="FrontEndService.convertCoords(station.coords)"
        icon-class="station"
        :icon-size="[20, 20]"
        :icon-anchor="[10, 10]"
        @click="showStationData(station)" />
  </VMap>
  <InformationComponent v-show="currentTrain != -1" @close="removeTrainFocus">
    <b>Поезд {{ trainData.id }}</b>
    <p>Путь: {{ trainData.start_id }} - {{ trainData.dest_id }}</p>
    <p>{{ trainData.is_move ? "В движении" : "Простаивает" }} {{ FrontEndService.convertTime(trainData.move_time) }}</p>
    <b>Вагоны:</b>
    <StyledTableComponent :headers="['Номер', 'Старт', 'Направление']">
        <tr v-for="wagon in trainData.wagons" :key="wagon.id">
            <td>{{ wagon.id }}</td>
            <td>{{ wagon.start_id }}</td>
            <td>{{ wagon.dest_id }}</td>
        </tr>
    </StyledTableComponent>
  </InformationComponent>
  <ModalComponent :open="stationData.showModal" @close="stationData.showModal = false" ref="modalComponent">
    <b>Станция {{stationData.station.id}}</b>
    <div style="margin: 15px;">
        <a :class="['station_btn', stationData.selectedTable == 0 ? 'selected' : '']" @click="stationData.selectedTable = 0">Отправления</a>
        <a :class="['station_btn', stationData.selectedTable == 1 ? 'selected' : '']" @click="stationData.selectedTable = 1">Прибытия</a>
        <a :class="['station_btn', stationData.selectedTable == 2 ? 'selected' : '']" @click="stationData.selectedTable = 2">На станции</a>
    </div>
    <StyledTableComponent :headers="['Номер', 'Старт', 'Направление', 'В движении']" v-if="stationData.selectedTable == 0">
        <tr v-for="train in stationData.station.departures" :key="train.id" @click="focusOnTrain(train.id)" class="pointer">
            <td>{{ train.id }}</td>
            <td>{{ train.start_id }}</td>
            <td>{{ train.dest_id }}</td>
            <td>{{ train.is_move ? "Да" : "Нет" }}</td>
        </tr>
    </StyledTableComponent>
    <StyledTableComponent :headers="['Номер', 'Старт', 'Направление', 'В движении']" v-if="stationData.selectedTable == 1">
        <tr v-for="train in stationData.station.arrivals" :key="train.id" @click="focusOnTrain(train.id)" class="pointer">
            <td>{{ train.id }}</td>
            <td>{{ train.start_id }}</td>
            <td>{{ train.dest_id }}</td>
            <td>{{ train.is_move ? "Да" : "Нет" }}</td>
        </tr>
    </StyledTableComponent>
    <StyledTableComponent :headers="['Номер', 'Старт', 'Направление']" v-if="stationData.selectedTable == 2">
        <tr v-for="train in stationData.station.current_trains" :key="train.id" @click="focusOnTrain(train.id)" class="pointer">
            <td>{{ train.id }}</td>
            <td>{{ train.start_id }}</td>
            <td>{{ train.dest_id }}</td>
        </tr>
    </StyledTableComponent>
  </ModalComponent>
</template>

<script>
import { ref } from 'vue';
import { antPath } from 'leaflet-ant-path';
import { FrontEndService } from '../service/FrontEndService';
import { StationService } from '../service/StationService';
import { TrainService } from '../service/TrainService';

export default {
    props: {
        stations: Array
    },
    data() {
        return {
            connection: -1,
            nullInterval: -1,
            position: [0, 0],
            currentTrain: -1,
            additionalTrains: [],
            markerKey: ref(0),
            stationData: {
                showModal: false,
                selectedTable: 0,
                station: {
                    coords: {}
                }
            },
            trainData: {
                wagons: []
            },
            pathLayer: null,
            mapReady: false,
            updateInterval: -1
        }
    },
    methods: {
        /**
         * Sets the path of the map.
         *
         * @param {Object} pathData - The data for the path.
         */
        setPath(pathData) {
            if(!this.mapReady) return;
            const map = this.$refs.map.map;
            if(this.pathLayer != null)
                map.removeLayer(this.pathLayer);
            this.pathLayer = antPath(pathData, {
                "delay": 400,
                "dashArray": [
                    10,
                    20
                ],
                "weight": 5,
                "color": "red",
                "pulseColor": "#FFFFFF",
                "paused": false,
                "reverse": false,
                "hardwareAccelerated": true
            });
            map.addLayer(this.pathLayer);
            //map.fitBounds(this.pathLayer.getBounds());
        },
        /**
         * Check if the "map" property of the "$refs" object is not null.
         * If it is not null, clear the "nullInterval" and set "mapReady" to true.
         */
        checkIsNotNull() {
            if(this.$refs.map.map) {
                clearInterval(this.nullInterval);
                this.mapReady = true;
            }
        },
        /**
         * Centers the map to the specified coordinates and zoom level.
         *
         * @param {Array} coordinates - The coordinates to center the map on.
         * @param {Number} zoom - The zoom level of the map.
         */
        centerMap(coordinates, zoom) {
            if(!this.mapReady) return;
            this.$refs.map.map.setView(coordinates, zoom);
        },
        /**
         * Handles the action based on the provided data.
         *
         * @param {Object} data - The data object containing the action information.
         */
        onAction(data) {
            if(data.action == "center") {
                if(data.show && data.show.type == "station") {
                    this.centerMap(data.data, 6);
                    this.stations.forEach(s => s.dataShown = s.id == data.show.id ? true : false);
                }
                else if(data.show && data.show.type == "trainCar") {
                    let trainId = data.show.id;
                    this.focusOnTrain(trainId);
                }
            }
        },
        /**
         * Focuses on a specific train.
         *
         * @param {number} trainId - The ID of the train to focus on.
         */
        focusOnTrain(trainId) {
            TrainService.getFullTrain(trainId, train => {
                train = train.train;
                if(this.stationData.showModal)
                    this.stationData.showModal = false;
                this.currentTrain = trainId;
                this.position = FrontEndService.convertCoords(train.coords);
                this.centerMap(this.position, 6);
                this.trainData = train;
                TrainService.getTrainPathFull(trainId, path => {
                    path = path.path;
                    this.setPath(path.path_data);
                    /*this.additionalTrains = path.trains_on_path
                        .filter(t => t.id != trainId)
                        .map(t => ({ id: t.id, coords: FrontEndService.convertCoords(t.coords) }));*/
                })
            }, this.handleError);
        },
        /**
         * Remove the focus on the train and clear the additional trains.
         * If a path layer exists, remove it from the map.
         */
        removeTrainFocus() {
            this.currentTrain = -1;
            this.additionalTrains = [];
            if(this.pathLayer != null)
                this.$refs.map.map.removeLayer(this.pathLayer);
        },
        /**
         * Retrieves and displays station data.
         *
         * @param {Object} station - The station object containing the ID.
         * @return {undefined} No return value.
         */
        showStationData(station) {
            StationService.getStation(station.id, data => {
                this.stationData.station = data;
                this.stationData.showModal = true;
            }, this.handleError);
        },
        /**
         * Handle an error.
         *
         * @param {any} err - The error to handle.
         */
        handleError(err) {
            FrontEndService.defaultErrorHandler(this.$router, err);
        },
        /**
         * Move the pulse position for debugging purposes.
         *
         * @return {void}
         */
        movePulsePosition() { //debugging
            this.position = [this.position[0]+0.1, this.position[1]];
            return;
        },
        /**
         * Updates the trains data.
         *
         * @return {undefined} No return value.
         */
        updateTrainsData() {
            if(this.currentTrain < 0) return;
            TrainService.getShortTrain(this.currentTrain, train => {
                train = train.train;
                this.position = FrontEndService.convertCoords(train.coords);
            }, this.handleError)
        }
    },
    /**
     * Mount the component and initialize necessary variables and intervals.
     *
     * @param {void}
     * @return {void}
     */
    mounted() {
        this.nullInterval = setInterval(this.checkIsNotNull, 0);
        this.connection = FrontEndService.setupConnectionStorage("map", this.onAction);
        this.updateInterval = setInterval(this.updateTrainsData, 3000);
    },
    /**
     * Unmounts the component before it is destroyed.
     *
     * @return {void} 
     */
    beforeUnmount() {
        FrontEndService.removeConnectionStorage(this.connection);
        clearInterval(this.updateInterval);
    }
}
</script>

<style>
.transparent {
    background-color: transparent!important;
    cursor: none!important;
    display: none!important;
}
.pulse {
  background-color: #EB5525;
  color: white;
  border-radius: 50%;
  font-size: 0.75rem;
  line-height: 23px;
  text-align: center;
}
.train {
    background-color: #7036BD;
    color: white;
    border-radius: 50%;
    font-size: 0.75rem;
    line-height: 23px;
    text-align: center;
}
.pulse_back {
    width:100%;
    height: 100%;
    scale: 2;
    border-radius: 50%;
    background-color: #EB5525;
    opacity: 0.25;
    /*animation: pulse 1s infinite;*/
}
@keyframes pulse {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(3);
        opacity: 0.0;
    }
}
.station {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 20px solid black;
}
.station_btn {
    margin: 10px;
    background-color: white;
    border-radius: 10px;
    border: 1px solid #9b73d1;
    padding: 10px 20px 10px 20px;
    color: black;
    box-shadow: none;
    transition: .3s;
    cursor: pointer;
}
.pointer {
    cursor: pointer!important;
}
.station_btn:hover {
    color: white;
    background: #9b73d1;
}
.selected {
    color: white!important;
    background-color: #9b73d1!important;
}
.selected:hover {
    color: #9b73d1!important;
    background-color: white!important;
}
</style>