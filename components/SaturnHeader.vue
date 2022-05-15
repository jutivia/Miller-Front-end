<template>
  <header>
    <h3 class="title" @click="$router.push('/')">
      Miller
    </h3>
    <!-- Message icon -->
    <div v-if="!showDetails" >
    <button class="btn margins" @click="connect">
      Connect wallet
    </button>
    </div>
    <div v-else class="upload">
      <button class="btn margins" @click="$router.push('/new-publication')">
       Upload Publication
     </button>
     <div>
     <p class="p">Total Hbar </p>
      <span class="s"><img src="~assets/images/eye.png"> {{ amount }}ℏ</span>
      </div>
      <div>
      <p class="p"> Account ID</p>
      <span class="s"> {{account}} </span>
      </div>
    </div>
  </header>
</template>

<script>
import { HashConnect } from 'hashconnect'
import { ethers } from 'ethers'
export default {
  name: 'SaturnHeader',
  data () {
    return {
      saveData: {
        topic: '',
        pairingString: '',
        privateKey: '',
        pairedWalletData: null,
        pairedAccounts: [],
        network: 'testnet'
      },
      localData: false,
      showDetails: null,
      account: '0.0.0',
      amount: '00.00'
    }
  },
  computed: {
    checkConnected () {
      return this.showDetails
    }
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
  },
  created () {
    this.showDetails = false
    // this.loadLocalData()
  },
  methods: {
    async connect () {
      const hashconnect = new HashConnect()
      // console.log('hashconnect:', hashconnect)
      const appMetadata = {
        name: 'Miller App',
        description: 'An publication app',
        icon: 'https://www.hashpack.app/img/logo.svg'
      }

      this.loadLocalData()
      // console.log('localdata:', this.localData)
      if (!this.localData) {
        const initData = await hashconnect.init(appMetadata)
        // console.log('initdata:', initData)
        this.saveData.privateKey = initData.privKey

        // then connect, storing the new topic for later
        const state = await hashconnect.connect()
        // console.log('state:', state)
        this.saveData.topic = state.topic
        // generate a pairing string, which you can display and generate a QR code from
        this.saveData.pairingString = hashconnect.generatePairingString(state, 'testnet', false)
        // find any supported local wallets
        hashconnect.findLocalWallets()
        hashconnect.foundExtensionEvent.once((walletMetadata) => {
          hashconnect.connectToLocalWallet(this.saveData.pairingString, walletMetadata)
        })
        // console.log('saveData1:', this.saveData)
        hashconnect.pairingEvent.once(async (pairingData) => {
          // console.log('pairingData:', pairingData)
          this.saveData.pairedAccounts = pairingData.accountIds
          // console.log('saveData2:', this.saveData)
          await this.getAccountBalance()
          this.$store.commit('setWalletDetails', this.saveData)
          this.saveDataInLocalStorage()
          this.showDetails = true
        })
      } else {
        await hashconnect.init(appMetadata, this.saveData.privateKey)
        await hashconnect.connect(this.saveData.topic, this.saveData.pairedWalletData)
        await this.getAccountBalance()
        this.showDetails = true
        this.$store.commit('setWalletDetails', this.saveData)
      }
      // console.log('done pairing')
    },
    loadLocalData () {
      const foundData = localStorage.getItem('connectedData')
      // console.log('foundata:', foundData)
      if (foundData) {
        this.saveData = JSON.parse(foundData)
        // console.log(this.saveData)
        this.localData = true
      } else {
        this.localData = false
      }
      // this.localData = false
    },
    saveDataInLocalStorage () {
      const dataToSave = JSON.stringify(this.saveData)
      localStorage.setItem('connectedData', dataToSave)
    },
    async getAccountBalance () {
      const hashconnect = new HashConnect()
      const provider = await hashconnect.getProvider(this.saveData.network, this.saveData.topic, this.saveData.pairedAccounts[0])
      // const accountId = hashconnect.getAccountId(this.saveData.privateKey)
      const balance = await provider.getAccountBalance(this.saveData.pairedAccounts[0])
      // console.log('accountId', accountId)
      const big = balance.hbars._valueInTinybar.c[0].toString()
      this.amount = ethers.utils.formatUnits(big, 8)
      this.account = this.saveData.pairedAccounts[0]
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
