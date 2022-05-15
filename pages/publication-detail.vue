<template>
  <div class="container">
    <div class="lhs">
      <h4 class="big_text">
        {{ data.title || '-' }}
      </h4>
      <br>
      <p class="small_text">
        {{ data.description || '-' }}
      </p>
      <div class="graph_container">
        <p>Location </p>
        <img src="~assets/images/map.png">
      </div>
    </div>
    <div class="rhs">
      <div class="right_flex">
        <h4 class="big_text">
          Views
        </h4>
        <h4 class="big_text">
          Earnings
        </h4>
        <h4 class="big_text">
          Date Uploaded
        </h4>
      </div>
      <div class="right_flex">
        <p class="small_text">
          <img src="~assets/images/eye.png"> 0
        </p>
        <p class="small_text">
          0.00 ℏ
        </p>
        <p class="small_text">
          {{ data.date.split(':')[0].slice(0,10) || '-' }}
        </p>
      </div>
      <br>
      <a class="border_btn" target="_blank" :href="data.url" >
            Download
      </a>
      <div class="comments_container">
        <div class="comment_header">
          Comments
        </div>
        <div class="comment_body">
          <div class="single_comment">
            <div class="color red" />
            <div class="comment_text">
              We are also focused on supporting members of the DAO
            </div>
            <div class="reply">
              <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.9688 10.9375L16.8641 12.0422L18.8805 14.0625H12.5C11.6712 14.0625 10.8763 14.3917 10.2903 14.9778C9.70424 15.5638 9.375 16.3587 9.375 17.1875C9.375 18.0163 9.70424 18.8112 10.2903 19.3972C10.8763 19.9833 11.6712 20.3125 12.5 20.3125H14.0625V18.75H12.5C12.0856 18.75 11.6882 18.5854 11.3951 18.2924C11.1021 17.9993 10.9375 17.6019 10.9375 17.1875C10.9375 16.7731 11.1021 16.3757 11.3951 16.0826C11.6882 15.7896 12.0856 15.625 12.5 15.625H18.8805L16.8625 17.6461L17.9688 18.75L21.875 14.8438L17.9688 10.9375Z" fill="black" fill-opacity="0.4" />
                <path d="M6.25 14.0625H1.5625L1.56016 2.27031L10.493 8.45469C10.6236 8.54507 10.7787 8.59349 10.9375 8.59349C11.0963 8.59349 11.2514 8.54507 11.382 8.45469L20.3125 2.27344V9.375H21.875V1.5625C21.8746 1.14823 21.7098 0.751039 21.4169 0.458103C21.124 0.165167 20.7268 0.000413654 20.3125 0H1.5625C1.1485 -4.65744e-07 0.751432 0.164298 0.458474 0.456817C0.165515 0.749336 0.000620993 1.14616 0 1.56016V14.0625C0.000619922 14.4767 0.165439 14.8738 0.45833 15.1667C0.751222 15.4596 1.14829 15.6244 1.5625 15.625H6.25V14.0625ZM18.593 1.5625L10.9375 6.8625L3.28203 1.5625H18.593Z" fill="black" fill-opacity="0.4" />
              </svg>

              Reply
            </div>
          </div>
          <div class="single_comment">
            <div class="color green" />
            <div class="comment_text">
              We are also focused on supporting members of the DAO
            </div>
            <div class="reply">
              <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.9688 10.9375L16.8641 12.0422L18.8805 14.0625H12.5C11.6712 14.0625 10.8763 14.3917 10.2903 14.9778C9.70424 15.5638 9.375 16.3587 9.375 17.1875C9.375 18.0163 9.70424 18.8112 10.2903 19.3972C10.8763 19.9833 11.6712 20.3125 12.5 20.3125H14.0625V18.75H12.5C12.0856 18.75 11.6882 18.5854 11.3951 18.2924C11.1021 17.9993 10.9375 17.6019 10.9375 17.1875C10.9375 16.7731 11.1021 16.3757 11.3951 16.0826C11.6882 15.7896 12.0856 15.625 12.5 15.625H18.8805L16.8625 17.6461L17.9688 18.75L21.875 14.8438L17.9688 10.9375Z" fill="black" fill-opacity="0.4" />
                <path d="M6.25 14.0625H1.5625L1.56016 2.27031L10.493 8.45469C10.6236 8.54507 10.7787 8.59349 10.9375 8.59349C11.0963 8.59349 11.2514 8.54507 11.382 8.45469L20.3125 2.27344V9.375H21.875V1.5625C21.8746 1.14823 21.7098 0.751039 21.4169 0.458103C21.124 0.165167 20.7268 0.000413654 20.3125 0H1.5625C1.1485 -4.65744e-07 0.751432 0.164298 0.458474 0.456817C0.165515 0.749336 0.000620993 1.14616 0 1.56016V14.0625C0.000619922 14.4767 0.165439 14.8738 0.45833 15.1667C0.751222 15.4596 1.14829 15.6244 1.5625 15.625H6.25V14.0625ZM18.593 1.5625L10.9375 6.8625L3.28203 1.5625H18.593Z" fill="black" fill-opacity="0.4" />
              </svg>

              Reply
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: {}
    }
  },
  created () {
    this.getSinlePublication()
  },
  methods: {
    getSinlePublication () {
      const publications = JSON.parse(localStorage.getItem('Publications'))
      // console.log(publications)
      publications.map((x) => {
        // console.log('beforefind:', x)
        if (x.id.toString() === this.$route.query.id) {
          // console.log('afterfind:', x)
          this.data = x
        }
        return x
      })
    }
  }
}
</script>

<style  scoped>
.container{
    padding:3rem;
    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-gap:3rem;
}
.graph_container{
margin-top:2rem;
padding:2rem;
box-shadow: 0px 8.00725px 15.3472px rgba(62, 73, 84, 0.04);
border-radius: 6.67271px;
height: 461.08px;
width:100%;
}
.graph_container p{
margin-bottom:2rem;
}
.big_text{
font-weight: 600;
font-size: 24px;
line-height: 29px;
color: #07124C;
}
.small_text{
font-weight: 500;
font-size: 20px;
line-height: 24px;
color: #575757;
}
.right_flex{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 1rem;
}
.comments_container{
    margin-top:4rem;
    width:95%;
    background: #F4F6FE;
    box-shadow: 0px 4px 4px rgba(244, 246, 254, 0.25);
    border-radius: 10px;
}
.comment_header{

background: #07124C;
border-radius: 10px;
color:white;
font-weight: 600;
font-size: 20px;
line-height: 27px;
padding:1.5rem;
}
.single_comment{
    display:grid;
    grid-template-columns: .1fr .8fr .1fr;
    margin-bottom: 2rem;
    align-items:center;
    width:100%;
    grid-gap:1rem;
}
.comment_body{
    padding:1.5rem 1.5rem;
}
.color{
width: 30px;
height: 30px;
border-radius: 50%;
}
.red{
    background: #CF6DBB;
}
.green{
background: #50D37D;
}
.reply{
    color: rgba(0, 0, 0, 0.4);
    font-weight: 400;
    font-size: 16px;
}
.comment_text{
    font-weight: 500;
font-size: 20px;
line-height: 24px;
color: #575757;
}
.border_btn{
border: 1px solid #000000;
border-radius: 10px;
width: 10rem;
height: 3rem;
background:none;
cursor:pointer;
padding:.5rem 2rem;
color:#000000;
text-decoration:none;
margin-top:2rem;
}
</style>
