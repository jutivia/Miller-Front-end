<template>
  <div v-if="data !== null" class="saturn-table-ctn">
    <div class="table-header">
      <div class="table-title">
        {{ dataMutable.title }}
      </div>
      <div v-if="data.searchBy !== undefined" class="search-input">
        <input type="text" :placeholder="`Search by ${searchBy.label}`" @input="searchLabels($event.target.value)">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4ZM2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11C20 15.9706 15.9706 20 11 20C6.02944 20 2 15.9706 2 11Z" fill="#cecece" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9429 15.9429C16.3334 15.5524 16.9666 15.5524 17.3571 15.9429L21.7071 20.2929C22.0977 20.6834 22.0977 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L15.9429 17.3571C15.5524 16.9666 15.5524 16.3334 15.9429 15.9429Z" fill="#cecece" />
        </svg>
      </div>
    </div>
    <div :class="[searchMode ? 'search-mode' : 'no-search-mode']">
      <div class="saturn-table-wrapper">
        <table :class="['table', {'full-width': dataMutable.styles.fullWidth}]">
          <tr class="header-row">
            <th>
              <button class="clear-btn checkbox" @click="checkAllRows">
                <svg
                  v-show="allRowsChecked"
                  class="checked reveals"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.21 14.75C10.303 14.8437 10.4136 14.9181 10.5354 14.9689C10.6573 15.0197 10.788 15.0458 10.92 15.0458C11.052 15.0458 11.1827 15.0197 11.3046 14.9689C11.4264 14.9181 11.537 14.8437 11.63 14.75L15.71 10.67C15.8983 10.4817 16.0041 10.2263 16.0041 9.96C16.0041 9.6937 15.8983 9.4383 15.71 9.25C15.5217 9.0617 15.2663 8.95591 15 8.95591C14.7337 8.95591 14.4783 9.0617 14.29 9.25L10.92 12.63L9.71 11.41C9.5217 11.2217 9.2663 11.1159 9 11.1159C8.7337 11.1159 8.4783 11.2217 8.29 11.41C8.1017 11.5983 7.99591 11.8537 7.99591 12.12C7.99591 12.3863 8.1017 12.6417 8.29 12.83L10.21 14.75ZM21 2H3C2.73478 2 2.48043 2.10536 2.29289 2.29289C2.10536 2.48043 2 2.73478 2 3V21C2 21.2652 2.10536 21.5196 2.29289 21.7071C2.48043 21.8946 2.73478 22 3 22H21C21.2652 22 21.5196 21.8946 21.7071 21.7071C21.8946 21.5196 22 21.2652 22 21V3C22 2.73478 21.8946 2.48043 21.7071 2.29289C21.5196 2.10536 21.2652 2 21 2ZM20 20H4V4H20V20Z" fill="#FF691C" />
                </svg>
                <svg
                  v-show="!allRowsChecked"
                  class="unchecked reveals"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V19C0 19.2652 0.105357 19.5196 0.292893 19.7071C0.48043 19.8946 0.734784 20 1 20H19C19.2652 20 19.5196 19.8946 19.7071 19.7071C19.8946 19.5196 20 19.2652 20 19V1C20 0.734784 19.8946 0.48043 19.7071 0.292893C19.5196 0.105357 19.2652 0 19 0ZM18 18H2V2H18V18Z" fill="#7C86A1" />
                </svg>
              </button>
            </th>
            <th v-for="(header) in dataMutable.headers" :key="header.key" :class="{'no-filter': !header.isFilterable}" @click="sortColumn(header)">
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
          <tr v-for="(label, index) in (searchMode ? searchedLabels : currentLabels)" :key="index" class="table-row">
            <td>
              <button class="clear-btn checkbox" @click="toggleCheck(label)">
                <svg
                  v-show="checkedRowsArray.includes(label._id)"
                  class="checked reveals"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.21 14.75C10.303 14.8437 10.4136 14.9181 10.5354 14.9689C10.6573 15.0197 10.788 15.0458 10.92 15.0458C11.052 15.0458 11.1827 15.0197 11.3046 14.9689C11.4264 14.9181 11.537 14.8437 11.63 14.75L15.71 10.67C15.8983 10.4817 16.0041 10.2263 16.0041 9.96C16.0041 9.6937 15.8983 9.4383 15.71 9.25C15.5217 9.0617 15.2663 8.95591 15 8.95591C14.7337 8.95591 14.4783 9.0617 14.29 9.25L10.92 12.63L9.71 11.41C9.5217 11.2217 9.2663 11.1159 9 11.1159C8.7337 11.1159 8.4783 11.2217 8.29 11.41C8.1017 11.5983 7.99591 11.8537 7.99591 12.12C7.99591 12.3863 8.1017 12.6417 8.29 12.83L10.21 14.75ZM21 2H3C2.73478 2 2.48043 2.10536 2.29289 2.29289C2.10536 2.48043 2 2.73478 2 3V21C2 21.2652 2.10536 21.5196 2.29289 21.7071C2.48043 21.8946 2.73478 22 3 22H21C21.2652 22 21.5196 21.8946 21.7071 21.7071C21.8946 21.5196 22 21.2652 22 21V3C22 2.73478 21.8946 2.48043 21.7071 2.29289C21.5196 2.10536 21.2652 2 21 2ZM20 20H4V4H20V20Z" fill="#FF691C" />
                </svg>
                <svg
                  v-show="!checkedRowsArray.includes(label._id)"
                  class="unchecked reveals"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V19C0 19.2652 0.105357 19.5196 0.292893 19.7071C0.48043 19.8946 0.734784 20 1 20H19C19.2652 20 19.5196 19.8946 19.7071 19.7071C19.8946 19.5196 20 19.2652 20 19V1C20 0.734784 19.8946 0.48043 19.7071 0.292893C19.5196 0.105357 19.2652 0 19 0ZM18 18H2V2H18V18Z" fill="#7C86A1" />
                </svg>
              </button>
            </td>
            <td v-for="(header) in dataMutable.headers" :key="header.key">
              <!--
            Information here renders based on the type of the [label]
            Valid types are 'date/time', 'currency'
          -->
              {{ formatCell(header.type, label[header.key]) }}
            </td>
            <td class="action">
              <button class="clear-btn" @click="$emit('action', label)">
                <svg
                  v-if="dataMutable.styles.actionText === undefined"
                  width="24"
                  height="24"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path opacity="0.4" d="M8.00016 1.33366C11.6768 1.33366 14.6668 4.32433 14.6668 8.00033C14.6668 11.6763 11.6768 14.667 8.00016 14.667C4.32416 14.667 1.3335 11.6763 1.3335 8.00033C1.3335 4.32433 4.32416 1.33366 8.00016 1.33366Z" fill="#75759E" />
                  <path d="M7.03865 5.18693C7.16598 5.18693 7.29398 5.2356 7.39131 5.33293L9.71598 7.64626C9.80998 7.74026 9.86265 7.8676 9.86265 8.00093C9.86265 8.1336 9.80998 8.26093 9.71598 8.35493L7.39131 10.6696C7.19598 10.8643 6.87998 10.8643 6.68465 10.6683C6.48998 10.4723 6.49065 10.1556 6.68598 9.96093L8.65465 8.00093L6.68598 6.04093C6.49065 5.84626 6.48998 5.53026 6.68465 5.33426C6.78198 5.2356 6.91065 5.18693 7.03865 5.18693Z" fill="#75759E" />
                </svg>
                <span v-else type="button" class="link">
                  {{ dataMutable.styles.actionText }}
                </span>
              </button>
            </td>
          </tr>
        </table>
      </div>
      <div class="pagination-bulk">
        <div v-if="dataMutable.bulkActions !== undefined || dataMutable.bulkActions.length > 0" class="bulk">
          <span>
            Bulk Action:
          </span>
          <select v-model="selectedAction">
            <option :value="null">
              Choose Action
            </option>
            <option v-for="action in dataMutable.bulkActions" :key="action.key" :value="action.event">
              {{ action.name }}
            </option>
          </select>
        </div>
        <div class="pagination">
          <span>
            PAGE {{ (endRow / data.rowPerPage) }} of {{ lastPageValue }}
          </span>
          <span>
            <button class="nav-btn first" @click="firstPage">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="4" />
                <path d="M23.1602 11.41L18.5802 16L23.1602 20.59L21.7502 22L15.7502 16L21.7502 10L23.1602 11.41Z" fill="#8692A7" />
                <path d="M17.1602 11.41L12.5802 16L17.1602 20.59L15.7502 22L9.75016 16L15.7502 10L17.1602 11.41Z" fill="#8692A7" />
              </svg>
            </button>
            <button class="nav-btn previous" @click="previousPage">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="4" />
                <path d="M17.1602 11.41L12.5802 16L17.1602 20.59L15.7502 22L9.75016 16L15.7502 10L17.1602 11.41Z" fill="#8692A7" />
              </svg>
            </button>
            <div class="space" />
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
            <button class="nav-btn last" @click="lastPage">
              <svg
                style="transform: rotate(180deg)"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="32" height="32" rx="4" />
                <path d="M23.1602 11.41L18.5802 16L23.1602 20.59L21.7502 22L15.7502 16L21.7502 10L23.1602 11.41Z" fill="#8692A7" />
                <path d="M17.1602 11.41L12.5802 16L17.1602 20.59L15.7502 22L9.75016 16L15.7502 10L17.1602 11.41Z" fill="#8692A7" />
              </svg>
            </button>
          </span>
          <span>
            {{ data.rowPerPage }} rows per page
          </span>
        </div>
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
      default: null
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
      searchedLabels: []
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
          this.$emit(val, this.checkedRowsArray)
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
      if (this.endRow < this.dataMutable.labels.length) {
        this.startRow += this.data.rowPerPage
        this.endRow += this.data.rowPerPage
      }
    },
    previousPage () {
      if (this.startRow !== 0) {
        this.startRow -= this.data.rowPerPage
        this.endRow -= this.data.rowPerPage
      }
    },
    firstPage () {
      this.startRow = 0
      this.endRow = this.data.rowPerPage
    },
    lastPage () {
      const lastPageValue = this.lastPageValue * this.data.rowPerPage
      this.endRow = lastPageValue
      this.startRow = lastPageValue - this.data.rowPerPage
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
  justify-content: space-between;
  color: #4B545A;
  padding: 0 24px;
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
  border: 1px solid #DFE3E8;
  box-sizing: border-box;
  border-radius: 4px;
  height: 40px;
  padding: 8px 0;
  margin-left: 8px;
}
.nav-btn {
  text-align: left;
  border: 1px solid #cecece;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  padding: 0 2px;
  margin-right: 4px;
}
.nav-btn.active, .nav-btn:focus {
  border: 2px solid #0547e067;
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
  border-radius: 8px;
  min-width: 280px;
  font-size: 16px;
  outline: none;
  border: 1px solid #cecece;
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
  border: 1px solid #E2E2EA;
  border-radius: 20px;
  padding: 24px 0;
}
.table {
  margin: 24px 0;
  border-spacing: 0px;
  overflow-x: auto;
}
.space {
  padding: 0 8px;
}
.saturn-table-wrapper {
  overflow-x: auto;
}
.full-width {
  width: 100%;
}
.header-row {
  text-align: left;
  background: #F0F2F4;
  font-size: 16px;
  line-height: 18px;
}
.table-row:nth-of-type(odd) {
  text-align: left;
  background: #f1f1f1;
  font-size: 16px;
  line-height: 18px;
}
th {
  color: #75759E;
}
th {
  padding: 24px 14px;
  white-space: nowrap;
  cursor: pointer;
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
  white-space: nowrap;
}

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
    font-size: 13px;
  }
  td {
    padding: 12px 10px;
  }
  .pagination {
    font-size: 13px;
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
</style>
