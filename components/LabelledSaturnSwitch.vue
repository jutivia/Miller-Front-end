<template>
  <div class="switch-btn-ctn large">
    <span :class="['switch-button', (state === 'ON' ? 'active' : 'inactive')]">
      <button @click="event('OFF')">
        {{ (data.negativeText === undefined || data.negativeText === '' || data.negativeText === null ? 'OFF' : data.negativeText) }}
      </button>
      <button @click="event('ON')">
        {{ (data.positiveText === undefined || data.positiveText === '' || data.positiveText === null ? 'ON' : data.positiveText) }}
      </button>
    </span>
  </div>
</template>

<script>
export default {
  name: 'LabelledSaturnSwitch',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      state: this.data.state,
      changes: 0
    }
  },
  methods: {
    event (state) {
      this.state = state
      this.$emit('state', state)
    }
  }
}
</script>

<style scoped>
.switch-button {
  position: relative;
  display: inline-flex;
  margin-left: 32px;
  min-width: 120px;
  height: 32px;
  /* border-radius: 50px; */
  background: #0000003b;
  transition: 0.3s;
  border: 1px solid #A1A1A1
}
button {
  border: 0;
  transition: 0.2s;
  flex-basis: 50%;
  padding: 0 12px;
}
.switch-button.inactive button:nth-child(1)  {
  background: #D6D6D6;
  color: #FFFFFF;
}
.switch-button.inactive button:nth-child(2)  {
  background: #E6E9EE;
  color: #C8C8D8;
}
.switch-button.active button:nth-child(1)  {
  background: #E6E9EE;
  color: #C8C8D8;
}
.switch-button.active button:nth-child(2)  {
  background: orange;
  color: #FFFFFF;
}
button.active  {
  background: #F87023;
}
</style>
