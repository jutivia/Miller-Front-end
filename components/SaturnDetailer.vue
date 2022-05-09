<template>
  <div v-if="data !== null" class="saturn-details-ctn">
    <div class="header">
      <div class="text">
        {{ data.header }}
      </div>
      <button class="clear-btn" @click="collapsed = !collapsed">
        <svg
          :class="[(collapsed ? 'rotate-0' : 'rotate-180')]"
          width="24"
          height="24"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path opacity="0.4" d="M17.3337 9.00033C17.3337 13.5962 13.5953 17.3337 9.00033 17.3337C4.40533 17.3337 0.666992 13.5962 0.666992 9.00033C0.666992 4.40533 4.40533 0.666992 9.00033 0.666992C13.5953 0.666992 17.3337 4.40533 17.3337 9.00033Z" fill="#75759E" />
          <path d="M12.518 7.79831C12.518 7.95748 12.4572 8.11748 12.3355 8.23914L9.44388 11.145C9.32638 11.2625 9.16721 11.3283 9.00055 11.3283C8.83471 11.3283 8.67555 11.2625 8.55805 11.145L5.66471 8.23914C5.42138 7.99498 5.42138 7.59998 5.66638 7.35581C5.91138 7.11248 6.30721 7.11331 6.55055 7.35748L9.00055 9.81831L11.4505 7.35748C11.6939 7.11331 12.0889 7.11248 12.3339 7.35581C12.4572 7.47748 12.518 7.63831 12.518 7.79831Z" fill="#75759E" />
        </svg>
      </button>
    </div>
    <div v-show="!collapsed" class="content come-down">
      <div class="line squeeze-out-x" />
      <div class="main">
        <div v-for="(cell, index) in data.cells" :key="`cell${index}`" class="cell">
          <div class="cell-title">
            {{ cell.title }}
          </div>
          <div class="cell-content">
            {{ cell.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="stuff">
    Add <b>Correct and Full</b> Data to mount table
  </div>
</template>

<script>
export default {
  name: 'SaturnTable',
  props: {
    /**
     * @name data
     * @type {Object}
     * @returns Encapsulated Data of to be rendered by DOM table
     *  @name data.header
     *  @name data.collapsed
     *  @name data.cells
     *    @type {Array}
     *    @returns array of objects (Cells) with properties: title and content
     */
    data: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      collapsed: this.data.collapsed
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
    this.$emit('created')
  },
  mounted () {
    this.$emit('mounted')
  },
  methods: {
    formatDate (dateString) {
      const date = new Date(dateString)
      const dayString = `${this.months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
      const timeString = date.toLocaleTimeString()
      return `${dayString},  ${timeString}`
    },
    formatCurrency (num) {
      return '₦' + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    },
    /**
     * @type {String}
     * @returns formatted and more accurate string based on the type assigned in {dataMutable.headers[i].key}
     *  valid keys are 'date/time', 'currency'
     */
    formatCell (type, rawContent) {
      if (type === 'date/time') {
        return this.formatDate(rawContent)
      } else if (type === 'currency') {
        return this.formatCurrency(rawContent)
      } else {
        return rawContent
      }
    }
  }
}
</script>

<style scoped>
.saturn-details-ctn {
  border: 1px solid #E2E2EA;
  border-radius: 20px;
  padding: 2rem;
}
.saturn-details-ctn .header {
  display: flex;
  justify-content: space-between;
}
.clear-btn {
  border: none;
  background-color: transparent;
  cursor: pointer;
  outline: none;
}
.content .line{
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #c2c2c2;
}
.header > .text {
  font-size: 1.2rem;
  font-weight: 700;
}

/* MAIN CONTENT */
.content .main {
  display: grid;
  grid-template-columns: repeat(4, 24%);
  gap: 1%;
}
.cell-title {
  word-break: break-all;
  color: #75759E;
  margin-bottom: 20px;
  font-weight: 400;
}
.cell-title::after {
  content: ':';
}
.cell-content {
  word-break: break-all;
  font-weight: 700;
  margin-bottom: 24px;
}

/* ANIMATIONS */
.come-down {
  animation: come-down .5s ease-in-out;
  -webkit-animation: come-down .5s ease-in-out;
}
@keyframes come-down {
  0% {
    opacity: 0;
    transform: translateY(-20px);
    -webkit-transform: translateY(-20px);
    -moz-transform: translateY(-20px);
    -ms-transform: translateY(-20px);
    -o-transform: translateY(-20px);
  }
    100% {
      opacity: 1;
      transform: translateY(0px);
      -webkit-transform: translateY(0px);
      -moz-transform: translateY(0px);
      -ms-transform: translateY(0px);
      -o-transform: translateY(0px);
  }
}

.squeeze-out-x {
  animation: squeeze-out-x 0.7s ease-in-out;
  -webkit-animation: squeeze-out-x 0.7s ease-in-out;
}
@keyframes squeeze-out-x {
  0% {
    transform: scaleX(0);
  }
  50% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
}

.rotate-180 {
  animation: rotate-180 0.3s ease-in-out forwards;
  -webkit-animation: rotate-180 0.3s ease-in-out forwards;
}
@keyframes rotate-180 {
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(180deg)
  }
}

.rotate-0 {
  animation: rotate-0 0.3s ease-in-out forwards;
  -webkit-animation: rotate-0 0.3s ease-in-out forwards;
}
@keyframes rotate-0 {
  0% {
    transform: rotate(180deg)
  }
  100% {
    transform: rotate(0deg)
  }
}

@media only screen and (max-width: 500px) {
  .content .main {
  display: grid;
  grid-template-columns: repeat(2, 50%);
  gap: 1%;
}
}
</style>
