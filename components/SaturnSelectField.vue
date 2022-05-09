<template>
  <div class="content">
    <div class="container">
      <!-- Markup for Select Container : Beginning -->
      <div class="form-select">
        <label class="label-name">Field Name</label>
        <select v-model="select" required>
          <option value="">
            Choose
          </option>
          <option value="male">
            Option 1
          </option>
          <option value="female">
            Option 2
          </option>
        </select>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.9997 9.17019C16.8123 8.98394 16.5589 8.87939 16.2947 8.87939C16.0305 8.87939 15.7771 8.98394 15.5897 9.17019L11.9997 12.7102L8.4597 9.17019C8.27234 8.98394 8.01889 8.87939 7.7547 8.87939C7.49052 8.87939 7.23707 8.98394 7.0497 9.17019C6.95598 9.26315 6.88158 9.37375 6.83081 9.49561C6.78004 9.61747 6.75391 9.74818 6.75391 9.88019C6.75391 10.0122 6.78004 10.1429 6.83081 10.2648C6.88158 10.3866 6.95598 10.4972 7.0497 10.5902L11.2897 14.8302C11.3827 14.9239 11.4933 14.9983 11.6151 15.0491C11.737 15.0998 11.8677 15.126 11.9997 15.126C12.1317 15.126 12.2624 15.0998 12.3843 15.0491C12.5061 14.9983 12.6167 14.9239 12.7097 14.8302L16.9997 10.5902C17.0934 10.4972 17.1678 10.3866 17.2186 10.2648C17.2694 10.1429 17.2955 10.0122 17.2955 9.88019C17.2955 9.74818 17.2694 9.61747 17.2186 9.49561C17.1678 9.37375 17.0934 9.26315 16.9997 9.17019Z" fill="black" />
        </svg>
      </div>
      <!-- Markup for Select Container : End -->

      <!-- Markup for File Upload Container : Beginning -->
      <div class="file-upload-container">
        <label class="label-name">Field Name</label>
        <label class="select-file-container">
          <input
            id="file-upload"
            type="file"
            name="file"
            required
            accept="image/jpeg, image/png"
            @change="selectFile"
          >
          <div class="upload-name">
            Choose
            <input
              v-if="selectedFile !== null"
              v-model="selectedFile.name"
              class="selected-file"
              type="text"
              readonly
              required
            >
          </div>
          <button class="upload-btn">Select</button>
        </label>
      </div>
      <!-- Markup for File Upload Container : End -->

      <!-- Markup for Select Container 3 : Beginning -->
      <form class="form-container-3">
        <label class="label-name-3" for="text-field">Field Name</label>
        <div class="input-field-3">
          <div class="choose-div">
            <input
              id="choose-date"
              ref="choosedate"
              v-model="chooseDate"
              type="text"
              class="choose"
              name="choose-date"
              placeholder="Choose"
              @blur="showDateIcon"
              @focus="hideDateIcon"
            >
            <div
              v-if="!hideIcon"
              class="calendar-choose"
              alt=""
              @click="hideDateIcon"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 19C12.1978 19 12.3911 18.9414 12.5556 18.8315C12.72 18.7216 12.8482 18.5654 12.9239 18.3827C12.9996 18.2 13.0194 17.9989 12.9808 17.8049C12.9422 17.6109 12.847 17.4327 12.7071 17.2929C12.5673 17.153 12.3891 17.0578 12.1951 17.0192C12.0011 16.9806 11.8 17.0004 11.6173 17.0761C11.4346 17.1518 11.2784 17.28 11.1685 17.4444C11.0586 17.6089 11 17.8022 11 18C11 18.2652 11.1054 18.5196 11.2929 18.7071C11.4804 18.8946 11.7348 19 12 19ZM17 19C17.1978 19 17.3911 18.9414 17.5556 18.8315C17.72 18.7216 17.8482 18.5654 17.9239 18.3827C17.9996 18.2 18.0194 17.9989 17.9808 17.8049C17.9422 17.6109 17.847 17.4327 17.7071 17.2929C17.5673 17.153 17.3891 17.0578 17.1951 17.0192C17.0011 16.9806 16.8 17.0004 16.6173 17.0761C16.4346 17.1518 16.2784 17.28 16.1685 17.4444C16.0586 17.6089 16 17.8022 16 18C16 18.2652 16.1054 18.5196 16.2929 18.7071C16.4804 18.8946 16.7348 19 17 19ZM17 15C17.1978 15 17.3911 14.9414 17.5556 14.8315C17.72 14.7216 17.8482 14.5654 17.9239 14.3827C17.9996 14.2 18.0194 13.9989 17.9808 13.8049C17.9422 13.6109 17.847 13.4327 17.7071 13.2929C17.5673 13.153 17.3891 13.0578 17.1951 13.0192C17.0011 12.9806 16.8 13.0004 16.6173 13.0761C16.4346 13.1518 16.2784 13.28 16.1685 13.4444C16.0586 13.6089 16 13.8022 16 14C16 14.2652 16.1054 14.5196 16.2929 14.7071C16.4804 14.8946 16.7348 15 17 15ZM12 15C12.1978 15 12.3911 14.9414 12.5556 14.8315C12.72 14.7216 12.8482 14.5654 12.9239 14.3827C12.9996 14.2 13.0194 13.9989 12.9808 13.8049C12.9422 13.6109 12.847 13.4327 12.7071 13.2929C12.5673 13.153 12.3891 13.0578 12.1951 13.0192C12.0011 12.9806 11.8 13.0004 11.6173 13.0761C11.4346 13.1518 11.2784 13.28 11.1685 13.4444C11.0586 13.6089 11 13.8022 11 14C11 14.2652 11.1054 14.5196 11.2929 14.7071C11.4804 14.8946 11.7348 15 12 15ZM19 3H18V2C18 1.73478 17.8946 1.48043 17.7071 1.29289C17.5196 1.10536 17.2652 1 17 1C16.7348 1 16.4804 1.10536 16.2929 1.29289C16.1054 1.48043 16 1.73478 16 2V3H8V2C8 1.73478 7.89464 1.48043 7.70711 1.29289C7.51957 1.10536 7.26522 1 7 1C6.73478 1 6.48043 1.10536 6.29289 1.29289C6.10536 1.48043 6 1.73478 6 2V3H5C4.20435 3 3.44129 3.31607 2.87868 3.87868C2.31607 4.44129 2 5.20435 2 6V20C2 20.7956 2.31607 21.5587 2.87868 22.1213C3.44129 22.6839 4.20435 23 5 23H19C19.7956 23 20.5587 22.6839 21.1213 22.1213C21.6839 21.5587 22 20.7956 22 20V6C22 5.20435 21.6839 4.44129 21.1213 3.87868C20.5587 3.31607 19.7956 3 19 3ZM20 20C20 20.2652 19.8946 20.5196 19.7071 20.7071C19.5196 20.8946 19.2652 21 19 21H5C4.73478 21 4.48043 20.8946 4.29289 20.7071C4.10536 20.5196 4 20.2652 4 20V11H20V20ZM20 9H4V6C4 5.73478 4.10536 5.48043 4.29289 5.29289C4.48043 5.10536 4.73478 5 5 5H6V6C6 6.26522 6.10536 6.51957 6.29289 6.70711C6.48043 6.89464 6.73478 7 7 7C7.26522 7 7.51957 6.89464 7.70711 6.70711C7.89464 6.51957 8 6.26522 8 6V5H16V6C16 6.26522 16.1054 6.51957 16.2929 6.70711C16.4804 6.89464 16.7348 7 17 7C17.2652 7 17.5196 6.89464 17.7071 6.70711C17.8946 6.51957 18 6.26522 18 6V5H19C19.2652 5 19.5196 5.10536 19.7071 5.29289C19.8946 5.48043 20 5.73478 20 6V9ZM7 15C7.19778 15 7.39112 14.9414 7.55557 14.8315C7.72002 14.7216 7.84819 14.5654 7.92388 14.3827C7.99957 14.2 8.01937 13.9989 7.98079 13.8049C7.9422 13.6109 7.84696 13.4327 7.70711 13.2929C7.56725 13.153 7.38907 13.0578 7.19509 13.0192C7.00111 12.9806 6.80004 13.0004 6.61732 13.0761C6.43459 13.1518 6.27841 13.28 6.16853 13.4444C6.05865 13.6089 6 13.8022 6 14C6 14.2652 6.10536 14.5196 6.29289 14.7071C6.48043 14.8946 6.73478 15 7 15ZM7 19C7.19778 19 7.39112 18.9414 7.55557 18.8315C7.72002 18.7216 7.84819 18.5654 7.92388 18.3827C7.99957 18.2 8.01937 17.9989 7.98079 17.8049C7.9422 17.6109 7.84696 17.4327 7.70711 17.2929C7.56725 17.153 7.38907 17.0578 7.19509 17.0192C7.00111 16.9806 6.80004 17.0004 6.61732 17.0761C6.43459 17.1518 6.27841 17.28 6.16853 17.4444C6.05865 17.6089 6 17.8022 6 18C6 18.2652 6.10536 18.5196 6.29289 18.7071C6.48043 18.8946 6.73478 19 7 19Z"
                  fill="black"
                />
              </svg>
            </div>
            <!-- <img
                v-if="!hideIcon"
                src="~/assets/images/calendarIcon.svg"
                class="calendar-choose"
                alt=""
                @click="hideDateIcon"
              > -->
          </div>
        </div>
      </form>
      <!-- Markup for Select Container 3 : End -->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      select: '',
      hideIcon: false,
      selectedFile: null,
      chooseDate: ''
    }
  },
  methods: {
    selectFile (event) {
      const fileId = event.target.files[0]
      this.selectedFile = fileId
    },
    hideDateIcon () {
      this.$refs.choosedate.type = 'date'
      this.hideIcon = true
    },
    showDateIcon () {
      this.$refs.choosedate.type = 'text'
      this.hideIcon = false
    }
  }
}
</script>

