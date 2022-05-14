<template>
  <div v-if="data !== null">
    <div class="saturn-table-ctn">
      <div v-if="searchMode" class="search-mode">
        <div class="saturn-table-wrapper">
          <client-only>
            <table :class="['table', (dataMutable.styles.fullWidth ? 'full-width' : '')]">
              <tr class="header-row">
                <th v-for="(header) in dataMutable.headers" :key="header.key" :class="[(header.isFilterable ? '' : 'no-filter')]" @click="sortColumn(header)">
                  <span> {{ header.label }} </span>
                  <span>
                    <svg
                      style="transform: rotate(180deg)"
                      class="filter-icon"
                      width="7"
                      height="13"
                      viewBox="0 0 7 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path opacity="0.4" d="M3.5 0L6.53109 5.25H0.468911L3.5 0Z" fill="#7C86A1" />
                      <path d="M3.5 13L6.53109 7.75H0.468911L3.5 13Z" fill="#7C86A1" />
                    </svg>
                  </span>
                </th>
                <th>
                  Action
                </th>
              </tr>
              <tr v-for="(label, index) in searchedLabels" :key="index" class="table-row">
                <td v-for="(header) in dataMutable.headers" :key="header.key">
                  <!--
              Information here renders based on the type of the [label]
              Valid types are 'date/time', 'currency'
            -->
                  {{ formatCell(header.type, label[header.key]) }}
                </td>
              </tr>
            </table>
          </client-only>
        </div>
      </div>
      <div v-else class="no-search-mode">
        <div class="saturn-table-wrapper">
          <client-only>
            <table :class="['table', (dataMutable.styles.fullWidth ? 'full-width' : '')]">
              <tr class="header-row">
                <th v-for="(header) in dataMutable.headers" :key="header.key" :class="[(header.isFilterable ? '' : 'no-filter')]" @click="sortColumn(header)">
                  <span> {{ header.label }} </span>
                  <span>
                    <svg
                      style="transform: rotate(180deg)"
                      class="filter-icon"
                      width="7"
                      height="13"
                      viewBox="0 0 7 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path opacity="0.4" d="M3.5 0L6.53109 5.25H0.468911L3.5 0Z" fill="#7C86A1" />
                      <path d="M3.5 13L6.53109 7.75H0.468911L3.5 13Z" fill="#7C86A1" />
                    </svg>
                  </span>
                </th>
                <th>
                &#160;&#160;
                </th>
              </tr>
              <tr v-for="(label, index) in currentLabels" :key="index" class="table-row">
                <td v-for="(header) in dataMutable.headers" :key="header.key" @click="$emit('action', label)">
                  <!--
              Information here renders based on the type of the [label]
              Valid types are 'date/time', 'currency'
            -->
                  {{ formatCell(header.type, label[header.key]) }}
                </td>
                <td class="action">
                  <button class="clear-btn" @click="$emit('action', label)">
                    <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3Z" stroke="black" stroke-width="2" />
                      <path d="M10 3C10.5523 3 11 2.55228 11 2C11 1.44772 10.5523 1 10 1C9.44772 1 9 1.44772 9 2C9 2.55228 9.44772 3 10 3Z" stroke="black" stroke-width="2" />
                      <path d="M18 3C18.5523 3 19 2.55228 19 2C19 1.44772 18.5523 1 18 1C17.4477 1 17 1.44772 17 2C17 2.55228 17.4477 3 18 3Z" stroke="black" stroke-width="2" />
                    </svg>

                    <span type="button" class="link">
                      {{ dataMutable.styles.actionText }}
                    </span>
                  </button>
                </td>
              </tr>
            </table>
          </client-only>
        </div>
      </div>
    </div>
    <div v-if="data.labels.length > data.rowPerPage" class="pagination-bulk">
      <div class="pagination">
        <span>
          <button class="nav-btn previous" @click="previousPage">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="4" />
              <path d="M17.1602 11.41L12.5802 16L17.1602 20.59L15.7502 22L9.75016 16L15.7502 10L17.1602 11.41Z" fill="#8692A7" />
            </svg>
          </button>
          <button class="nav-btn first" @click="firstPage">
            1
          </button>
          <button v-if="data.labels.length > 20 && (currentPage !== 1 && currentPage !== lastPageValue)" class=" middle">
            {{ currentPage }}
          </button>
          <button v-if="data.labels.length > 20 && (currentPage === 1 || currentPage === lastPageValue)" class="nav-btn first">
            ...
          </button>
          <button v-if="data.labels.length >= 11" class="nav-btn last" @click="lastPage">
            {{ lastPageValue }}
          </button>
          <button class="nav-btn next" @click="nextPage">
            <svg
              style="transform: rotate(180deg)"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="32" height="32" rx="4" />
              <path d="M17.1602 11.41L12.5802 16L17.1602 20.59L15.7502 22L9.75016 16L15.7502 10L17.1602 11.41Z" fill="#8692A7" />
            </svg>
          </button>
        </span>
      </div>
    </div>
  </div>
  <div v-else class="stuff">
    Add <b>Correct and Full</b> Data to mount table
  </div>
