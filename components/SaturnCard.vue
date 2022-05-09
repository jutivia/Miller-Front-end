<template>
  <div class="display-card">
    <div class="card-title">
      <div class="text">
        {{ data.label }}
      </div>
      <div class="icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.1528 5.55559C10.2037 5.65925 10.2373 5.77027 10.2524 5.8844L10.5308 10.0243L10.669 12.1051C10.6705 12.3191 10.704 12.5317 10.7687 12.7361C10.9356 13.1326 11.3372 13.3846 11.7741 13.3671L18.4313 12.9316C18.7196 12.9269 18.998 13.0347 19.2052 13.2313C19.3779 13.3952 19.4894 13.6096 19.5246 13.8402L19.5364 13.9802C19.2609 17.795 16.4592 20.9767 12.6524 21.7981C8.84555 22.6194 4.94186 20.8844 3.06071 17.535C2.51839 16.5619 2.17965 15.4923 2.06438 14.389C2.01623 14.0624 1.99503 13.7326 2.00098 13.4026C1.99503 9.31279 4.90747 5.77702 8.98433 4.92463C9.47501 4.84822 9.95603 5.10798 10.1528 5.55559Z" fill="#75759E" />
          <path opacity="0.4" d="M12.8701 2.00082C17.43 2.11683 21.2624 5.39579 22.0001 9.81229L21.993 9.84488L21.9729 9.89227L21.9757 10.0224C21.9652 10.1947 21.8987 10.3605 21.784 10.4945C21.6646 10.634 21.5014 10.729 21.3217 10.7659L21.2121 10.7809L13.5313 11.2786C13.2758 11.3038 13.0214 11.2214 12.8314 11.052C12.6731 10.9107 12.5719 10.7201 12.5433 10.5147L12.0277 2.84506C12.0188 2.81913 12.0188 2.79102 12.0277 2.76508C12.0348 2.55367 12.1278 2.35384 12.2861 2.21023C12.4444 2.06662 12.6547 1.9912 12.8701 2.00082Z" fill="#75759E" />
        </svg>
      </div>
    </div>
    <p class="card-body">
      {{ formatContent(data.value.type, data.value.content) }}
    </p>
  </div>
</template>

<script>
export default {
  /**
     * @name data
     * @type {Object}
     * @returns Encapsulated Data to be displayed in card
     * @name data.label is the main title description of the card
     * @name data.value is an object that must contain the content type and content  to be displayed
     * @name data.value.type maybe 'date/time', 'currency', 'string' or 'number', used to manipulate the content
     */
  props: {
    data: {
      type: Object,
      default () {
        return {
          label: 'Description',
          value: { type: 'string', content: 'Content Here' }
        }
      }
    }
  },
  computed: {
    months () {
      return ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December']
    }
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
    formatNumber (num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    },
    formatContent (type, rawContent) {
      if (type === 'date/time') {
        return this.formatDate(rawContent)
      } else if (type === 'currency') {
        return this.formatCurrency(rawContent)
      } else if (type === 'number') {
        return this.formatNumber(rawContent)
      } else {
        return rawContent
      }
    }
  }
}
</script>

<style scoped>
.display-card{
  background-color: white;
  padding: 25px 25px;
  border-radius: 20px;
  border: 1px solid #E2E2EA;
  flex-basis: 32%;
  margin-right: 1.3%;
  margin-bottom: 2%;
}
.display-card.elevated {
  box-shadow: 0px 12px 12px rgba(181, 181, 190, 0.2);
}
.card-title{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 14px;
  color:#75759E;
  margin-bottom: 0px;
  align-content: center;
}
.card-body{
  color: #171725;
  font-weight: 600;
  font-size: 24px;
}

@media screen and (max-width: 1050px) {
  .display-card{
    flex-basis: 48%;
    margin-right: 2%;
  }
}

@media screen and (max-width: 800px) {
  .display-card{
    flex-basis: 100%;
    margin-right: 0%;
  }
}
</style>
