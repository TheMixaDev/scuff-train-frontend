<template>
    <div :class="['container-fluid modal-body animate__animated', open ? 'animate__fadeIn' : 'animate__fadeOut ultra-fast']" v-show="show">
        <div :class="['container modal-box animate__animated', open ? 'animate__backInUp' : 'animate__backOutUp ultra-fast']">
            <slot></slot>
            <a class="btn" @click="close"><i class="fa-solid fa-arrow-left"></i> Закрыть</a>
        </div>
    </div>
</template>

<script>
export default {
    name: "ModalComponent",
    props: {
        open: Boolean
    },
    data() {
        return {
            show: false
        }
    },
    watch: {
        /**
         * Opens the component.
         *
         * @param {type} newValue - The new value.
         * @return {void} 
         */
        open(newValue) {
            if(newValue) this.show = true;
            else {
                setTimeout(() => {
                    this.show = false;
                }, 300)
            }
        }
    },
    methods: {
        /**
         * Closes the component.
         *
         * @param {void} 
         * @return {void} 
         */
        close() {
            this.$emit('close');
        }
    }
}
</script>

<style scoped>
.btn {
    margin-top: 1rem;
    background-color: white;
    border-radius: 10px;
    border: 1px solid orangered;
    padding: 10px 20px 10px 20px;
    color: black;
    box-shadow: none;
    transition: .3s;
    cursor: pointer;
}
.btn:hover {
    margin-top: 1rem;
    color: white!important;
    background: orangered!important;
    box-shadow: none!important;
}
.container.modal-box {
    padding-top: 1rem;
    padding-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 25px;
    max-width: fit-content;
}
.container-fluid.modal-body {
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    z-index: 99999;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    overflow-y: hidden;
    top: 0;
    left: 0;
    backdrop-filter: blur(10px);
    background-color: rgba(38, 38, 38, 0.46);
}
.ultra-fast {
    --animate-duration: 0.3s;
}
</style>