<style scoped>
.content {
  margin-bottom: 50px;
}

.container {
  border: 1px dashed #7B61FF;
  padding: 50px;
  margin: auto;
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

/* Style for Select Container 1 : Beginning */
.form-select {
  display: flex;
  flex-direction: column;
  position: relative;
  /* margin-right: 24px;
  margin-bottom: 24px; */
}

.label-name {
  font-size: 14px;
  margin-bottom: 10px;
}

.form-select select {
  display: block;
  border: 1px solid #4B545A;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  height: 50px;
  color: #818181;
  padding: 0 16px;
  width: 327px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
}

.form-select svg {
  position: absolute;
  top: 41px;
  right: 16px;
}

/* Style for Select Container : End */

/* Style for File Upload Container : Beginning */
.file-upload-container {
  display: flex;
  flex-direction: column;
}

#file-upload {
  display: none;
}

.selected-file {
  border: none;
  outline: none;
  width: 100%;
  color: #F87023;
  font-size: 13px;
  padding: 2px;
}
.select-file-container {
  border: 1px solid #4B545A;
  width: 327px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 6px;
  border-radius: 3px;
  margin-bottom: 12px;
}
.upload-name {
  padding-left: 15px;
}
.upload-btn {
  padding: 0 25px;
  height: 38px;
  font-size: 14px;
  background-color: #F87023;
  border: none;
  color: white;
  border-radius: 3px;
}

