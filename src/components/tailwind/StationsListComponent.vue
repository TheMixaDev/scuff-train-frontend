<script setup>
import { FrontEndService } from "../../service/FrontEndService";
import "./ListComponent.css";
</script>
<template>
    <div>
        <input type="text" class="search" placeholder="Поиск" v-model="search"/>
    </div>
    <ul role="list" class="acc acx">
        <li class="ab lx yz abj asc" v-for="station in stations.filter(s => search.length < 1 || s.id.toString().includes(search.toLowerCase()))" :key="station.id" @click="handleClick(station)">
            <div class="tq un">
                <div class="lx yz aaf">
                    <div class="axr aik uo ads aqm">
                        <div class="nm ro ads ahy"></div>
                    </div>
                <h2 class="tq awa awg awp bah">
                    <a href="#" class="lx aac">
                        <span class="adl">Станция {{ station.id }}</span>
                        <span class="axp">/</span>
                        <!--span class="adm">{{ station.current_trains }} поездов</span-->
                        <span class="aa ak"></span>
                    </a>
                </h2>
                </div>
                <div class="lf lx yz aad awc awo axp">
                    <!--p class="adl">Последний: {{ station.departures.id }}</p-->
                    <svg viewBox="0 0 2 2" class="nc rd uo aon">
                    <circle cx="1" cy="1" r="1"></circle>
                    </svg>
                    <!--p class="adm">Отбытие: {{ FrontEndService.convertTime(station.departures.move_time) }} назад</p-->
                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="nz sb uo axp">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"></path>
            </svg>
        </li>
    </ul>
</template>
<style>
.adl, .adm {
    color: black!important;
}
</style>
<script>
export default {
    props: {
        stations: Array
    },
    data() {
        return {
            search: ""
        }
    },
    methods: {
        /**
         * Handles the click event for a station.
         *
         * @param {Object} station - The station object.
         */
        handleClick(station) {
            FrontEndService.setConnectionStorage("map", {
                action: "center",
                data: FrontEndService.convertCoords(station.coords),
                show: {
                    type: "station",
                    id: station.id
                }
            });
            FrontEndService.setConnectionStorage("slideMenuStations", {});
            this.$emit('close');
        }
    }
}
</script>
<style>
.search {
  margin: 20px 0px 0px 20px;
  width: calc(100% - 40px);
}
</style>