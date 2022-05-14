<template>
  <div class="empty-state-ctn">
    <div v-if="page === 'dashboard'" class="empty-state payments">
      <img class="reveals" src="~assets/images/empty-file.svg" alt="">
      <div class="text come-up">
        You have no publications yet
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmptyState',
  props: {
    page: {
      type: String,
      default: () => null
    }
  }
}
</script>

<style scoped>
a {
  margin-top: 5%;
  display: inline-grid;
  padding: 0 10%;
  place-items: center;
  /* background: #004368; */
}
.empty-state {
  padding-top: 7%;
}
.empty-state.payments {
  width: 100%;
  text-align: center;
}
.empty-state.services {
  width: 100%;
  text-align: center;
}
.empty-state.payments .text {
  margin-top: 32px;
}
.empty-state .text {
  margin-top: 5%;
  text-align: center;
  font-weight: normal;
  font-size: 23px;
  line-height: 30px;
  color: #000c133d;
}
.empty-state img {
  width: 100%;
  margin-top: 5%;
}
.empty-state.payments img {
  width: 250px;
  margin: 0 auto;
  margin-top: 3%;
  text-align: center;
}
.empty-state.services img {
  width: 200px;
  margin: 0 auto;
  margin-top: 3%;
  text-align: center;
}
.empty-state.services .text {
  margin-top: 24px;
}

@media screen and (max-width: 1050px) {
  .empty-state.services img {
    margin-top: 10%;
  }
  .empty-state.payments img {
    margin-top: 10%;
  }
  .empty-state .text {
    width: 40%;
    margin: 0 auto;
  }
}

@media screen and (max-width: 800px) {
  .empty-state.services img {
    margin-top: 10%;
  }
  .empty-state.payments img {
    margin-top: 10%;
  }
  .empty-state .text {
    width: 40%;
    margin: 0 auto;
    font-size: 19px;
  }
}

@media screen and (max-width: 500px) {
  .empty-state.services img {
    width: 100px;
  }
  .empty-state.payments img {
    width: 100px;
  }
  .empty-state .text {
    width: 60%;
    margin: 0 auto;
    font-size: 15px;
    line-height: 20px;
    margin-top: 10px;
  }
  .empty-state.services .text {
    margin-top: 10px;
  }
  .empty-state.payments .text {
    margin-top: 10px;
  }
  .empty-state {
    margin-bottom: 10%;
  }
}
</style>
