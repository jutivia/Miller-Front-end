<template>
  <div class="loading loader" />
</template>
<style scoped>
/* Absolute Center Spinner */
.loading {
  position: fixed;
  z-index: 999;
  height: 2em;
  width: 2em;
  overflow: show;
  margin: auto 50%;
  top: 50%;
  left: 0;
  bottom: 0;
  right: 0;
}

/* Transparent Overlay */
/* .loading:before {
  content: '';
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(rgba(20, 20, 20, 0.8), rgba(0, 0, 0, 0.8));
  background: -webkit-radial-gradient(
    rgba(20, 20, 20, 0.8),
    rgba(0, 0, 0, 0.8)
  );
} */

.loader {
  margin-top:0;
  border: 5px solid #f3f3f3;
  border-radius: 50%;
  border-top: 5px solid #000;
  width: 60px;
  height: 60px;
  -webkit-animation: spin 0.5s linear infinite;
  animation: spin 0.5s linear infinite;
}
.loader.centralized {
  margin: 10px auto;
  margin-top: 12px;
}

@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
