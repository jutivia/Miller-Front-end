<template>
  <button
    :disabled="dataMutable.disabled"
    :class="[
      'saturn-btn',
      {
        'full-width': dataMutable.fullWidth,
        outlined: dataMutable.outlined,
        disabled: dataMutable.disabled,
        centralized: dataMutable.centralized
      }
    ]"
  >
    {{ data.text }}
    <!-- <div class="icon">
      <svg
        width="26"
        height="26"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M7.03865 5.18693C7.16598 5.18693 7.29398 5.2356 7.39131 5.33293L9.71598 7.64626C9.80998 7.74026 9.86265 7.8676 9.86265 8.00093C9.86265 8.1336 9.80998 8.26093 9.71598 8.35493L7.39131 10.6696C7.19598 10.8643 6.87998 10.8643 6.68465 10.6683C6.48998 10.4723 6.49065 10.1556 6.68598 9.96093L8.65465 8.00093L6.68598 6.04093C6.49065 5.84626 6.48998 5.53026 6.68465 5.33426C6.78198 5.2356 6.91065 5.18693 7.03865 5.18693Z" fill="#FFFFFF" />
      </svg>
    </div> -->
  </button>
</template>

<script>
export default {
  name: 'SaturnButton',
  props: {
    /**
     * @name data
     * @type {Object}
     * @returns Encapsulated Data of to be rendered by DOM Button
     *  @name data.text is the text of the Button, must have a type of String
     *  @name data.fullWidth set to true allows the button to span its container, must have a type of Boolean
     *  @name data.outlined set to true allows the button to have a white background and a tinted border , must have a type of Boolean
     *  @name data.disabled set to true gives the button a disabled state , must have a type of Boolean
     *  @name data.centralized set to true centers the button in its container, must have a type of Boolean
     */
    data: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      dataMutable: { ...this.data }
    }
  }
}
</script>

<style scoped>
.saturn-btn {
  height: 50px;
  background: #F87023;
  border-radius: 20px;
  padding: 10px;
  border: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-width: 200px;
  color: #FFFFFF;
  font-weight: 600;
  font-size: 14px;
  transition: 0.3s;
  cursor: pointer;
}
.saturn-btn.centralized {
  margin-left: auto;
  margin-right: auto;
}
.saturn-btn:active {
  background: #F87023 !important;
  color: #FFFFFF !important;
}
.saturn-btn.full-width {
  min-width: auto;
  width: 100%;
  /* justify-content: space-between; */
  padding: 0 5%;
}
.saturn-btn.outlined {
  background: transparent;
  border: 1px solid #F87023;
  color: #F87023;
}
.saturn-btn.disabled {
  background: #BBBBBB;
  color: #FFFFFF;
}
.saturn-btn.outlined.disabled {
  background: #E2E2E2;
  border: 1px solid #BBBBBB;
  color: #BBBBBB;
  cursor: not-allowed;
}
</style>
