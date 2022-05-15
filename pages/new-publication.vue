<template>
  <div class="upload_container">
    <div class="main_container">
      <input id="" v-model="title" type="text" placeholder="Enter Title" class="text">
      <br>
      <textarea
        id=""
        v-model="description"
        cols="50"
        rows="10"
        placeholder="Brief Description"
        class="text"
      />
      <div class="upload_grid">
        <div class="lhs">
          <p>Upload File</p>
          <div class="upload_flex">
            <div class="file_type_container">
              <input
                id="file-upload"
                type="file"
                name="file"
                required
                accept=".pdf"
                @change="selectFile"
                @click="resetFile($event)"
                :disabled="selectedFiles.length === 1"
              >
              <img src="~assets/images/pdf.png">
            </div>
            <div class="file_type_container">
              <input
                id="file-upload"
                type="file"
                name="file"
                required
                accept=".xls"
                @change="selectFile"
                @click="resetFile($event)"
                :disabled="selectedFiles.length === 1"
              >
              <img src="~assets/images/xls.png">
            </div>
          </div>
          <p v-if="selectedFiles[0]" class="only_file"> {{selectedFiles[0]? selectedFiles[0].name.slice(0, 25): ''}}
           <button class="cancel" @click="selectedFiles.pop()" @click.stop>x</button>
          </p>
          <p v-else >Only Pdf and Xls files are supported</p>
        </div>
        <div class="rhs">
          <p>Select Category</p>
          <div class="checkbox-container">
            <div class="checkbox">
              <label for="" class="label-name-2">
                <input
                  id="text-field19"
                  v-model="category"
                  type="radio"
                  name="category"
                  value="Premium"
                >
                <span>Premium</span>
              </label>
            </div>
            <div class="checkbox">
              <label for="" class="label-name-2">
                <input
                  id="text-field19"
                  v-model="category"
                  type="radio"
                  name="category"
                  value="Free"
                >
                <span>Free</span>
              </label>
            </div>
          </div>
          <p>Note  please note that you would not get any incentive on free category</p>
          <button class="btn submit" @click="main()" :disabled="!title || !description || !selectedFiles.length || !category">
          <Loader v-if="loader" />
            <span v-else> Submit </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Web3Storage } from 'web3.storage'
import { create } from 'ipfs-http-client'
// import { HashConnect } from 'hashconnect'
// import { ethers } from 'ethers'
// import {
//   Hbar,
//   ContractFunctionParameters,
//   ContractExecuteTransaction
// } from '@hashgraph/sdk'
export default {
  data () {
    return {
      title: '',
      description: '',
      category: '',
      selectedFiles: [],
      loader: false
    }
  },
  methods: {
    resetFile (event) {
      event.target.value = ''
      // this.document1 = null
    },
    selectFile (event, index) {
      // this.loading = true
      const doc = event.target.files[0]
      this.selectedFiles.push(doc)
      // console.log(doc)
    },
    async main () {
      // const hashconnect = new HashConnect()
      this.loader = true
      // const provider = hashconnect.getProvider(
      //   'testnet',
      //   this.$store.state.walletDetails.topic,
      //   '0.0.34750378'
      // )
      // // console.log(walletData[1])
      // const signer = hashconnect.getSigner(provider)
      // // const functionCall = encodeFunctionCall('upload', [this.category === 'Premium' ? 0 : 1])
      // const contractExecTx = await new ContractExecuteTransaction()
      //   .setContractId('0.0.34804013')
      //   .setGas(3000000)
      //   .setFunction('create', new ContractFunctionParameters()
      //     .addString(this.category === 'Premium' ? 0 : 1))
      //   .setPayableAmount(new Hbar(ethers.utils.parseUnits(0.0000000000000001, 8)))
      //   .freezeWithSigner(signer)
      // const res = await contractExecTx.executeWithSigner(signer)
      // const resRx = await res.getReceipt(signer)

      // console.log(`- Token association with Contract's account: ${resRx} \n`)
      const client = create('https://ipfs.infura.io:5001/api/v0')
      try {
        const created = await client.add(this.selectedFiles[0])
        const url = `https://ipfs.infura.io/ipfs/${created.path}`
        // console.log(url)
        const dataToSave = {
          title: this.title,
          description: this.description,
          date: new Date(),
          id: Date.now(),
          url
        }
        const arr = JSON.parse(localStorage.getItem('Publications')) || []
        arr.push(dataToSave)
        localStorage.setItem('Publications', JSON.stringify(arr))
        this.$router.push('/creator-dashboard')
      } catch (error) {
        // console.log(error.message)
      }
      this.loader = false
    }
  }
}
</script>

<style  scoped>
.upload_container{
    background: #F4F6FE;
    border-radius: 10px;
    margin: 3rem 4.5rem;
    padding:3rem 0;
}
.main_container{
margin:1rem 20%;
width:60%;
}
.text{
width:100%;
background: #FFFFFF;
border-radius: 10px;
border:none;
padding:1.5rem;
font-weight: 500;
font-size: 24px;
margin-bottom: 2rem;
font-family: 'Montserrat';
/* color:grey; */
}
.upload_grid{
    display: grid;
    grid-template-columns: 1fr 1fr;
}
.upload_flex{
    margin: 1.5rem 0;
    display: flex;
}
.file_type_container{
    background: rgba(214, 221, 246, 0.58);
border-radius: 5.89041px;
padding:.5rem;
width:auto;
margin-right: 3rem;
position:relative;
}
.lhs p, .rhs p{
    color: #575757;
    font-weight: 400;
    font-size: 24px;
}
.lhs p:nth-last-child(1) {
    font-weight: 400;
    font-size: 16px;
    color: #000000;
}
.label-name-2 {
  display: inline-flex;
  cursor: pointer;
  position: relative;
  font-size: 16px;
  align-items: flex-start;
  margin-bottom: 1rem;
}
.label-name-2 > input {
  height: 30px;
  width: 30px;
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
  border-radius: 5px;
  outline: none;
  transition-duration: 0.3s;
  background-color: rgba(87, 87, 87, 0.09);
  cursor: pointer;
}

.label-name-2 > input:checked {
  border: 1px solid  #07124C;;
  background-color:  #07124C;;
  color: white;
}
.label-name-2 span {
  margin-top: 5px;
  margin-left: 1.5rem;
  font-weight: 400;
font-size: 20px;
color: #575757;
}

.label-name-2 > input:active {
  border: 2px solid  #07124C;;
}
.rhs p:nth-last-child(2) {
    font-weight: 500;
    font-size: 12px;
    color: #DD2025;
    margin-bottom: 1.5rem;
}
.submit{
    width: 258px;
    height: 56px;
    display:flex;
    justify-content:center;
    align-items:center;

}
#file-upload {
opacity:0;
  width:100%;
  height:100%;
  position:absolute;
  z-index:10;
}
#file-upload:disabled {
  cursor: not-allowed;
}
.checkbox-container{
  margin-top:.5rem;
}
.cancel {
  margin-left: 8px;
  /* height: 15px; */
  /* width: 15px; */
  /* border-radius: 50%; */
  border: none;
  background-color: transparent;
  color: black;
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
  font-size: 20px;
  display: none;
  /* margin-bottom: -5rem; */
}
.cancel:hover {
  background-color: none;
  color: red;
  border-color: red;
}
.only_file:hover .cancel{
  display:inline-block;
}
.only_file{
  display:flex;
  align-items: center;
}
button:disabled{
  cursor:not-allowed;
  background-color:#364489;
}
</style>
