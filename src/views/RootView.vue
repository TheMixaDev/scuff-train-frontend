<script setup>
import TopMenuComponent from '../components/tailwind/TopMenuComponent.vue';
import MapComponent from '../components/MapComponent.vue';
import LeftSlideComponent from '../components/tailwind/LeftSlideComponent.vue';
import StationsListComponent from '../components/tailwind/StationsListComponent.vue';
import { StationService } from '../service/StationService';
import TrainCarListComponent from '../components/tailwind/TrainCarListComponent.vue';
import { TrainService } from '../service/TrainService';
</script>

<template>
    <TopMenuComponent @import="_0"
                        @export="_0"
                        @stations="panels.stations = true"
                        @trains="panels.trainCars = true"/>
    <MapComponent style="width: 100%;" :stations="stations"/>
    <LeftSlideComponent class="side-components" title="Список станций"
        :open="panels.stations"
        name="Stations"
        @close="panels.stations = false">
        <StationsListComponent :stations="stations"/>
    </LeftSlideComponent>
    <LeftSlideComponent class="side-components" title="Список поездов"
        :open="panels.trainCars"
        name="TrainCars"
        @close="panels.trainCars = false">
        <TrainCarListComponent :trainCars="trainCars"/>
    </LeftSlideComponent>
</template>

<script>
import { FrontEndService } from '../service/FrontEndService';

export default {
    name: 'RootView',
    data() {
        return {
            panels: {
                stations: false,
                trainCars: false
            },
            stations: [],
            trainCars: []
        }
    },
    methods: {
        /**
         * Fetches stations using the StationService API.
         *
         * @param {function} callback - The callback function to handle the response data.
         * @param {function} errorCallback - The callback function to handle any errors.
         * @return {void} This function does not return a value.
         */
        fetchStations() {
            StationService.getAllStations(data => {
                this.stations = data.stations;
            }, this.handleError);
        },
        /**
         * Fetches trains from TrainService and assigns the retrieved train cars to 
         * the 'trainCars' property of the component.
         *
         * @param {function} successCallback - A callback function to handle the 
         *   successful retrieval of trains.
         * @param {function} errorCallback - A callback function to handle any errors 
         *   that occur during the retrieval of trains.
         */
        fetchTrains() {
            TrainService.getAllTrains(data => {
                this.trainCars = data.trains;
            }, this.handleError);
        },
        /**
         * Handles the given error.
         *
         * @param {Error} err - The error to handle.
         */
        handleError(err) {
            FrontEndService.defaultErrorHandler(this.$router, err);
        }
    },
    /**
     * Executes when the component is mounted.
     * Fetches the stations and trains.
     *
     * @param {type} paramName - description of parameter
     * @return {type} description of return value
     */
    mounted() {
        this.fetchStations();
        this.fetchTrains();
    }
}
</script>

<style>
.side-components {
    z-index: 999999
}
</style>