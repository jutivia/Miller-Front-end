<template class="index-container">
  <div @click="showOptions = false">
    <div>
      <div class="hero">
        <!-- <div class="lady-illustration">
          <img src="~assets/images/fileSavingBlack.png" alt="">
        </div> -->
        <div class="right_align">
          <h1>YOUR ACCESS TO</h1>
          <h1>
            <span>UNLIMITED</span>
            <span class="pink_text">RESOURCES</span>
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
          <h3>
            Search for articles and<br>
            publications
          </h3>
          <div class="search-ctn">
            <div class="div_search">
              <input v-model="key" type="search" placeholder="Search by title" @keyup.enter="search(key)">
              <div v-if="showOptions" class="dropDown">
                <div v-if="loading" class="loading">
                  <Loader :color="color" :border-width="4" :size="40" />
                </div>
                <div v-for="option, i in data" v-else :key="i" class="option" @click="$router.push(`/publication-detail/?id=${option._id}`)">
                  <span class="big_text">{{ capitalize(option.title.slice(0,40)) }} {{ option.title.length> 40? '...' : '' }}</span>
                  <span class="small_text">{{ capitalize(option.description.slice(0,100)) }} {{ option.description.length> 20? '...' : '' }}</span>
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
      <h3 class="right_align_main what_you_get">
        What You Get
      </h3>
      <section class="cards">
        <!-- card 1 -->
        <article class="card">
          <div class="card__image">
            <img src="~assets/images/img1.png" alt="">
          </div>
          <div class="card__content">
            <h4>Discover A Borderless Community</h4>
            <p>We are also focused on supporting members of the DAO which would in return be of a good cause, to the DAO community at large. Support include scholarships, grants and courses amongst others for members of the DAO</p>
          </div>
        </article>

        <!-- card 2 -->
        <article class="card">
          <div class="card__image">
            <img src="~assets/images/img2.png" alt="">
          </div>
          <div class="card__content">
            <h4>Real Time Analytics</h4>
            <p>We are also focused on supporting members of the DAO which would in return be of a good cause, to the DAO community at large. Support include scholarships, grants and courses amongst others for members of the DAO</p>
          </div>
        </article>
        <!-- card 3 -->
        <article class="card">
          <div class="card__image">
            <img src="~assets/images/img3.png" alt="">
          </div>
          <div class="card__content">
            <h4>Earn Rewards For Reading</h4>
            <p>We are also focused on supporting members of the DAO which would in return be of a good cause, to the DAO community at large. Support include scholarships, grants and courses amongst others for members of the DAO</p>
          </div>
        </article>
        <!-- card 4 -->
        <article class="card">
          <div class="card__image">
            <img src="~assets/images/img4.png" alt="">
          </div>
          <div class="card__content">
            <h4>Get Rewards For Your Publication </h4>
            <p>We are also focused on supporting members of the DAO which would in return be of a good cause, to the DAO community at large. Support include scholarships, grants and courses amongst others for members of the DAO</p>
          </div>
        </article>
      </section>
      <!-- <div class="main_grid">
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
      </div> -->
    </div>
    <footer>
      <p />
      <p>
        &#169; {{ new Date().getFullYear() }} Miller
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
.index-container {
  min-height: 100vh;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
   margin-inline: auto;
   border: 2px solid green;
   place-items: center;
}

.hero {
    background: linear-gradient(
    to bottom right,
    rgba(5, 1, 55, 0.95),
    rgba(0, 0, 0, 0.85),
    rgba(0, 0, 0, 0.8),
    rgba(0, 0, 0, 0.85),
    rgba(5, 1, 55, 0.95)
  ), url("~assets/images/hero-illustration.png") no-repeat center
      center;
  width: 100%;
  min-height: 100vh;
  background-size: cover;
  position: relative;
  inset: 0;
  display: grid;
  align-items: center;
  object-fit: cover;
}

.right_align {
  padding-top: 7rem;
  padding-left: 5rem;
  width: 100%;
  text-align: left;
  font-weight: 800;
  font-size: 40px;
  line-height: 1;
  color: #f4f6fe;
}
.right_align_main{
   text-align: right;
   padding-right: 4rem;
   /* color: #07124C; */
   color: var(--orange);
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
.what_you_get{
  text-align:center;
  color: var(--white);
  text-transform: uppercase;
}
.cards{
  max-width: 1220px;
  margin: 0 auto;
  display: grid;
  gap: 2.5rem;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  margin-bottom: 1rem;
}
.card{
  background: var(--dark-grey);
  color: var(--white);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.card h4{
font-size:clamp(1rem, 10vw, 2rem)
}
.card img, .card{
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.card__content{
  padding: 1rem;
}
.right_align h1{
  font-size: clamp(2.5rem, 15vw, 4.5rem);
}
.right_align .pink_text {
  color: #cf6dbb;
  background: linear-gradient(
     to top left,
    white,
    #5a67a6,
    #cf6dbb
  );
   background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: clamp(2.5rem, 15vw, 4.5rem);
  line-height:1;
}
.margins{
    margin-top: 4rem;
    /* width: 313px; */
  /* height: 72px; */
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
   /* position: relative; */
   /* top: 100vh; */
  min-height: 100%;

}
.main_grid{
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 4rem;
  margin-bottom:2rem;
}
/* .main_grid img{
  width: 100%;
height: 347px;
border-radius: 9.37855px;
} */
.main_text h3{
  /* color: #07124C; */
  color: var(--orange);
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
  /* background: var(--dark-orange); */
  background: linear-gradient(
     to top left,
    rgba(0, 0, 0, 0.25),
    var(--black),
    #5a67a6,
    #4f2948
  );
  color: var(--white);
  border-top: 1px solid var(--orange);
  height: 100px;
  width:100vw;
  display:flex;
  justify-content: space-between;
  padding:3rem;
  margin-top: auto;
  /* position: relative;
  bottom: 0; */
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
  padding:1rem 2rem;
  margin-bottom:.8rem;
  border-radius: 10px;
}
.option:hover{
  background-color: #172a89;
  color: white;
}
.option .big_text{
  line-height:1;
  font-size:18px;
  display: block;
  margin-bottom:1rem;
}
.option .small_text{
  font-size:14px;
  display: block;
  color:rgb(94, 93, 93);
  line-height:1.5;
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
