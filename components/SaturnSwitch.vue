<template>
  <div class="switch-btn-ctn large">
    <span :class="['switch-button', (active ? 'active' : 'inactive')]" @click="event(active)">
      <button class="circle" />
    </span>
  </div>
</template>

<script>
export default {
  name: 'SaturnSwitch',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      active: this.data.state,
      changes: 0
    }
  },
  methods: {
    event (activeState) {
      this.$emit('state', !activeState)
      this.active = !activeState
    }
  }
}
</script>

<style scoped>
.switch-button {
  position: relative;
  display: inline-block;
  margin-left: 32px;
  width: 45px;
  height: 20px;
  border-radius: 50px;
  background: #0000003b;
  transition: 0.3s;
}
.circle {
  height: 25px;
  width: 25px;
  border-radius: 100%;
  background: #344563;
  position: absolute;
  top: -3px;
  left: 25px;
  transition: 0.3s;
  border: 0px;
}
.switch-button.inactive .circle  {
  background: #b3b3b3;
  left: 0px;
}
</style>
