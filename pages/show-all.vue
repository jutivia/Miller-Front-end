<template>
  <div>
    <div class="grid">
      <div class="lhs">
        <span class="filter_flex">
          Filter
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 4H13V6H3V4ZM0 0H16V2H0V0ZM6 8H10V10H6V8Z" fill="black" />
          </svg>
        </span>
        <br>
        <div class="category_flex">
          <select v-model="category" placeholder="Select Category" required class="select_category">
            <option value="" selected>
              Select category
            </option>
            <option
              v-for="(unit, index) in categories"
              :key="index"
              :value="unit"
            >
              {{ unit }}
            </option>
          </select>
          <div>
            <saturn-switch
              :data="switchData3"
            />
          </div>
        </div>
      </div>
      <div class="popular_categories">
        <h4 class="Big_text">
          Popular Categories
        </h4>
        <div class="category_flex">
          <span v-for="unit,i in categorySet" :key="i" class="small_text">{{ capitalize(unit) }}</span>
        </div>
      </div>
    </div>
    <div v-for="(item,index) in data" :key="index" class="grid">
      <div class="lhs">
        <h4 class="Big_text">
          {{ item.title.toUpperCase() }}
        </h4>
        <div class="sub_text">
          <p />
          <p>{{ fullDate(item.createdAt) }}</p>
        </div>
        <p
          class="small_text"
          style="color: #575757;font-weight: 500;
        font-size: 18px;
        line-height: 34px;"
        >
          {{ capitalize(item.description.slice(0,30)) }} {{ item.description.length> 20? '...' : '' }}
        </p>
        <div class="options_flex">
          <span class="big_text">{{ item.category === 'free'? 'Free' : 'Premium' }} </span>
          <span class="small_text">{{ item.category === 'free'? '0 MATIC' : `${item.amount} Matic` }} </span>
          <button class="border_btn" :disabled="item.type === 'premium'">
            Download
          </button>
        </div>
      </div>
      <div class="rhs">
        <div class="small_ls" style="display:flex;justifyContent:center;flexDirection:column;alignItems:center">
          <h4 class="Big_text clickable" @click="$router.push(`/publication-detail/?id=${item._id}`)">
            Read summary
          </h4>
          <br>
          <p class="small_text">
            <img src="~assets/images/eye.png"> {{ item.views }}
          </p>
        </div>
        <div class="small_ls" style="display:flex;justifyContent:center;flexDirection:column;alignItems:center">
          <h4 class="Big_text clickable" @click="$router.push(`/publication-detail/?id=${item._id}`)">
            Categories
          </h4>
          <br>
          <div class="category_flex">
            <span v-for="unit,i in item.categories" :key="i" class="small_text">{{ capitalize(unit) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import functions from '~/utils/functions'
export default {
  data () {
    return {
      switchData3: {
        state: 'OFF',
        positiveText: 'Show All',
        negativeText: 'Earnable'
      },
      categories: [],
      category: '',
      data: [],
      categorySet: []
    }
  },
  created () {
    this.getAllPublications()
  },
  methods: {
    fullDate: functions.fullDate,
    capitalize: functions.capitalize,
    cutAddr: functions.cutAddr,
    async getAllPublications () {
      try {
        const data = await this.$axios.get('/api/v1/publications/')
        this.data = data.data.publications
        const popular = {}
        this.data.map((y) => {
          y.categories.map((x) => {
            isNaN(popular[x]) === true ? popular[x] = 1 : popular[x] += 1
            return x
          })
          return y
        })
        this.sortCatgories(popular)
      } catch (err) {
        if (
          err.message.includes(
            "Cannot read properties of null (reading 'toLowerCase')"
          ) ||
            err.message.includes('Network')
        ) {
          this.$toasted.error('Check your connection.').goAway(5000)
        } else {
          this.$toasted.error(err?.response?.data?.msg).goAway(5000)
        }
      }
    },
    sortCatgories (obj) {
      const keys = Object.keys(obj)
      // Start from the second element.
      for (let i = 1; i < keys.length; i++) {
        // Go through the elements behind it.
        for (let j = i - 1; j > -1; j--) {
          // value comparison using ascending order.
          if (obj(keys[j + 1]) < obj(keys[j])) {
            // swap
            [keys[j + 1], keys[j]] = [keys[j], keys[j + 1]]
          }
        }
      }
      return keys
    }
  }
}
</script>

<style scoped>
.lhs{
    max-width:90%;
}
.grid{
    margin: 3rem 5rem;
    padding-bottom: 3rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.filter_flex{
    width: 5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
}
.select_category{
    width: auto;;
height: 3rem;
background: #F4F6FE;
}
.category_flex{
    display:grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    grid-gap:1rem;
}
.category_flex select{
    border: 1px solid #0000003b;
    border-radius: 10px;
    padding: .5rem 1rem;
}
.category_flex div{
    margin-top:-1.2rem;
}
.category_flex select option {
    color: rgba(0, 0, 0, 0.5);;
}
.Big_text{
    font-weight: 500;
font-size: 20px;
color: #000000;
}
.clickable{
  cursor: pointer;
}
.word_flex{
    width:70%;
    margin-left: 0;
    margin-top:1rem;
    display:flex;
    justify-content:flex-start;
    align-items:center;
    flex-wrap: wrap;
}
.word_flex span{
    margin-right:2rem;
    margin-bottom:1rem;
}
.small_text{
    font-weight: 500;
font-size: 16px;
color: rgba(0, 0, 0, 0.5);
}
.sub_text{
    line-height: 24px;
color: rgba(0, 0, 0, 0.5);
    width:100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size:16px;
}
.options_flex{
    display:flex;
    width: 100%;
    justify-content: space-between;
    padding-top: 1rem;
    align-items:center;
}
.options_flex button{
    border: 3px solid #000000;
border-radius: 10px;
width: 170px;
height: 2.5rem;
background:none;
cursor:pointer;
font-weight:bold;
}
.rhs{
    margin:auto 0;
    display:grid;
    grid-template-columns:1fr 1fr;
}
.border_btn:disabled{
  cursor:not-allowed;
  border-color:rgb(185, 183, 183)
}
.category_flex{
  display:flex;
  justify-content:center;
  align-items: center;
}
.popular_categories{
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items: center;
}
.popular_categories h4{
  margin-bottom:2rem;
}
</style>
