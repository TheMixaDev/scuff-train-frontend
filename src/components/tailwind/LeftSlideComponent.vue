<template>
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10" @close="close">
        <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden" @click="close">
            <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
                <DialogPanel class="pointer-events-auto relative w-screen max-w-md">
                  <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
                    <div class="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <button type="button" class="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white" @click="close">
                        <span class="absolute -inset-2.5" />
                        <span class="sr-only">Закрыть панель</span>
                        <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </TransitionChild>
                  <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div class="px-4 sm:px-6">
                      <DialogTitle class="text-base font-semibold leading-6 text-gray-900">{{ title }}</DialogTitle>
                    </div>
                    <div class="relative mt-6 flex-1 px-4 sm:px-6">
                      <slot></slot>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>
  
  <script setup>
  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { XMarkIcon } from '@heroicons/vue/24/outline'
  import { FrontEndService } from '../../service/FrontEndService';
  
  </script>
  <script>
  export default {
    props: {
        title: String,
        name: String,
        open: {
            type: Boolean,
            default: false
        }
    },
    data() {
      return {
        connection: -1
      }
    },
    methods: {
        /**
         * Close the component and emit a 'close' event.
         *
         * @param {type} paramName - description of parameter
         * @return {type} description of return value
         */
        close() {
            this.$emit('close');
        }
    },
    /**
     * Mounts the component.
     *
     * When the component is mounted, this function is called.
     * It sets up the connection storage using the FrontEndService's
     * `setupConnectionStorage` method, passing in the name of the
     * slide menu plus the name of the component (`this.name`) and
     * the `this.close` method as arguments.
     *
     * @return {void}
     */
    mounted() {
      this.connection = FrontEndService.setupConnectionStorage("slideMenu"+this.name, this.close);
    },
    /**
     * Called right before the component is unmounted.
     */
    beforeUnmount() {
      FrontEndService.removeConnectionStorage(this.connection);
    }
  }
  </script>