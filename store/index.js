// import { ethers } from 'ethers'
// import Miller from '../utils/miller.json'
export const state = () => ({
  walletDetails: null,
  connected: null
})

export const mutations = {
  setWalletDetails (state, account) {
    state.walletDetails = account
  },
  checkConnected (state, bool) {
    state.connected = bool
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
