<template>
  <div class="switch-btn-ctn large" :style="userActiveOnScreen && !detailsSwitchNoted ? 'transform: scale(1.2)' : 'scale(1.0)'">
    <span :class="['switch-button', (state === 'ON' ? 'active' : 'inactive')]" :style="userActiveOnScreen && !detailsSwitchNoted ? 'background: #fff' : ''">
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
      state: this.$store.state.switchState,
      userActiveOnScreen: false
    }
  },
  computed: {
    detailsSwitchNoted () {
      return this.$store.state.switchState
    }
  },
  watch: {
    detailsSwitchNoted () {
      this.state = this.$store.state.switchState
    }
  },
  created () {
    // this.catchOnScrollEventOnWindows()
    // this.$store.commit('setDisableScreen', false)
    // this.$store.commit('setDetailsSwitchNoted', false)
  },
  methods: {
    event (state) {
      this.$store.commit('setSwitchState', state)
      console.log(this.$store.state.switchState)
      this.state = state
    }
    // catchOnScrollEventOnWindows () {
    //   window.addEventListener('scroll', () => {
    //     this.userActiveOnScreen = true
    //     if (!this.$store.state.detailsSwitchNoted) {
    //       this.$store.commit('setDisableScreen', true)
    //       this.$store.commit('setDetailsSwitchNoted', false)
    //     }
    //   }, true)
    // },
    // setDetailsSwitchNoted () {
    //   this.$store.commit('setDetailsSwitchNoted', true)
    //   this.$store.commit('setDisableScreen', false)
    // // }
  }
}
</script>

<style scoped>
.switch-btn-ctn {
  min-height: 88px;
  display: flex;
  align-items: flex-end;
  position: relative;
  z-index: 9;
  transition: 0.2s;
}
.switch-button {
  position: relative;
  display: inline-flex;
  min-width: 300px;
  height: 50px;
  border-radius: 10px;
  background: transparent;
  border: 1px solid #0000003b;
  transition: 0.3s;
  background:  #F4F6FE;
}
button {
  border: 0;
  transition: 0.2s;
  flex-basis: 50%;
  /* padding: 0 5px; */
  /* margin:2px; */
  font-size: 12px;
}
.switch-button.inactive button:nth-child(1)  {
  background: #07124C;
  color:   #F4F6FE;
  border-radius: 10px;
}
.switch-button.inactive button:nth-child(2)  {
  background: transparent;
  color: #07124C;
  border-radius:  10px;
}
.switch-button.active button:nth-child(1)  {
  background: transparent;
  color: #07124C;
  border-radius:10px ;
}
.switch-button.active button:nth-child(2)  {
  background: #07124C;
  color:  #F4F6FE;
  border-radius: 10px;
}
button.active  {
  background: #07124C;
  color: #F4F6FE;
}

</style>
