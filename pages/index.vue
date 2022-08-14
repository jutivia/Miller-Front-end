<template>
  <div @click="showOptions = false">
    <div>
      <div class="hero">
        <div class="right_align">
          <h1>YOUR ACCESS TO</h1>
          <h1> UNLIMITED</h1>
          <h1 class="pink_text">
            RESOURCES
          </h1>
          <div class="">
            <!-- <br> -->
            <button v-if="!connected" class="btn margins">
              <span> Become A Creator </span>
            </button>
            <button v-if="connected" class="btn margins">
              <span @click="$router.push('/show-all')"> View All Publications </span>
            </button>
          </div>
        </div>
        <div v-if="connected" class="left_align">
          Search for articles and<br>
          publications
          <div class="search-ctn">
            <div class="div_search">
              <input v-model="key" type="search" placeholder="Search by title" @keyup.enter="search(key)">
              <div v-if="showOptions" class="dropDown">
                <div v-if="loading" class="loading">
                  <Loader :color="color" :border-width="4" :size="40" />
                </div>
                <div v-for="option, i in data" v-else :key="i" class="option" @click="$router.push(`/publication-detail/?id=${option._id}`)">
                  <span class="big_text">{{ capitalize(option.title) }}</span>
                  <span class="small_text">{{ capitalize(option.description.slice(0,50)) }} {{ option.description.length> 20? '...' : '' }}</span>
                </div>
                <EmptyState v-if="!data.length && !loading" page="search" />
              </div>
            </div>
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.6 12.41L16.745 15.555C17.085 15.895 17.085 16.405 16.745 16.745C16.575 16.915 16.32 17 16.15 17C15.98 17 15.725 16.915 15.555 16.745L12.41 13.6C11.135 14.705 9.435 15.3 7.65 15.3C3.4 15.3 0 11.9 0 7.65C0 3.4 3.4 0 7.65 0C11.9 0 15.3 3.4 15.3 7.65C15.3 9.435 14.62 11.135 13.6 12.41ZM7.65 1.7C4.335 1.7 1.7 4.335 1.7 7.65C1.7 10.965 4.335 13.6 7.735 13.515C9.35 13.515 10.795 12.92 11.9 11.815C12.92 10.795 13.6 9.265 13.6 7.65C13.6 4.335 10.965 1.7 7.65 1.7Z"
                fill="#1d293f"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div class="main">
      <h3 class="right_align_main">
        What You Get
      </h3>
      <div class="main_grid">
        <img src="~assets/images/img1.png" alt="">
        <div class="main_text">
          <h3>
            Discover A Borderless Community
          </h3>
          <p>
            We are also focused on supporting members of the DAO which would in return be of a good cause, to the DAO community at large. Support include scholarships, grants and courses amongst others for members of the DAO
          </p>
        </div>
        <img src="~assets/images/img2.png" alt="">
        <div class="main_text">
          <h3>
            Real Time Analytics
          </h3>
          <p>
            We are also focused on supporting members of the DAO which would in return be of a good cause, to the DAO community at large. Support include scholarships, grants and courses amongst others for members of the DAO
          </p>
        </div>
        <img src="~assets/images/img3.png" alt="">
        <div class="main_text">
          <h3>
            Earn Rewards For Reading
          </h3>
          <p>
            We are also focused on supporting members of the DAO which would in return be of a good cause, to the DAO community at large. Support include scholarships, grants and courses amongst others for members of the DAO
          </p>
        </div>
        <img src="~assets/images/img4.png" alt="">
        <div class="main_text">
          <h3>
            Get Rewards For Your Publication
          </h3>
          <p>
            We are also focused on supporting members of the DAO which would in return be of a good cause, to the DAO community at large. Support include scholarships, grants and courses amongst others for members of the DAO
          </p>
        </div>
      </div>
    </div>
    <footer>
      <p />
      <p>
        Copyright 2022
      </p>
    </footer>
  </div>
</template>

