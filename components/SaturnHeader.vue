<template>
  <header>
    <div class="show-menu" @click="showMenu()">
      <svg
        width="20"
        height="20"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 6L22 16L12 26"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <h3 class="title">
      Miller
    </h3>
    <!-- Message icon -->
    <button class="btn margins">
      Connect wallet
    </button>
  </header>
</template>

<script>
export default {
  name: 'SaturnHeader',
  methods: {
    showMenu () {
      this.$emit('showMenu')
    }
  }
}
</script>

<style scoped>
/* component styles */
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
}

header {
  /* use this when main container is flex  -> flex: 1; */
  display: flex;
  align-items: center;
  padding: 0.813rem 2.313rem 0.75rem 1.563rem;
  background: #fff;
  box-shadow: inset 0px -1px 0px #e2e2ea;
  height:5rem;
}

.show-menu {
  display: none;
}

.title {
  flex: 3;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.125rem;
  color:#cf6dbb;
  margin-left:2rem;
}

.margins{
   width: 246px;
height: 56px;
margin-right:2.5rem;
}
</style>
