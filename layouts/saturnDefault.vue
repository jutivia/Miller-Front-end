<template>
  <div class="saturn-default-ctn">
    <div class="lhs">
      <SaturnNavBar v-show="showMenu" @closeMenu="showMenu = false" />
    </div>
    <div class="rhs">
      <SaturnHeader @showMenu="showMenu = true" />
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showMenu: true
    }
  }
}
</script>

<style scoped>
  .saturn-default-ctn {
    display: flex;
  }
  .lhs {
    /* display: none; */
    z-index: 2;
  }
  .rhs {
    width: 100%;
    margin-left: 292px;
  }

  @media only screen and (max-width: 500px) {
    .rhs {
      width: 100%;
      margin-left: 0;
    }
  }
</style>
