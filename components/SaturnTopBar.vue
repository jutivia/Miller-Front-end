<template>
  <!-- Set color to component class name to change color style of buttons in active and inactive state -->
  <div ref="buttons" class="tab-header-ctn">
    <button
      v-for="(item, index) of data.items"
      :id="`btn-${index}`"
      :key="index"
      :class="{active: activeTab === index}"
      @click="event($event.srcElement, index)"
    >
      {{ item }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'SaturnTopBar',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      activeTab: 0
    }
  },
  methods: {
    event (_ev, tab) {
      this.$emit('tab', tab)
      this.activeTab = tab
    }
  }
}
</script>

<style scoped>
  .tab-header-ctn {
    position: relative;
    border-bottom: 2px solid #566ba018;
    margin-bottom: 40px;
    display: flex;
    overflow-x: auto;
  }
  button:active {
    background: transparent;
  }
  button.active {
    color: inherit;
    border-color: inherit;
    border-bottom: 1px solid;
    padding: 0 26px;
  }
  button {
    height: 60px;
    border: 0px;
    font-size: 1.05rem;
    background: transparent;
    color: #00000048;
    margin-right: 12px;
    padding: 0 12px;
    transition: 0.3s;
  }

  @media screen and (max-width: 800px) {
    button {
      font-size: 0.775rem;
      padding: 0 6px;
    }
    button.active {
      padding: 0 12px;
    }
  }
</style>
