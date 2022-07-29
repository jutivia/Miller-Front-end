<template>
  <div>
    <div>
      <div class="hero">
        <div class="right_align">
          Your Access To Unlimited
          <br>
          <span class="pink_text">RESOURCES</span>
          <br>
          <button class="btn margins">
            <span v-if="!connected"> Become a Creator </span>
            <span v-else @click="$router.push('/creator-dashboard')"> View Your Publications </span>
          </button>
        </div>
        <div class="left_align">
          Search for articles and<br>
          publications
          <div class="search-ctn">
            <input type="search" placeholder="Search">
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
          <!-- fill="#7C0FD1" -->
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
      <p>
        About us  News  Careers  Help  Center
      </p>
      <p>
        Copyright 2022
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      connected: this.$store.state.connected
    }
  },
  computed: {
    checkConnected () {
      return this.$store.state.connected
    }
  },
  watch: {
    checkConnected () {
      if (this.$store.state.connected === true) {
        this.connected = true
      } else {
        this.connected = false
      }
    }
  }
}
</script>

<style scoped>
.hero {
  background: url("~assets/images/Miller_mainPic.png");
  width: 100%;
  height: 90vh;
}
.right_align {
  padding-top: 10rem;
  padding-right: 5rem;
  width: 100%;
  text-align: right;
  font-weight: 600;
  font-size: 40px;
  line-height: 49px;
  color: #f4f6fe;
}
.right_align_main{
   text-align: right;
   padding-right: 4rem;
   color: #07124C;
   font-weight: 600;
   font-size: 36px;
   line-height: 44px;
   margin-bottom:3rem;
}
.left_align {
  padding-top: 4rem;
  padding-left: 5rem;
  width: 100%;
  font-weight: 600;
  font-size: 40px;
  line-height: 49px;
  color: #f4f6fe;
}
.pink_text {
  color: #cf6dbb;
}
.margins{
    margin-top: 4rem;
    width: 313px;
  height: 72px;
}
.search-ctn {
    margin-top:3rem;
   width: 521px;;
  height: 55px;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 5px;
  margin-right: 5.5rem;
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
</style>
