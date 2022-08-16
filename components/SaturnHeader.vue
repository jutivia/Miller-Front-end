<template>
  <header class="header">
    <div class="logo" @click="$router.push('/')">
      <img src="~assets/images/MillerLogo.png" alt="">
    </div>
    <!-- <h3 class="title" @click="$router.push('/')">
      Miller
    </h3> -->
    <!-- Message icon -->
    <div v-if="!showDetails">
      <button class="btn" @click="connect">
        <span v-if="!loginLoader"> Connect wallet </span>
        <span v-else style="display:flex;justifyContent:center;alignItems:center;"><Loader /> </span>
      </button>
    </div>
    <div v-else class="upload">
      <button class="btn myPublications" @click="$router.push('/creator-dashboard')">
        <span> My Publications </span>
      </button>
      <button class="btn margins" @click="$router.push('/new-publication')">
        Upload Publication
      </button>
      <div class="user-info">
        <p class="p">
          Total Matic
        </p>
        <span class="s"> {{ amount }} MATIC</span>
      </div>
      <div class="user-info">
        <p class="p">
          Account ID
        </p>
        <span class="s"> {{ account === '0x00'? account: cutAddr(account) }} </span>
      </div>
    </div>
  </header>
</template>

<script>
import Web3Modal from 'web3modal'
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { ethers } from 'ethers'
import MetaMaskLogo from '~/assets/metamask.svg'
export default {
  name: 'SaturnHeader',
  data () {
    return {
      localData: false,
      showDetails: null,
      account: '0x00',
      amount: '00.00',
      chainId: 8001,
      provider: null,
      chainIsChanged: false,
      loginLoader: false,
      lastScrollTop: 0
    }
  },
  computed: {
    checkConnected () {
      return this.showDetails
    },
    checkNetworkChange () {
      this.provider?.on('chainChanged', (chainId) => {
        this.chainId = chainId
        return this.chainId
      })
      return this.chainId
    }
    // scrollListener () {
    //   return this.lastScrollTop
    // }
  },
  watch: {
    checkConnected () {
      this.$store.commit('checkConnected', this.showDetails)
      if (this.showDetails === false) {
        this.$router.push('/')
      }
    },
    async checkNetworkChange () {
      if (this.chainId === 80001) {
        const accounts = await this.provider.listAccounts()
        this.account = accounts[0]
        this.provider.getBalance(accounts[0]).then((balance) => {
          const balanceInEth = ethers.utils.formatEther(balance).toString()
          const deci = balanceInEth.split('.')
          const end = deci[1].slice(0, 3)
          this.amount = deci[0].concat('.').concat(end)
        })
        this.login()
      } else {
        this.$toasted.error("You're on  a wrong network. kindly switch to the Polygon Mumbai Testnet").goAway(3500)
      }
      return this.chainIsChanged
    }
  },
  created () {
    // if (localStorage.getItem('setProvider') === 'true') { this.showDetails = true } else { this.showDetails = false }
    this.showDetails = false
  },
  mounted () {
    window.addEventListener('scroll', this.scrollListener)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.scrollListener)
  },
  methods: {
    async connect () {
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
      try {
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
        this.$store.commit('setWeb3Modal', newWeb3Modal)
        if (this.provider) {
          this.getAccountdetails()
        } else {
          this.$toasted.error('No wallet connection available on your device').goAway(3500)
        }
      } catch (error) {
        console.log(error.code, error)
        this.$toasted.error(error.message).goAway(3500)
      }

      this.$store.commit('checkConnected', this.showDetails)
    },
    cutAddr (addr) {
      const starter = addr.slice(0, 4)
      const end = addr.slice(addr.length - 4)
      return `${starter}...${end}`
    },
    async getAccountdetails () {
      const accounts = await this.provider.listAccounts()
      const network = await this.provider.getNetwork()
      this.chainId = network.chainId
      if (this.chainId === 80001) {
        this.account = accounts[0]
        this.provider.getBalance(accounts[0]).then((balance) => {
          const balanceInEth = ethers.utils.formatEther(balance).toString()
          const deci = balanceInEth.split('.')
          const end = deci[1].slice(0, 3)
          this.amount = deci[0].concat('.').concat(end)
        })
        this.login()
      } else {
        this.$toasted.error("You're on  a wrong network. kindly switch to the Polygon Mumbai Testnet").goAway(3500)
      }
    },
    async login () {
      try {
        this.loginLoader = true
        const token = await this.$axios.post('/api/v1/auth/sign', { address: this.account })
        this.$store.commit('setToken', token?.data?.token)
        this.$store.commit('setUserId', token.data?.UserId)
        this.$store.commit('setUserAddress', this.account)
        // localStorage.setItem('setUserDetails', {
        //   token: token?.data?.token,
        //   userId: token.data?.UserId,
        //   userAddress: this.account
        // })
        this.showDetails = true
      } catch (err) {
        this.loginLoader = false
        this.showDetails = false
        console.log(err)
        if (
          err.message.includes(
            "Cannot read properties of null (reading 'toLowerCase')"
          ) ||
            err.message.includes('Network')
        ) {
          this.$toasted.error('Check your connection').goAway(5000)
        } else {
          this.$toasted.error(err?.response?.data?.message || 'Connection Failed').goAway(5000)
        }
      }
    },
    scrollListener () {
      if (typeof window !== 'undefined' && window.document) {
        const scrollTop = document.scrollY || document.documentElement.scrollTop
        if (scrollTop > this.lastScrollTop) {
          document.querySelector('.header').style.top = '-30%'
        } else {
          document.querySelector('.header').style.top = '0'
        }
        this.lastScrollTop = scrollTop
      }
    }
  }
}

</script>

<style scoped>
/* component styles */
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
}

header {
  /* use this when main container is flex  -> flex: 1; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* padding: 0.813rem 2.313rem 0.75rem 1.563rem; */
  padding:  1rem 4.5rem;
  background:rgba(1, 1, 150, 0.032);
  backdrop-filter: blur(2.5rem);
  -webkit-backdrop-filter: blur(2.5rem);
  height: 10vh;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  transition: all 0.35s ease-in-out;
  width:100%;
}

.show-menu {
  display: none;
}

.logo {
  flex: 3;
  max-width: clamp(5rem, 10vw, 10rem);
  cursor:pointer;
}
.logo img{
  max-width: 100%;
}

.btn{
  padding: .75rem 1.5rem;
}
.upload{
  margin-right:0rem;
  width:auto;
  min-width:50rem;
  display:flex;
  justify-content:space-around;
  align-items:center;
}
.p{
  font-style: normal;
font-weight: 600;
font-size: 20px;
color: var(--white)
}
.s{
  font-weight: 500;
font-size: 16px;
color: #50D37D;
/* color: var(--orange); */
}
.myPublications{
  background-color:transparent;
  color: var(--white);
  font-weight: 700;
  width: max-content;
  padding: 5px;
  line-height: 2;
    /* border: 2px solid red; */
}
  .myPublications::after {
    content: "";
    display: block;
    width: 0;
    margin-inline: auto;
    height: 3px;
    background-color: var(--orange);
    transition: 0.35s ease-out;
  }

  .myPublications:hover::after {
    width: 100%;
  }
</style>
