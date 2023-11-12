<template>
    <Disclosure as="nav" class="bg-black" v-slot="{ open }" id="top-menu-component">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <!-- Mobile menu button-->
            <DisclosureButton class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span class="absolute -inset-0.5" />
              <span class="sr-only">Open main menu</span>
              <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
          <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex flex-shrink-0 items-center">
              <img class="h-8 w-auto" src="/logo.png" alt="Your Company" style="scale: 1.5"/>
            </div>
            <div class="hidden sm:ml-6 sm:block">
              <div class="flex space-x-4">
                <input type="file" @change="handleFileChange" style="display: none;" ref="fileInput">
                <a class="text-gray-300 hover:bg-gray-700 hover:text-whiterounded-md px-3 py-2 text-sm font-medium pointer" @click="openInputDialog">Импорт</a>
                <a
                v-for="item in navigation"
                :key="item.name"
                @click="emitter(item.click)"
                class="text-gray-300 hover:bg-gray-700 hover:text-whiterounded-md px-3 py-2 text-sm font-medium pointer">
                  {{ item.name }}
              </a>
              </div>
            </div>
          </div>
          <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0" style="color: white;">
            {{ time }}
          </div>
        </div>
      </div>
  
      <DisclosurePanel class="sm:hidden">
        <div class="space-y-1 px-2 pb-3 pt-2">
          <a class="text-gray-300 hover:bg-gray-700 hover:text-whiterounded-md px-3 py-2 text-sm font-medium pointer" @click="openInputDialog">Импорт</a>
          <DisclosureButton
            v-for="item in navigation"
            :key="item.name"
            @click="emitter(item.click)"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
              {{ item.name }}
          </DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>
  </template>
  
  <script setup>
  import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
  import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
  </script>
  <script>
  export default {
    name: 'TopMenuComponent',
    computed: {
      refs() {
        return {
          fileInput: this.$refs.fileInput
        }
      }
    },
    data() {
        return {
            time: "--:--:--",
            navigation: [
              { name: 'Список станций', click: 'stations', current: false },
              { name: 'Список поездов', click: 'trains', current: false },
            ]
        }
    },
    methods: {
        /**
         * Updates the time.
         *
         * @param None
         * @return None
         */
        updateTime() {
          const now = new Date();
          const hours = now.getHours().toString().padStart(2, "0");
          const minutes = now.getMinutes().toString().padStart(2, "0");
          const seconds = now.getSeconds().toString().padStart(2, "0");

          const options = { year: 'numeric', month: 'long', day: 'numeric' };
          const dateStr = now.toLocaleDateString('ru-RU', options);

          this.time = `${dateStr} ${hours}:${minutes}:${seconds}`;
        },
        /**
         * Emits the specified event.
         *
         * @param {string} event - The name of the event to emit.
         * @return {void} This function does not return anything.
         */
        emitter(event) {
            this.$emit(event);
        },
        /**
         * Opens an input dialog.
         *
         * @param {type} - No parameters.
         * @return {type} - No return value.
         */
        openInputDialog() {
            this.refs.fileInput.click();
        },
        /**
         * Handles the change event of the file input.
         *
         * @param {Event} event - The change event object.
         */
        handleFileChange(event) {
          if(event.target.files.length > 0) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.readAsText(file);
          }
        }
    },
    /**
     * Mounts the component and updates the time periodically.
     *
     * This function is called when the component is mounted to the DOM.
     * It initializes the time and sets up a timer to update the time every 100 milliseconds.
     *
     * @param {none} - This function does not accept any parameters.
     * @return {none} - This function does not return any value.
     */
    mounted() {
        this.updateTime();
        setInterval(this.updateTime, 100);
    }
  }
  </script>

  <style>
  .pointer {
    cursor: pointer!important;
    border-radius: 10px;
  }
  </style>