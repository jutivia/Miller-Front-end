<template>
  <div class="">
    <div class="go-back-btn">
      <GoBack back="All Publications" path="/show-all" />
    </div>

    <div class="upload_container" @click="showOptions = false">
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
        <input
          v-if="type=='premium'"
          id=""
          v-model="amount"
          type="amount"
          placeholder="Enter Amount In Matic"
          class="text"
        >

        <div class="">
          <input
            id=""
            v-model="item"
            type="text"
            placeholder="Enter Category"
            class="category_text"
            @click="showOptions = true"
            @click.stop
            @keyup="search(item.trim())"
            @keyup.enter="categories.push(item); item=''; options= copyOptions"
          >
          <div v-if="showOptions" class="dropDown">
            <span v-for="option, i in options" :key="i" class="option" @click="categories.push(option)"> {{ capitalize(option) }}</span>
          </div>
        </div>
        <div class="categories">
          <span v-for="i,index in categories" :key="index" class="selected_categories">{{ i }} <span class="x" @click="categories.splice(index,1)"> X </span></span>
        </div>
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
                  :disabled="selectedFiles.length === 1"
                  @change="selectFile"
                  @click="resetFile($event)"
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
                  :disabled="selectedFiles.length === 1"
                  @change="selectFile"
                  @click="resetFile($event)"
                >
                <img src="~assets/images/xls.png">
              </div>
            </div>
            <p v-if="selectedFiles[0]" class="only_file">
              {{ selectedFiles[0]? selectedFiles[0].name.slice(0, 25): '' }}
              <button class="cancel" @click="selectedFiles.pop()" @click.stop>
                x
              </button>
            </p>
            <p v-else>
              <span v-if="!loader1"> Only Pdf and Xls files are supported </span>
              <span v-if="loader1" style="textAlign:center"> loading...</span>
            </p>
          </div>
          <div class="rhs">
            <p>Select Types</p>
            <div class="checkbox-container">
              <div class="checkbox">
                <label for="" class="label-name-2">
                  <input
                    id="text-field19"
                    v-model="type"
                    type="radio"
                    name="type"
                    value="premium"
                  >
                  <span>Premium</span>
                </label>
              </div>
              <div class="checkbox">
                <label for="" class="label-name-2">
                  <input
                    id="text-field19"
                    v-model="type"
                    type="radio"
                    name="type"
                    value="free"
                  >
                  <span>Free</span>
                </label>
              </div>
            </div>
            <p>Note  please note that you would not get any incentives on free types</p>
            <button class="btn submit" :disabled="!title || !description || !selectedFiles.length || !type || !categories.length" @click="main()">
              <Loader v-if="loader" />
              <span v-else> Submit </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { create } from 'ipfs-http-client'
import functions from '~/utils/functions'
export default {
  data () {
    return {
      title: '',
      description: '',
      type: '',
      selectedFiles: [],
      loader: false,
      url: '',
      loader1: false,
      categories: [],
      item: '',
      options: [],
      showOptions: false,
      copyOptons: [],
      amount: ''
    }
  },
  created () {
    this.getAllCategories()
  },
  methods: {
    capitalize: functions.capitalize,
    resetFile (event) {
      event.target.value = ''
      // this.document1 = null
    },
    async selectFile (event, index) {
      this.loader1 = true
      const projectId = process.env.PROJECT_ID
      const projectSecret = process.env.PROJECT_SECRET
      const authorization = 'Basic ' + btoa(projectId + ':' + projectSecret)
      try {
        const doc = event.target.files[0]
        const ipfs = create({
          url: 'https://ipfs.infura.io:5001',
          headers: {
            authorization
          }
        })
        const created = await ipfs.add(doc)
        this.url = `https://miller.infura-ipfs.io/ipfs/${created.path}`
        if (this.url) { this.selectedFiles.push(doc) }
      } catch (error) {
        console.log(error.message)
        this.$toasted.error('File upload failed').goAway(5000)
      }
      this.loader1 = false
    },
    async main () {
      this.loader = true

      try {
        const dataToSave = {
          title: this.title,
          description: this.description,
          cid: this.url,
          type: this.type,
          categories: this.categories,
          userAddress: this.$store.state.userAddress,
          amount: this.type === 'premium' ? this.amount : 0
        }
        const data = await this.$axios.post('/api/v1/publications', dataToSave)
        console.log(data)
        this.$toasted.success(data?.data?.msg).goAway(5000)
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
          this.$toasted.error(err?.response?.data?.msg).goAway(5000)
        }
      }
      this.loader = false
    },
    async getAllCategories () {
      const data = await this.$axios.get('/api/v1/publications/')
      const publications = data.data.publications
      this.data = publications
      const popular = {}
      this.data.map((y) => {
        y.categories.map((x) => {
          isNaN(popular[x]) === true ? popular[x] = 1 : popular[x] += 1
          return x
        })
        return y
      })
      const keys = Object.keys(popular)
      for (let i = 1; i < keys.length; i++) {
        // Go through the elements behind it.
        for (let j = i - 1; j > -1; j--) {
          // value comparison using ascending order.
          if (popular[keys[j + 1]] < popular[keys[j]]) {
            // swap
            [keys[j + 1], keys[j]] = [keys[j], keys[j + 1]]
          }
        }
      }
      this.options = keys
      this.copyOptions = keys
    },
    search (word) {
      this.showOptions = true
      this.options = this.copyOptions.filter(x => x.includes(word))
      if (this.options.length === 0) { this.showOptions = false }
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
/* border: .5px solid #07124c; */
box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
/* color:grey; */
}
.text:focus{
  outline:none;
  background-color:rgba(255, 255, 255, 0.5);
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
.selected_categories, .category_text{
  width:auto;
  padding:10px 10px;
  background:white;
  border-radius:10px;
  border: 1px solid #07124c33;
  color:#07124c;
  font-weight:bold;
  max-height:auto;
  display:flex;
  justify-content:space-around;
  align-items:center;
  gap:.7rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
.selected_categories .x{
  font-size:10px;
  cursor:pointer;
  color:red;
  transition: all 0.25s ease-in-out
}
.selected_categories .x:hover{
  transform: scale(1.5);
}
.categories{
  display:flex;
  justify-content:flex-start;
  flex-wrap: wrap;
  gap:1rem;
  margin: 1rem 0 2rem 0;
}
.category_text{
  position:relative;
  padding: 1.5rem 10px;
  /* border: .5px solid #07124c; */
  border:none;
  min-width:100%;
  padding-left:1rem;
  box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
  font-family: 'Montserrat';
  font-size: 24px;
  font-weight:normal;
}
.category_text:focus{
  outline:none;
}
.dropDown{
  position:absolute;
  display:flex;
  flex-direction:column;
  background:white;
  width:inherit;
  padding:.7rem .5rem;
  z-index:10;
  max-height:10rem;
  overflow-y:scroll;
  margin-top:.1rem;
  border: 1px solid #e2e2ea;
  box-shadow: -1px 10px 15px rgba(117, 117, 158, 0.1);
  border-radius: 10px;
  min-height:1rem;
  min-width: auto;
}
.option{
  color: #07124c;
  font-weight:bold;
  padding:.5rem 2rem;
}
.option:hover{
  background-color: #07124c;
  color: white;
  border-radius: 10px;
}
</style>