<script>
import functions from '~/utils/functions'
export default {
  data () {
    return {
      connected: this.$store.state.connected,
      key: '',
      showOptions: false,
      loading: false,
      data: [],
      color: '#07124c'
    }
  },
  computed: {
    checkConnected () {
      return this.$store.state.connected
    },
    checkSearch () {
      return this.key
    }
  },
  watch: {
    checkConnected () {
      if (this.$store.state.connected === true) {
        this.connected = true
      } else {
        this.connected = false
      }
    },
    checkSearch () {
      if (this.key.length === 0) { this.showOptions = false }
    }
  },
  methods: {
    capitalize: functions.capitalize,
    async search (key) {
      this.loading = true
      this.showOptions = true
      try {
        const data = await this.$axios.get(`/api/v1/publications/?title=${key}`)
        const publications = data.data.publications
        if (publications.length) {
          this.data = publications
        }
        this.data = publications
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
    }
  }
}
</script>

<style scoped>
.hero {
  background: url("~assets/images/Miller_mainPic.png");
  width: 100%;
  height: 92vh;
}
.right_align {
  padding-top: 7rem;
  padding-left: 5rem;
  width: 100%;
  text-align: left;
  font-weight: 700;
  font-size: 30px;
  line-height: 49px;
  color: #f4f6fe;
  line-height:70px;
}
.right_align_main{
   text-align: right;
   padding-right: 4rem;
   color: #07124C;
   font-weight: 600;
   font-size: 30px;
   line-height: 44px;
   margin-bottom:3rem;
}
.left_align {
  padding-top: 0rem;
  padding-right: 5rem;
  width: 100%;
  font-weight: 600;
  font-size: 40px;
  line-height: 49px;
  color: #f4f6fe;
  text-align:right;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  flex-direction:column;
}
.right_align .pink_text {
  padding-top:1rem;
  color: #cf6dbb;
  background: linear-gradient(
    white 5%,
    #5a67a6 25%,
    #cf6dbb 70%
  );
   background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 6.1rem;
}
.margins{
    margin-top: 4rem;
    width: 313px;
  height: 72px;
}
.search-ctn {
    margin-top:3rem;
   width: 521px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: white;
  border-radius: 5px;
  padding-right: 1.125rem;
  transition: box-shadow 0.2s ease-in-out;
}

.profile {
  width: 35px;
  height: 35px;
  background: #cecece;
  border-radius: 50%;
}

input {
  font-size: 1rem;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 27.5px;
  background: transparent;
  padding-left: 2.25rem;
  color: #000;
}

::placeholder,
::-moz-placeholder,
::-webkit-input-placeholder {
  font-size: 1rem;
  color: #1d293f;
  font-size: 1.563rem;
}

input[type='search']:focus {
  outline: none;
}

.search-ctn:focus-within {
  box-shadow: 0 0 2px 0.5px #cf6dbb;
}

.search-ctn:focus-within svg path {
  fill: #cf6dbb;
}
  .icon-btn {
  border: none;
  background: transparent;
  cursor: pointer;
}
.main{
  padding:2rem;
}
.main_grid{
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 4rem;
  margin-bottom:2rem;
}
.main_grid img{
  width: 100%;
height: 347px;
border-radius: 9.37855px;
}
.main_text h3{
  color: #07124C;
  font-weight: 500;
  font-size: 36px;
  margin-bottom: 1rem;
}
.main_text p{
font-weight: 400;
font-size: 24px;
line-height: 29px;
}
footer{
  background: #F4F6FE;
  height: 100px;
  width:100vw;
  display:flex;
  justify-content: space-between;
  padding:3rem;
}
.inverted-colors{
  background: white;
  color: #07124c;
  margin-top:1rem;
  border: 1px solid #07124c;
}
.div_search{
  width:100%;
  display:flex;
  align-items: center;
  position:relative;
}
.dropDown{
  position:absolute;
  display:flex;
  flex-direction:column;
  background:white;
  width:inherit;
  padding:1rem 1rem;
  z-index:10;
  max-height:32rem;
  overflow-y:scroll;
  margin-top:2.5rem;
  border: 1px solid #e2e2ea;
  box-shadow: -1px 10px 15px rgba(117, 117, 158, 0.1);
  border-radius: 10px;
  width:521px;
  min-height:1rem;
  min-width: auto;
  top:0;
  text-align:left;
}
.option{
  color: #07124c;
  background-color:rgba(187, 187, 187, 0.282);
  padding:.5rem 2rem;
  margin-bottom:.8rem;
}
.option:hover{
  background-color: #172a89;
  color: white;
  border-radius: 10px;
}
.option .big_text{
  font-size:18px;
  display: block;
}
.option .small_text{
  font-size:14px;
  display: block;
  color:rgb(94, 93, 93);
  margin-top:-1rem;
}
.option:hover .small_text{
  color:rgb(215, 210, 210);
}
.loading{
  display:flex;
  align-items: center;
  justify-content:center;
}
</style>
