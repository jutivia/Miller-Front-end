<template>
  <div class="loader" :style="`border: ${borderWidth ? borderWidth : 3}px solid ${color ? color : '#f3f3f3'}; height: ${size ? size: 20}px; width: ${size ? size : 20}px; border-top-color: transparent;border-left-color: ${color}; border-bottom-color: ${color};border-right-color: ${color};`" />
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: () => 20
    },
    color: {
      type: String,
      default: () => ''
    },
    borderWidth: {
      type: Number,
      default: () => 3
    }
  }
}
</script>

<style scoped>
.loader {
  border-radius: 50%;
  border-top: 3px solid transparent;
  -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
