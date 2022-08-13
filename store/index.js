// import { ethers } from 'ethers'
// import Miller from '../utils/miller.json'
export const state = () => ({
  walletDetails: null,
  connected: null,
  provider: null,
  token: null,
  userId: null,
  userAddress: null
})

export const mutations = {
  setToken (state, token) {
    state.token = token
  },
  setWalletDetails (state, account) {
    state.walletDetails = account
  },
  checkConnected (state, bool) {
    state.connected = bool
  },
  setProvider (state, details) {
    state.provider = details
  },
  setUserId (state, details) {
    state.userId = details
  },
  setUserAddress (state, details) {
    state.userAddress = details
  }
}
export const actions = {
//   getContract ({ state }) {
//     try {
//       const { ethereum } = window
//       const provider = new ethers.providers.Web3Provider(ethereum)
//       const signer = provider.getSigner()
//       const connectedContract = new ethers.Contract(
//         state.contract_address,
//         Miller.abi,
//         signer
//       )
//       return connectedContract
//     } catch (error) {
//       console.log(error)
//       console.log('connected contract not found')
//       return null
//     }
//   }
}
