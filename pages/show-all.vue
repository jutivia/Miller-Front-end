<template class="show-all">
  <div>
    <div class="go-back-btn">
      <GoBack back="Home" />
    </div>
    <div class="grid">
      <div class="lhs">
        <button class="clear" @click="clearFilter()">
          Clear Filter
        </button>
        <br>
        <div class="filter_flex">
          <select v-model="category" placeholder="Filter Category" required class="select_category" @change="showCategory(category)">
            <option value="" selected disabled>
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
    <FullScreenLoader v-if="loading" />
    <div v-for="(item,index) in data" v-else :key="index" class="grid" @click="renderUnitItems(item)">
      <div class="lhs">
        <div class="title_header">
          <h4 class="Big_text">
            {{ item.title.toUpperCase().slice(0,35) }} {{ item.title.length > 35? '...' : '' }}
          </h4>
          <div class="sub_text">
            <p class="date">
              {{ fullDate(item.createdAt) }}
            </p>
          </div>
        </div>
        <br>
        <p
          class="small_text"
        >
          {{ capitalize(item.description.slice(0,100)) }} {{ item.description.length> 20? '...' : '' }}
        </p>
        <div class="options_flex">
          <span class="big_text">{{ item.category === 'free'? 'Free' : 'Premium' }} </span>
          <span class="small_text green">{{ item.category === 'free'? '0 MATIC' : `${item.amount} Matic` }} </span>
        </div>
      </div>
      <div class="rhs">
        <div class="small_ls" style="display:flex;justifyContent:center;flexDirection:column;alignItems:center">
          <h4 class="Big_text clickable pink_button" @click="$router.push(`/publication-detail/?id=${item._id}`)">
            Read summary
          </h4>
          <br>
          <p class="small_text download_flex">
            {{ item.views }} Downloads
          </p>
        </div>
        <div class="small_ls" style="display:flex;justifyContent:center;flexDirection:column;alignItems:center;">
          <h4 class="Big_text">
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
        positiveText: 'Premium',
        negativeText: 'Free'
      },
      categories: [],
      category: '',
      data: [],
      copyData: [],
      categorySet: [],
      loading: false,
      downloadPublication: false,
      loader1: false,
      title: '',
      amount: 0,
      cid: '',
      id: '',
      downloadLoder: false
    }
  },
  computed: {
    watchSwitchState () {
      return this.$store.state.switchState
    }
  },
  watch: {
    watchSwitchState () {
      if (this.$store.state.switchState === 'OFF') {
        this.getAllPublications('free')
      } else {
        this.getAllPublications('premium')
      }
    }
  },
  created () {
    this.$store.state.switchState ? this.$store.state.switchState === 'OFF' ? this.getAllPublications('free') : this.getAllPublications('premium') : this.getAllPublications('free')
  },
  methods: {
    fullDate: functions.fullDate,
    capitalize: functions.capitalize,
    cutAddr: functions.cutAddr,
    async getAllPublications (type) {
      this.loading = true
      try {
        const data = await this.$axios.get(`/api/v1/publications/?type=${type}`)
        const publications = data.data.publications
        this.data = publications
        this.copyData = publications
        const popular = {}
        this.data.map((y) => {
          y.categories.map((x) => {
            isNaN(popular[x]) === true ? popular[x] = 1 : popular[x] += 1
            return x
          })
          return y
        })
        this.sortCatgories(popular)
        this.category = ''
      } catch (err) {
        if (
          err.message.includes(
            "Cannot read properties of null (reading 'toLowerCase')"
          ) ||
            err.message.includes('Network')
        ) {
          this.$toasted.error('Check your connection.').goAway(5000)
        } else {
          this.$toasted.error(err?.response?.data?.msg || 'Connection Failed').goAway(5000)
        }
      }
      this.loading = false
    },
    sortCatgories (obj) {
      const keys = Object.keys(obj)
      for (let i = 1; i < keys.length; i++) {
        // Go through the elements behind it.
        for (let j = i - 1; j > -1; j--) {
          // value comparison using ascending order.
          if (obj[keys[j + 1]] < obj[keys[j]]) {
            // swap
            [keys[j + 1], keys[j]] = [keys[j], keys[j + 1]]
          }
        }
      }
      this.categorySet = keys.reverse().slice(0, 5)
      this.categories = keys.reverse()
    },
    showCategory (unit) {
      const newData = this.copyData.filter(item => item.categories.includes(unit) === true)
      this.data = newData
    },
    clearFilter () {
      this.data = this.copyData
      this.category = ''
    },
    async download () {
      this.downloadLoder = true
      try {
        const data = await this.$axios.get(`/api/v1/publications/cid/${this.id}`)
        this.cid = data.data.updatedCount.cid
        window.open(this.cid, '_blank').focus()
        this.downloadPublication = false
      } catch (err) {
        if (
          err.message.includes(
            "Cannot read properties of null (reading 'toLowerCase')"
          ) ||
            err.message.includes('Network')
        ) {
          this.$toasted.error('Check your connection.').goAway(5000)
        } else {
          this.$toasted.error(err?.response?.data?.msg || 'Connection Failed').goAway(5000)
        }
      }
      this.downloadLoder = false
    },
    renderUnitItems (item) {
      this.title = item.title
      this.amount = item.amount
      this.id = item._id
    }
  }
}
</script>

