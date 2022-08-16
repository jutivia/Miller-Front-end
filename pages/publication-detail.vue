<template>
  <div class="">
    <div class="go-back-btn">
      <GoBack back="All Publications" path="/show-all" />
    </div>
    <div class="container">
      <div v-if="loading" class="overlay-screen" />
      <FullScreenLoader v-if="loading" />

      <div class="lhs">
        <h4 class="big_text header_flex">
          <span> {{ data.title? capitalize(data.title) : '-' }} </span>
          <span class="amount"> {{ data.amount }} Matic </span>
        </h4>
        <br>
        <p class="small_text">
          {{ data.description? capitalize(data.description) : '-' }}
        </p>
      </div>
      <div class="rhs">
        <div class="two_grid_right_flex">
          <div class="text_flex">
            <h4 class="big_text">
              Downloads
            </h4>
            <p class="small_text download_flex">
              {{ data.views }}
            </p>
          </div>
          <div
            v-if="$store.state.userId === data.createdBy && data.type==='premium'"
            class="text_flex
          "
          >
            <h4 class="big_text">
              Earnings
            </h4>
            <p class="small_text">
              {{ data.earnings? data.earnings.toFixed(4): 0.00 }} matic
            </p>
          </div>
          <div class="text_flex">
            <h4 class="big_text">
              Date Uploaded
            </h4>
            <p class="small_text">
              {{ data.createdAt? fullDate( data.createdAt): '-' }}
            </p>
          </div>
        </div>
        <div class="border_btn_flex">
          <div class="border_btn" @click="downloadPublication = true">
            Download
          </div>
          <div v-if="$store.state.userId === data.createdBy" class="border_btn delete" @click="deletePublication = true">
            <span> Delete </span>
          </div>
        </div>
        <div class="comments_container">
          <div class="comment_header">
            <span> Comments ({{ comments.length }}) </span>
            <button class="btn save_comment " @click="addComment()">
              <span v-if="!loader2"> Add comment </span>
              <span v-else> <Loader /></span>
            </button>
          </div>
          <div class="comment_body">
            <div class="addComment">
              <input id="comment" v-model="comment" type="text" name="comment" placeholder="Add a comment...">
              <br>
              <span v-if="commentError" class="commentError"> Kindly enter a comment</span>
            </div>
            <br>
            <div v-if="comments.length" class="comments">
              <div v-for="item,index in comments" :key="index" class="single_comment">
                <div class="commenter">
                  <span> {{ cutAddr(item.commenter) || '-' }}</span>
                  <span> {{ item.createdAt || '-' }}</span>
                </div>
                <div class="comment_text">
                  {{ item.content || '-' }}
                </div>
                <!-- <div class="reply">
                  <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.9688 10.9375L16.8641 12.0422L18.8805 14.0625H12.5C11.6712 14.0625 10.8763 14.3917 10.2903 14.9778C9.70424 15.5638 9.375 16.3587 9.375 17.1875C9.375 18.0163 9.70424 18.8112 10.2903 19.3972C10.8763 19.9833 11.6712 20.3125 12.5 20.3125H14.0625V18.75H12.5C12.0856 18.75 11.6882 18.5854 11.3951 18.2924C11.1021 17.9993 10.9375 17.6019 10.9375 17.1875C10.9375 16.7731 11.1021 16.3757 11.3951 16.0826C11.6882 15.7896 12.0856 15.625 12.5 15.625H18.8805L16.8625 17.6461L17.9688 18.75L21.875 14.8438L17.9688 10.9375Z" fill="black" fill-opacity="0.4" />
                    <path d="M6.25 14.0625H1.5625L1.56016 2.27031L10.493 8.45469C10.6236 8.54507 10.7787 8.59349 10.9375 8.59349C11.0963 8.59349 11.2514 8.54507 11.382 8.45469L20.3125 2.27344V9.375H21.875V1.5625C21.8746 1.14823 21.7098 0.751039 21.4169 0.458103C21.124 0.165167 20.7268 0.000413654 20.3125 0H1.5625C1.1485 -4.65744e-07 0.751432 0.164298 0.458474 0.456817C0.165515 0.749336 0.000620993 1.14616 0 1.56016V14.0625C0.000619922 14.4767 0.165439 14.8738 0.45833 15.1667C0.751222 15.4596 1.14829 15.6244 1.5625 15.625H6.25V14.0625ZM18.593 1.5625L10.9375 6.8625L3.28203 1.5625H18.593Z" fill="black" fill-opacity="0.4" />
                  </svg>

                  Reply
                </div> -->
              </div>
            </div>
          </div>
        </div>
        <div v-if="downloadPublication" class="messageBody">
          <div class="messageContainer" @click="downloadPublication = true" @click.stop>
            <div class="content">
              <div class="delete-container">
                <h2>You're about to download {{ data.title? capitalize(data.title): '-' }}</h2>
                <h6> {{ data.amount || 0 }} MATIC would be deducted from your wallet balance to complete this process</h6>
                <h6> Would you like to proceed? </h6>
                <br>
                <div class="btn-flex">
                  <button
                    class="saturn-btn"
                    @click="
                      download();
                    "
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
        <div v-if="deletePublication" class="messageBody">
          <div class="messageContainer" @click="deleteApartment = true" @click.stop>
            <div class="content">
              <div class="delete-container">
                <h2>Do you want to delete this publication ?</h2>
                <div class="btn-flex">
                  <button
                    class="saturn-btn red"
                    @click="
                      deletePublication = false;
                      deleteThisPublication();
                      deletePublication = false;
                    "
                  >
                    <span v-if="!loader1" class="text">
                      Yes
                    </span>
                    <Loader v-else />
                  </button>
                  <button
                    class="saturn-btn grey"
                    @click="deletePublication = false"
                    @click.stop
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Contract, ethers } from 'ethers'
import Web3Modal from 'web3modal'
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import WalletConnectProvider from '@walletconnect/web3-provider'
import ABI from '~/utils/Miller.json'
import functions from '~/utils/functions'
import MetaMaskLogo from '~/assets/metamask.svg'

