<template class="creator-dashboard">
  <div>
    <div class="go-back-btn">
      <GoBack back="All Publications" path="/show-all" />
    </div>
    <div class="table">
      <h1> Dashboard </h1>
      <br>
      <div v-if="loading" class="overlay-screen" />
      <FullScreenLoader v-if="loading" />
      <SaturnTable
        v-if="!empty || !loading"
        :data="tableData"
        @action="rowSelected"
      />
      <EmptyState v-if="empty" page="dashboard" />
    </div>
  </div>
</template>

<script>
import functions from '~/utils/functions'
export default {
  data () {
    return {
      empty: false,
      tableData: {
        rowPerPage: 10,
        headers: [
          { key: 'title', label: 'Title', type: 'string' },
          { key: 'description', label: 'Description', type: 'string' },
          { key: 'views', label: 'Downloads', type: 'string' },
          { key: 'type', label: 'Types', type: 'string' },
          { key: 'createdAt', label: 'Date Uploaded', type: 'date/time' }
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
      myPublications: [],
      loading: false
    }
  },
  created () {
    this.getPublications()
  },
  methods: {
    capitalize: functions.capitalize,
    async getPublications () {
      this.loading = true
      try {
        const { data } = await this.$axios.get('/api/v1/publications/user')
        // console.log(data)
        this.tableData.labels = data.publications
        // console.log('tabbe1:', this.tableData.labels)
        if (!this.tableData.labels.length) {
          this.empty = true
        } else {
          this.tableData.labels.map((x) => {
            x.title = this.capitalize(x.title.slice(0, 30)) + `${x.title.length > 20 ? '...' : ''}`
            x.description = this.capitalize(x.description.slice(0, 40)) + `${x.description.length > 20 ? '...' : ''}`
            return x
          })
          // console.log(this.tableData.labels)
        }
      } catch (err) {
        if (
          err.message.includes(
            "Cannot read properties of null (reading 'toLowerCase')"
          ) ||
            err.message.includes('Network')
        ) {
          this.$toasted.error('Check your connection.').goAway(5000)
        } else {
          this.$toasted.error(err?.response?.data?.msg || 'connection Failed').goAway(5000)
        }
      }
      this.loading = false
    },
    rowSelected (label) {
      this.$router.push({
        path: '/publication-detail',
        query: { id: label._id }
      })
    }
  }
}
</script>

<style scoped>
.creator-dashboard{
  position: relative;
  min-height: 100vh;
  margin: 0;
}
.table{
    padding: 3rem 4.5rem;
    max-width:100%;
    margin:0 auto;
    /* border: 2px solid red; */
    height: 100%;
}
h1{
  color: var(--orange);
  font-weight: 500;
  font-size: 36px;
  margin-bottom: 1rem;
}
</style>
