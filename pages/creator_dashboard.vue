<template>
  <div class="table">
    <SaturnTable
      :data="tableData"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: {
        rowPerPage: 10,
        headers: [
          { key: 'publications', label: 'My Publications', type: 'string' },
          { key: 'views', label: 'Views', type: 'string' },
          { key: 'earning', label: 'Earnings', type: 'string' },
          { key: 'dataUploaded', label: 'Data Uploaded', type: 'date' }
        ],
        labels: [
          {
            publications: 'We are also focused on supporting members of the DAO which would in return be of a good cause, to the DAO community at large. Support ',
            views: '254',
            earning: '$30',
            dataUploaded: '12/12/20'
          },
          {
            publications: 'We are also focused on supporting members of the DAO which would in return be of a good cause, to the DAO community at large. Support ',
            views: '254',
            earning: '$30',
            dataUploaded: '12/12/20'
          }
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
      }
    }
  }
}
</script>

<style scoped>
.table{
    padding:3rem;
    max-width:90%;
    margin:0 auto;
}
</style>