<style scoped>
.show-all{
   color: var(--faint-grey);
  font-family: var(--jost);
}
.lhs{
    max-width:90%;
}
.grid{
    margin: 3rem 5rem;
    padding-bottom: 3rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
    /* border-bottom: 1px solid rgba(0, 0, 0, 0.2); */
    border-bottom: 0.1px solid var(--grey);
}
.filter_flex{
    width: 5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    gap:2rem;
    margin-top:-1rem;
}
.select_category{
    width: auto;;
height: 3rem;
/* background: #F4F6FE; */
background: var(--dark-grey);
border: 2px solid yellow
}
.filter_flex select{
  margin-top:2.2rem;
    /* border: 1px solid #0000003b; */
    border: 1px solid   var(--black);
    background:#ffffffcc;;
    color: var(--black);
    border-radius: 10px;
    padding: .5rem 1rem;
    min-width:300px;
    width:100%;
}
  select:focus {
  /* outline: 1px solid #07124C; */
  outline: 1px solid var(--orange);
}
.clear{
  cursor:pointer;
   color: var(--white);
  font-weight: 700;
  width: max-content;
  padding: 5px;
  line-height: 2;
  background: transparent;
  border: none;
}
 .clear::after {
    content: "";
    display: block;
    width: 0;
    margin-inline: auto;
    height: 3px;
    background-color: var(--orange);
    transition: 0.35s ease-out;
  }

  .clear:hover::after {
    width: 100%;
  }
.category_flex div{
    margin-top:-1.2rem;
}
.category_flex select option {
    /* color: rgba(0, 0, 0, 0.5); */
    /* color: rgba(0, 0, 0, 0.5); */
    color: var(--black);
}
.Big_text{
    font-weight: 500;
font-size: 30px;
/* color: #000000; */
color: var(--orange);
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
  font-size: 16px;
  line-height: 2;
  color:rgb(229, 229, 229);
}
div img{
  width:3rem;
  height:3rem;
  cursor:pointer;
}
.sub_text{
    width:auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size:12px;
    color: var(--black);
}
.options_flex{
    display:flex;
    width: 100%;
    justify-content: space-between;
    padding-top: 1rem;
    align-items:center;
}
.options_flex button{
    border: 3px solid var(--black);
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
  border-color: var(--orange);
}
.category_flex{
  display:flex;
  justify-content:center;
  align-items: center;
  gap:2rem;
   max-width:70%;
   flex-wrap:wrap;
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
.pink_button{
  color: #cf6dbb;
  padding:0rem 1.5rem;
  border: 1px solid #cf6dbb;
  border-radius: 10px;
}
.date{
   /* background-color: #455eda; */
  /* background:#cf6dbb; */
  padding:8px 10px;
  color: #cf6dbb;
  border-radius: 10px;
  width:max-content;
  text-align:right;
  font-weight:bolder;
}
.green{
   min-width:max-content;
  padding:8px 10px;
  /* background:#3cda7ec1; */
  border-radius:10px;
  /* border: 1px solid #09d12b33; */
  color:#ffffff;
  font-weight:bold;
  max-height:auto;
  text-align:center;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  font-size:18px;
  line-height:1;
  color:#3cda7ec1
  /* margin-right:2rem; */
}
.download_flex{
  display:flex;
  justify-content:center;
  align-items:center;
  gap:.5rem;
}
.title_header{
   display:flex;
  justify-content:space-between;
  align-items:center;
  width:100%;
}
</style>
