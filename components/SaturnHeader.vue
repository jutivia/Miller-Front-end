<template>
  <header>
    <h3 class="title" @click="$router.push('/')">
      Miller
    </h3>
    <!-- Message icon -->
    <div v-if="!showDetails">
      <button class="btn margins" @click="connect">
        Connect wallet
      </button>
    </div>
    <div v-else class="upload">
      <button class="btn margins" @click="$router.push('/new-publication')">
        Upload Publication
      </button>
      <div>
        <p class="p">
          Total Matic
        </p>
        <span class="s"><img src="~assets/images/eye.png"> {{ amount }} MATIC</span>
      </div>
      <div>
        <p class="p">
          Account ID
        </p>
        <span class="s"> {{ account }} </span>
      </div>
    </div>
  </header>
</template>

<script>
import Web3Modal from 'web3modal'
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import WalletConnect from '@walletconnect/web3-provider'
import { ethers } from 'ethers'
export default {
  name: 'SaturnHeader',
  data () {
    return {
      localData: false,
      showDetails: null,
      account: '0.0.0',
      amount: '00.00',
      chainId: 8001,
      provider: null,
      chainIsChanged: false
    }
  },
  computed: {
    checkConnected () {
      return this.showDetails
    }
    // checkNetworkChange () {
    //   // const provider = new ethers.providers.Web3Provider(window.ethereum)
    //   this.provider?.on('chainChanged', () => {
    //     console.log(this.provider?._network?.chainId)
    //   })
    //   return this.provider?._network?.chainId
    // }
  },
  watch: {
    checkConnected () {
      this.$store.commit('checkConnected', this.showDetails)
      if (this.showDetails === false) {
        this.$router.push('/')
      } else {
        this.$router.push('/creator-dashboard')
      }
    }
    // async checkNetworkChange () {
    //   const network = await this.provider.getNetwork()
    //   this.chainId = network.chainId
    //   if (this.chainId === 80001) {
    //     const accounts = await this.provider.listAccounts()
    //     this.account = this.cutAddr(accounts[0])
    //     this.provider.getBalance(accounts[0]).then((balance) => {
    //       const balanceInEth = ethers.utils.formatEther(balance).toString()
    //       const deci = balanceInEth.split('.')
    //       const end = deci[1].slice(0, 3)
    //       this.amount = deci[0].concat('.').concat(end)
    //     })
    //     this.showDetails = true
    //   } else {
    //     this.showDetails = false
    //     this.$toasted.error("You're on  a wrong network. kindly switch to the Polygon Mumbai Testnet").goAway(3500)
    //   }
    //   this.chainIsChanged = false
    //   return this.chainIsChanged
    // }
  },
  created () {
    this.showDetails = false
    // this.loadLocalData()
  },
  methods: {
    async connect () {
      const providerOptions = {
        coinbasewallet: {
          package: CoinbaseWalletSDK,
          options: {
            appName: 'Miller',
            infuraId: process.env.INFURA_KEY
          }
        },
        walletconnect: {
          package: WalletConnect,
          options: {
            infuraId: process.env.INFURA_KEY
          }
        }
      }

      const web3Modal = new Web3Modal({
        network: 'matic',
        cacheProvider: true, // optional
        providerOptions // required
      })

      const instance = await web3Modal.connect()
      this.provider = new ethers.providers.Web3Provider(instance)
      if (this.provider) {
        const accounts = await this.provider.listAccounts()
        const network = await this.provider.getNetwork()
        this.chainId = network.chainId
        if (this.chainId === 80001) {
          this.account = this.cutAddr(accounts[0])
          this.provider.getBalance(accounts[0]).then((balance) => {
            const balanceInEth = ethers.utils.formatEther(balance).toString()
            const deci = balanceInEth.split('.')
            const end = deci[1].slice(0, 3)
            this.amount = deci[0].concat('.').concat(end)
          })
          this.showDetails = true
        } else {
          this.showDetails = false
          this.$toasted.error("You're on  a wrong network. kindly switch to the Polygon Mumbai Testnet").goAway(3500)
        }
      } else {
        this.$toasted.error('No wallet connection available on your device').goAway(3500)
      }

      this.$store.commit('checkConnected', this.showDetails)
    },
    loadLocalData () {
      const foundData = localStorage.getItem('connectedData')
      if (foundData) {
        this.saveData = JSON.parse(foundData)
        // console.log(this.saveData)
        this.localData = true
      } else {
        this.localData = false
      }
    },
    saveDataInLocalStorage () {
      const dataToSave = JSON.stringify(this.saveData)
      localStorage.setItem('connectedData', dataToSave)
    },
    cutAddr (addr) {
      const starter = addr.slice(0, 4)
      const end = addr.slice(addr.length - 4)
      return `${starter}...${end}`
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
  padding: 0.813rem 2.313rem 0.75rem 1.563rem;
  background: #fff;
  box-shadow: inset 0px -1px 0px #e2e2ea;
  height:5rem;
}

.show-menu {
  display: none;
}

.title {
  flex: 3;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.125rem;
  color:#cf6dbb;
  margin-left:2rem;
  cursor:pointer;
}

.margins{
   width: 246px;
height: 56px;
margin-right:2.5rem;
}
.upload{
  margin-right:2.5rem;
  width:auto;
  min-width:40rem;
  display:flex;
  justify-content:space-between;
  align-items:center;
}
.p{
  font-style: normal;
font-weight: 600;
font-size: 20px;
color: #07124C;
}
.s{
  font-weight: 500;
font-size: 16px;
color: #575757;
}
</style>