const DOWContract = '0x840C2b073029960681c657a7E3168e55C32e74e8'
export default {
  data () {
    return {
      data: {
      },
      loader1: false,
      loading: false,
      loader2: false,
      deletePublication: false,
      downloadPublication: false,
      downloadLoder: false,
      backBtn: 'All Publications',
      provider: '',
      comment: '',
      comments: [],
      commentError: false
    }
  },
  created () {
    this.getSinlePublication()
    this.getProvider()
  },
  methods: {
    fullDate: functions.fullDate,
    capitalize: functions.capitalize,
    async getProvider () {
      const providerOptions = {
        injected: {
          display: {
            logo: MetaMaskLogo,
            type: 'injected',
            check: 'isMetaMask',
            description: 'Connect to your MetaMask Wallet'
          },
          package: true
        },
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            alchemyId: process.env.VUE_APP_ALCHEMY_KEY,
            rpc: {
              80001: process.env.VUE_APP_MUMBAI_RPC_URL
            }
          },
          qrcode: true,
          qrcodeModalOptions: {
            mobileLinks: [
              'metamask',
              'trust',
              'rainbow',
              'argent',
              'imtoken',
              'pillar'
            ]
          }
        },
        //* **Coinbase Wallet***//
        coinbasewallet: {
          package: CoinbaseWalletSDK,
          options: {
            appName: 'Miller',
            alchemyId: process.env.VUE_APP_ALCHEMY_KEY,
            rpc: process.env.VUE_APP_MUMBAI_RPC_URL,
            chainId: 80001,
            darkMode: true
          }
        }
      }
      const newWeb3Modal = new Web3Modal({
        disableInjectedProvider: false,
        displayNoInjectedProvider: false,
        theme: {
          background: 'rgb(20,30,30, 0.65)',
          main: 'rgb(199, 199, 199)',
          secondary: 'rgb(136, 136, 136)',
          border: 'rgba(40, 240, 5, 0.05)',
          hover: 'rgb(16, 45, 35, 0.9)'
        },
        network: 'matic',
        cacheProvider: true, // optional
        providerOptions // required
      })
      const instance = await newWeb3Modal.connect()
      this.provider = new ethers.providers.Web3Provider(instance)
    },
    async getSinlePublication () {
      this.loading = true
      try {
        const data = await this.$axios.get(`/api/v1/publications/${this.$route.query.id}`)
        this.data = data.data.publication
        console.log(data.data.publication)
        this.comments = data.data.publication.comments.reverse() || []
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
    async deleteThisPublication () {
      this.loader1 = true
      try {
        await this.$axios.delete(`/api/v1/publications/${this.$route.query.id}`)
        this.$toasted.success(`${this.data.title} deleted successfully`).goAway(5000)
        this.$router.push('/creator-dashboard')
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
      this.loader1 = false
    },
    async download () {
      this.downloadLoder = true
      try {
        if (this.data.type === 'premium') {
          const amount = ethers.utils.parseUnits(
            this.data.amount.toString(),
            18
          )
          const signer = this.provider.getSigner()
          const contractInstance = new Contract(DOWContract, ABI, signer)
          await contractInstance.payToCreator(amount, this.data.userAddress, { value: amount })
          const data = await this.$axios.get(`/api/v1/publications/cid/${this.data._id}`)
          console.log(data)
          this.cid = data.data.updatedCount.cid
          window.open(this.cid, '_blank')
          this.downloadLoder = false
          this.downloadPublication = false
          this.getSinlePublication()
        } else {
          const data = await this.$axios.get(`/api/v1/publications/cid/${this.data._id}`)
          this.cid = data.data.updatedCount.cid
          window.open(this.cid, '_blank').focus()
          this.downloadLoder = false
          this.downloadPublication = false
          this.getSinlePublication()
        }
      } catch (err) {
        console.log(err)
        if (err.code === -32603) {
          this.$toasted.error('Insufficient Funds').goAway(5000)
        } else if (err.code === 4001) {
          this.$toasted.error('User denied transaction signature.').goAway(5000)
        } else if (
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
    cutAddr (addr) {
      const starter = addr.slice(0, 4)
      const end = addr.slice(addr.length - 4)
      return `${starter}...${end}`
    },
    async addComment () {
      this.loader2 = true
      if (!this.comment) {
        this.loader2 = false
        this.commentError = true
        return setTimeout(() => {
          this.commentError = false
        }, 5000)
      }
      const today = new Date()
      const dd = today.getDate()

      const mm = today.getMonth() + 1
      const yyyy = today.getFullYear()
      const newDate = `${dd}/${mm}/${yyyy}`
      const data = {
        comment: {
          content: this.comment,
          createdAt: newDate,
          commenter: this.$store.state.userAddress
        }
      }
      try {
        const comments = await this.$axios.post(`/api/v1/publications/comment/${this.$route.query.id}`, data)
        console.log(comments)
        this.comments = comments.data.updatedCount.comments
        this.comment = ''
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
      this.loader2 = false
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
font-size: 18px;
line-height: 24px;
color: #575757;
}
.two_grid_right_flex{
   display: flex;
    justify-content:space-around;
    align-items:center;
    margin-bottom: 1rem;
}
.comments_container{
    margin-top:4rem;
    width:90%;
    background: #ffffff;
     box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border-radius: 10px;
    border: 1px solid #07124c39;
    align-self:center;
    margin-left:2rem;
}
.comments{
  max-height: 15rem;
  overflow-y:scroll;
}
.comment_header{

background: #ffffffd0;
/* border-bottom: 1px solid #07124c39; */
border-radius: 10px;
color:#07124C;
font-weight: 600;
font-size: 20px;
line-height: 27px;
padding:1rem;
display: flex;
justify-content:space-between;
align-items:center;
}
.single_comment{
    width:auto;
    border-bottom: 1px solid #07124c21;
    border-top: 1px solid #07124c21;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    padding:1rem 1.8rem;
    /* border-radius:10px; */
    padding-bottom:1.5rem;
    margin:0 1.5rem;
    margin-bottom: 1rem;
}
.single_comment:nth-last-child(1){
  border-bottom:none;
}
.comment_body{
    padding:0rem 0;
    padding-bottom:1rem;
}
.addComment{
  width:100%;
  border-radius: 10px;
  line-height: 27px;
    padding: 0 1.5rem;
}
.addComment input {
box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
border:none;
width:100%;
height:2rem;
 padding:1.5rem 1rem;
 font-size:1rem;
 color: #515050;
}
.addComment input::placeholder {
 color: #bdbbbb;
}
.addComment input:focus{
  outline:none;
  }
  .save_comment{
    max-width:max-content;
    padding:.5rem .8rem;
    font-size:14px;
  }
.color{
width: 30px;
height: 30px;
border-radius: 50%;
}
.reply{
    color: rgba(0, 0, 0, 0.4);
    font-weight: 400;
    font-size: 16px;
}
.comment_text{
    font-weight: 500;
font-size: 16px;
line-height: 24px;
color: #515050;
}
.border_btn{
border: 3px solid #000000;
border-radius: 10px;
width: 10rem;
height: 3rem;
background:none;
cursor:pointer;
padding:.5rem 2rem;
color:#000000;
text-decoration:none;
margin-top:2rem;
font-weight:bold;
text-align: center;
display: flex;
align-items: center;
justify-content: center;
}
.border_btn_flex{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.delete{
  border: 3px solid red;
  color: red;
  /* border-color: red; */
}
.download_flex{
  display:flex;
  justify-content:center;
  align-items:center;
}
.small_text img{
  width:40px;
  height:40px;
}
.header_flex{
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  gap:1rem;
}
.amount{
   min-width:max-content;
  padding:8px 10px;
  background:#3cda7ec1;
  border-radius:10px;
  border: 1px solid #09d12b33;
  color:#ffffff;
  font-weight:bold;
  max-height:auto;
  text-align:center;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  font-size:14px;
  line-height:1;
  margin-right:2rem;
}
.text_flex{
  display:flex;
  flex-direction:column;
  gap:1rem;
  justify-content:center;
  align-items:center;
}
.commenter{
display:flex;
justify-content:space-between;
align-items:center;
color:rgb(173, 173, 173);
font-size:12px;
}
.commentError{
  display:block;
  color:rgb(157, 10, 10);
  margin-top:.5rem;
  font-size:12px;
  /* margin-left:.5rem; */
}
</style>