/* Style for File Upload Container : End */

/* Style for Select Container 3 : Beginning */
.form-container-3 {
  display: flex;
  flex-direction: column;
}

.label-name-3 {
  font-size: 14px;
  margin-bottom: 10px;
}

.input-field-3 {
  border: 1px solid #4B545A;
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 50px;
  /* padding-left: 16px; */
  width: 327px;
}

#choose-date {
  background: transparent;
  border: none;
  width: 100%;
  height: 50px;
  margin-right: 24px;
  padding-left: 0.7vw;
  padding-right: 0.38vw;
}

.choose-div {
  width: 100%;
  display: inline;
  position: relative;
}

.calendar-choose {
  position: absolute;
  right: 1.5vw;
  top: 1.2vh;
}

.input-field-img-3 {
  margin: 0 16px;
}

.input-3 {
  border: none;
  outline: none;
  width: 100%;
}

.input-field-3::placeholder {
  color: #230B34;
}

/* Style for Select Container 3 : End */

@media only screen and (max-width: 500px) {
  .container {
    padding: 10px;
    width: 100%;
  }
  .form-select,
  .file-upload-container,
  .form-container-3 {
    margin: 20px auto;
  }
  .form-select select,
  .select-file-container,
  .input-field-3 {
    width: 300px;
  }
}
</style>
