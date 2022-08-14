<template>
  <div>
    <div class="go-back-btn">
      <GoBack back="Home" />
    </div>
    <div class="grid">
      <div class="lhs">
        <span class="clear" @click="clearFilter()">
          Clear Filter
        </span>
        <br>
        <div class="filter_flex">
          <select v-model="category" placeholder="Filter Category" required class="select_category" @change="showCategory(category)">
            <option value="" selected>
              Select category
            </option>
            <option
              v-for="(unit, index) in categorySet"
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
          style="color: #575757;font-weight: 500;
        font-size: 18px;
        line-height: 34px;"
        >
          {{ capitalize(item.description.slice(0,100)) }} {{ item.description.length> 20? '...' : '' }}
        </p>
        <div class="options_flex">
          <span class="big_text">{{ item.category === 'free'? 'Free' : 'Premium' }} </span>
          <span class="small_text green">{{ item.category === 'free'? '0 MATIC' : `${item.amount} Matic` }} </span>
          <div @click="downloadPublication = true">
            <img src="~assets/images/download.svg">
          </div>
        </div>
      </div>
      <div v-if="downloadPublication" class="messageBody">
        <div class="messageContainer" @click="downloadPublication = true" @click.stop>
          <div class="content">
            <div class="delete-container">
              <h2>You're about to download {{ capitalize(title) }}</h2>
              <h6> {{ amount || 0 }} MATIC would be deducted from your wallet balance to complete this process</h6>
              <h6> Would you like to proceed? </h6>
              <br>
              <div class="btn-flex">
                <button
                  class="saturn-btn"
                  @click="
                    download();
                  "
                  @click.stop
                >
                  <span v-if="!downloadLoder" class="text">
                    Yes
                  </span>
                  <Loader v-else />
                </button>
                <button
                  class="saturn-btn grey"
                  @click="
                    downloadPublication = false;
                  "
                  @click.stop
                >
                  <span class="text">
                    No
                  </span>
                </button>
              </div>
            </div>
          </div>
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
      if (this.$store.state.switchState === 'ON') {
        this.getAllPublications('premium')
      } else {
        this.getAllPublications('free')
      }
    }
  },
  created () {
    this.getAllPublications('free')
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
          this.$toasted.error(err?.response?.data?.msg).goAway(5000)
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
    },
    showCategory (unit) {
      const newData = this.data.filter(item => item.categories.includes(unit) === true)
      this.data = newData
    },
    clearFilter () {
      this.getAllPublications('free')
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
          this.$toasted.error(err?.response?.data?.msg).goAway(5000)
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
    gap:2rem;
    margin-top:-1rem;
}
.select_category{
    width: auto;;
height: 3rem;
background: #F4F6FE;
}
.filter_flex select{
  margin-top:2.2rem;
    border: 1px solid #0000003b;
    border-radius: 10px;
    padding: .5rem 1rem;
    min-width:300px;
    width:100%;
}
  select:focus {
  outline: 1px solid #07124C;
}
.clear{
  cursor:pointer
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
div img{
  width:3rem;
  height:3rem;
  cursor:pointer;
  /* margin-top:-.3rem */
}
.sub_text{
    /* line-height: 24px; */
    color: rgba(0, 0, 0, 0.5);
    width:auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size:12px;
    background-color:white;
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
  padding:10px 20px;
  border: 3px dotted #cf6dbb;
  border-radius: 10px;
}
.date{
   background-color: #455eda;
  padding:8px 10px;
  color:white;
  border-radius: 10px;
  width:max-content;
  text-align:right;
  font-weight:bolder;
}
.green{
  color:#3cda7d;
  font-weight: bolder;
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