</template>

<script>
export default {
  name: 'SaturnTable',
  props: {
    /**
     * @name data
     * @type {Object}
     * @returns Encapsulated Data of to be rendered by DOM table
     *  @name data.title is the main title of the Table, must have a type of String
     *  @name data.rowPerPage
     *  @name data.searchBy
     *  @name data.headers are the contents of each column in the table, must have a type of Array<Object>
     *  @name data.labels are the contents in each cell respective to the headers initially defined, must have a type of Array<Object>
     *  @name data.styles are used to manipulate the default look of the table, must have a type of Object
     *   @name data.styles.fullWidth boolean value to apply a full width to the table's vertical edges, defaults to false
     *   @name data.styles.actionText string value to replace the action icon, if [actionText] is undefined, icon is used
     */
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      checkedRows: new Set(),
      checkedRowsArray: [],
      dataMutable: { ...this.data },
      selectedAction: null,
      startRow: 0,
      endRow: this.data.rowPerPage,
      searchMode: false,
      searchedLabels: [],
      currentPage: 1
    }
  },
  computed: {
    searchBy () {
      const labelId = this.data.searchBy
      for (const header of this.data.headers) {
        if (header.key === labelId) {
          return header
        }
      }
      return null
    },
    allRowsChecked () {
      for (const label of this.currentLabels) {
        if (!this.checkedRowsArray.includes(label._id)) {
          return false
        }
      }
      return true
    },
    lastPageValue () {
      return Math.ceil(this.data.labels.length / this.data.rowPerPage)
    },
    months () {
      return ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December']
    },
    currentLabels () {
      return this.data.labels.slice(this.startRow, this.endRow)
    }
  },
  watch: {
    selectedAction: {
      immediate: true,
      handler (val, _old) {
        if (val !== null) {
          this.$emit(val.event, this.checkedRowsArray)
        }
      }
    }
  },
  created () {
    this.$emit('created')
  },
  mounted () {
    this.$emit('mounted')
  },
  methods: {
    formatDate (dateString) {
      const date = new Date(dateString)
      const dayString = `${this.months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
      const timeString = date.toLocaleTimeString()
      return `${dayString},  ${timeString}`
    },
    formatCurrency (num) {
      return '₦' + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    },
    filterLabels (query) {
      query = query.toLowerCase()
      this.searchedLabels = [...this.dataMutable.labels].filter(label => label[this.data.searchBy].toLowerCase().includes(query))
    },
    searchLabels (query) {
      if (query.length > 0) {
        this.searchMode = true
        this.filterLabels(query)
      } else {
        this.searchMode = false
      }
    },
    /**
     * @type {String}
     * @returns formatted and more accurate string based on the type assigned in {dataMutable.headers[i].key}
     *  valid keys are 'date/time', 'currency'
     */
    formatCell (type, rawContent) {
      if (type === 'date/time') {
        return this.formatDate(rawContent)
      } else if (type === 'currency') {
        return this.formatCurrency(rawContent)
      } else {
        return rawContent
      }
    },
    /**
     * Method to check all rows in the table
     * The Vue Framwework's reactivity is limited with data structures such as sets,
     * ...as such an array is used to check whether a label has been checked [line 238]
     */
    checkAllRows () {
      if (this.allRowsChecked) {
        for (const label of this.dataMutable.labels.slice(this.startRow, this.endRow)) {
          this.checkedRows.delete(label._id)
        }
      } else {
        for (const label of this.dataMutable.labels.slice(this.startRow, this.endRow)) {
          this.checkedRows.add(label._id)
        }
      }
      this.checkedRowsArray = Array.from(this.checkedRows)
    },
    /**
     * Method to check a row in the table
     * @param label identifies the specific row that is to be checked
     * The Vue Framwework's reactivity is limited with data structures such as sets,
     * ...as such an array is used to check whether a label has been checked [line 252]
     */
    toggleCheck (label) {
      if (this.checkedRows.has(label._id)) {
        this.checkedRows.delete(label._id)
      } else {
        this.checkedRows.add(label._id)
      }
      this.checkedRowsArray = Array.from(this.checkedRows)
    },
    /**
     * Method to sort column of data clicked according to { header.type }
     * @param header contains information about the column that is to be sorted
     */
    sortColumn (header) {
      switch (header.type) {
        case 'string':
          this.dataMutable.labels.sort((a, b) => {
            const stringA = a[header.key].toString().toLowerCase()
            const stringB = b[header.key].toString().toLowerCase()
            return (stringA > stringB ? 1 : (stringB > stringA ? -1 : 0))
          })
          break
        case 'currency':
        case 'number':
          this.dataMutable.labels.sort((a, b) => {
            const numberA = Number(a[header.key])
            const numberB = Number(b[header.key])
            return (numberA > numberB ? -1 : 1)
          })
          break
        case 'date/time':
          this.dataMutable.labels.sort((a, b) => {
            const dateA = new Date(a[header.key]).getTime()
            const dateB = new Date(b[header.key]).getTime()
            return (dateA > dateB ? -1 : 1)
          })
          break
      }
    },
    nextPage () {
      if (this.endRow < this.data.labels.length) {
        this.currentPage++
        this.startRow += this.data.rowPerPage
        this.endRow += this.data.rowPerPage
      }
    },
    previousPage () {
      if (this.startRow !== 0) {
        this.currentPage--
        this.startRow -= this.data.rowPerPage
        this.endRow -= this.data.rowPerPage
      }
    },
    firstPage () {
      this.startRow = 0
      this.endRow = this.data.rowPerPage
      this.currentPage = 1
    },
    lastPage () {
      const lastPageValue = this.lastPageValue * this.data.rowPerPage
      this.endRow = lastPageValue
      this.startRow = lastPageValue - this.data.rowPerPage
      this.currentPage = this.lastPageValue
    },
    secondPage () {
      this.startRow = this.data.rowPerPage
      this.endRow = this.startRow + this.data.rowPerPage
      this.currentPage = 2
    },
    secondLastPage () {
      this.startRow = this.lastPageValue - (2 * this.data.rowPerPage)
      this.endRow = this.lastPageValue - this.data.rowPerPage
      this.currentPage = this.lastPageValue - 1
    }
  }
}
</script>

<style scoped>
/* Global Styles */
.clear-btn {
  width: 100%;
  text-align: left;
  border: none;
  background: transparent;
  cursor: pointer;
}

.pagination-bulk {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4B545A;
  padding: 0 24px;
  margin:60px auto;
}
.pagination-bulk > .pagination {
  display: flex;
  align-items: center;
  color: #4B545A;
  justify-content: flex-end;
}
.pagination-bulk > .pagination > span {
  margin-left: 16px;
  display: flex;
  align-items: center;
}
.bulk select {
  /* border: 1px solid #DFE3E8; */
  box-sizing: border-box;
  border-radius: 4px;
  height: 40px;
  padding: 8px 0;
  margin-left: 8px;
}
.nav-btn {
  text-align: left;
  /* border: 1px solid #cecece; */
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  padding: 0 2px;
  margin-right: 6px;
  height:32px;
  width:32px;
  display:flex;
  justify-content:center;
  align-items:center;
  font-weight:bold;
}
.nav-btn.active, .nav-btn:focus {
  border: 2px solid #3CDA7d;
  color:#3CDA7d;
}
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.search-input {
  margin-right: 24px;
  position: relative;
}
.search-input svg {
  position: absolute;
  left: 12px;
  top: 20%;
}
.table-header input {
  height: 45px;
  padding: 0 12px;
  padding-left: 46px;
  /* border-radius: 8px; */
  min-width: 280px;
  font-size: 16px;
  outline: none;
  /* border: 1px solid #cecece; */
}
.table-title {
  font-size: 1.25rem;
  font-weight: 600;
  padding: 0 24px;
}
.clear-btn.checkbox {
  display: grid;
  place-items: center;
}
.link {
  text-decoration: underline;
  text-align: left;
  height: 24px;
}
.count-buttons {
  margin: 0 16px;
}
button .count {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.saturn-table-ctn {
  /* border: 1px solid #E2E2EA; */
  border-radius: 20px;
  padding: 0;
  width:auto;
}
.table {
  margin: 0 0;
  border-spacing: 0px;
  overflow-x: scroll;
  background: white;
}
.space {
  padding: 0 8px;
}
.saturn-table-wrapper {
  overflow-x: scroll;
  border-radius: 20px;
}
.full-width {
  width: 100%;
}
.header-row {
  text-align: left;
  /* background: #F0F2F4; */
  font-size: 16px;
  line-height: 18px;
}
.table-row:nth-of-type(odd) {
  text-align: left;
  /* background: #f1f1f1; */
  font-size: 16px;
  line-height: 18px;
  border-radius: 20px;
}
th {
  padding: 24px 14px;
  white-space: nowrap;
  cursor: pointer;
  color: #07124C;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
}
th.no-filter {
  pointer-events: none;
  cursor: default;
}
th.no-filter .filter-icon {
  display: none;
}
td {
  padding: 18px 14px;
  color: #575757;
  /* white-space: nowrap; */
}
/* .table-row td:nth-child(2), .header-row th:nth-child(2){
  width:auto;
  min-width: 3rem;
  max-width:5rem;
  /* word-wrap: wrap; */
    /* overflow-wrap: break-word; */
    /* word-break: break-all; */
/* }
/* Animations */
.reveals {
  animation: reveals .3s ease-in-out;
  -webkit-animation: reveals .3s ease-in-out;
}
@keyframes reveals {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  60% {
    opacity: 1;
    transform: scale(1);
  }
  80% {
    opacity: 1;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@media screen and (max-width: 800px) {
  .pagination-bulk {
    flex-direction: column;
    align-items: flex-start;
  }
  .bulk {
    margin-bottom: 12px;
  }
  .pagination {
    font-size: 13px;
  }
  .pagination-bulk > .pagination > span {
    margin-left: 0;
    margin-right: 8px;
  }
}

@media screen and (max-width: 500px) {
  .table-header {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: space-between;
  }
  .table-title {
    font-size: 17px;
  }
  .search-input {
    margin: auto;
    margin-top: 8px;
    width: 90%;
  }
  .search-input input {
    width: 100%;
    min-width: auto;
  }
  th,td {
    font-size: 16px;
  }
  td {
    padding: 12px 10px;
  }
  .pagination {
    font-size: 13px;
    align-self:center;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
  }
  .pagination span:nth-child(1), .pagination span:nth-last-child(1) {
    display: none;
  }
  .count-buttons {
    margin: 8px 0;
  }
  .count-buttons button {
    display: none;
  }
}
.next:active, .previous:active,
.next:focus, .previous:focus{
  background-color:#cecece;
  color:white;
  border:none;
}
</style>
