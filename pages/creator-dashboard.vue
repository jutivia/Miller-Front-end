<template>
  <div class="table">
  <h1> Creator's Dashboard </h1>
    <SaturnTable
      v-if ="!empty"
      :data="tableData"
      @action="rowSelected"
    />
    <EmptyState v-else page="dashboard"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      empty: false,
      tableData: {
        rowPerPage: 10,
        headers: [
          { key: 'title', label: 'My Title', type: 'string' },
          { key: 'description', label: 'My Publications', type: 'string' },
          { key: 'views', label: 'Views', type: 'string' },
          { key: 'earning', label: 'Earnings', type: 'string' },
          { key: 'date', label: 'Data Uploaded', type: 'date/time' }
        ],
        labels: [
          // {
          //   publications: 'We are also focused on supporting members of the DAO which would in return be of a good cause, to the DAO community at large. Support ',
          //   views: '254',
          //   earning: '$30',
          //   dataUploaded: '12/12/20'
          // },
          // {
          //   publications: 'We are also focused on supporting members of the DAO which would in return be of a good cause, to the DAO community at large. Support ',
          //   views: '254',
          //   earning: '$30',
          //   dataUploaded: '12/12/20'
          // }
        ],
        bulkActions: [
          { event: 'delete-people', name: 'Delete People' },
          { event: 'print-people', name: 'List People in CSV file' },
          { event: 'clean-people', name: 'Clean People' }
        ],
        styles: {
          fullWidth: true
        },
        searchBy: 'address'
      },
      myPublications: []
    }
  },
  created () {
    this.getPublications()
  },
  methods: {
    getPublications () {
      this.tableData.labels = JSON.parse(localStorage.getItem('Publications')) || []
      console.log('tabbe1:', this.tableData.labels)
      if (!this.tableData.labels.length) {
        this.empty = true
      } else {
        this.tableData.labels.map((x) => {
          x.views = '0'
          x.earning = '0.00 ℏ'
          return x
        })
        console.log(this.tableData.labels)
      }
    },
    rowSelected (label) {
      this.$router.push({
        path: '/publication-detail',
        query: { id: label.id }
      })
    }
  }
}
</script>

<style scoped>
.table{
    padding: 3rem 2.5rem;
    max-width:100%;
    margin:0 auto;
}
h1{
  color: #cf6dbb;
}
</style>
