<script setup>
import { FrontEndService } from "../../service/FrontEndService";
import "./ListComponent.css";
</script>
<template>
    <input type="text" class="search" placeholder="Поиск" v-model="search"/>
    <ul role="list" class="acc acx">
        <li class="ab lx yz abj asc" v-for="trainCar in trainCars.filter(s => search.length < 1 || s.id.toString().includes(search.toLowerCase()))" :key="trainCar.id" @click="handleClick(trainCar)">
            <div class="tq un">
                <div class="lx yz aaf">
                    <div :class="[trainCar.is_move ? 'axw ajg': 'azi akr', 'uo ads aqm']">
                        <div class="nm ro ads ahy"></div>
                    </div>
                <h2 class="tq awa awg awp bah">
                    <a href="#" class="lx aac">
                        <span class="adl">От: {{ trainCar.start_id }}</span>
                        <span class="axp">/</span>
                        <span class="adm">До: {{ trainCar.dest_id }}</span>
                        <span class="aa ak"></span>
                    </a>
                </h2>
                </div>
                <div class="lf lx yz aad awc awo axp">
                    <p class="adl">В пути: {{ trainCar.is_move ? "Да" : "Нет" }}</p>
                    <svg viewBox="0 0 2 2" class="nc rd uo aon">
                    <circle cx="1" cy="1" r="1"></circle>
                    </svg>
                    <p class="adm">{{ trainCar.is_move ? "В пути:" : "Простой:" }} {{ FrontEndService.convertTime(trainCar.move_time) }}</p>
                </div>
            </div>
            <div class="aye ajn bcu ads uo arp ard awc awe bbt bbx">{{ trainCar.id }}</div>
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
        trainCars: Array
    },
    data() {
        return {
            search: "",
            trainData: {
                showModal: false,
                train: {
                    coords: {},
                    wagons: []
                }
            }
        }
    },
    methods: {
        /**
         * Handles the click event for a train car.
         *
         * @param {Object} trainCar - The train car that was clicked.
         * @return {void} This function does not return a value.
         */
        handleClick(trainCar) {
            FrontEndService.setConnectionStorage("map", {
                action: "center",
                show: {
                    type: "trainCar",
                    id: trainCar.id
                }
            });
            FrontEndService.setConnectionStorage("slideMenuTrainCars", {});
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