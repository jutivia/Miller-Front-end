<template>
  <div>
    <button @click="goBack(path)">
      <svg
        class="go-back"
        width="20"
        height="25"
        viewBox="0 0 24 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M15.7071 6.72777C16.0976 7.22417 16.0976 8.02899 15.7071 8.52539L10.4142 15.2532L15.7071 21.9811C16.0976 22.4775 16.0976 23.2823 15.7071 23.7787C15.3166 24.2751 14.6834 24.2751 14.2929 23.7787L8.29289 16.1521C7.90237 15.6557 7.90237 14.8508 8.29289 14.3544L14.2929 6.72777C14.6834 6.23137 15.3166 6.23137 15.7071 6.72777Z"
          fill="#57565C"
        />
      </svg>
      {{ back }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    back: {
      type: String,
      default: 'go back'
    },
    path: {
      type: String,
      default: '/'
    }
  },
  methods: {
    goBack (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
button{
  border:none;
  background:transparent;
  display:flex;
  align-items:center;
  color: rgb(229, 229, 229);
   margin-left:2.5rem;
}
button:hover{
  color:rgb(165, 165, 165);
}
.go-back {
  display: flex;
  align-items: center;
  font-size: 14px;
  background-color: rgb(229, 229, 229);
  border: none;
  border-radius:50%;
  height:20px;
  width:20px;
  padding:3px;

}
button:hover .go-back{
  background-color:grey;
}

svg {
  margin-right: 13px;
}
</style>
