<template>
    <div :class="['informational-component animate__animated', closing ? 'animate__backOutLeft' : 'animate__backInLeft']">
        <button class="close-button" @click="close">&times;</button>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "InformationComponent",
        data() {
            return {
                closing: false
            }
        },
        methods: {
            /**
             * Closes the component.
             *
             * @return {void}
             */
            close() {
                this.closing = true;
                setTimeout(() => {
                    this.$emit('close');
                    this.closing = false;
                }, 300)
            }
        }
    }
</script>
<style scoped>
.informational-component {
  position: fixed;
  left: 10px;
  top: 70px;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 10000;
}
.close-button {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 20px;
  cursor: pointer;
  border: none;
  background: none;
  color: #333;
}
.content {
  text-align: left;
}
</style>