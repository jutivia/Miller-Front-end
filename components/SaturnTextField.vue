<template>
  <div class="content">
    <div class="container">
      <!-- Markup for Form Container 1 : Beginning -->
      <form class="form-container-1">
        <label class="label-name-1" for="text-field">Field Name</label>
        <input class="input-field-1" type="text" placeholder="Placeholder">
      </form>
      <!-- Markup for Form Container 1 : End -->

      <!-- Markup for Form Container 2 : Beginning -->
      <form class="form-container-2">
        <label class="label-name-2" for="text-field">Field Name</label>
        <input class="input-field-2" type="text" placeholder="Placeholder">
      </form>
      <!-- Markup for Form Container 2 : End -->

      <!-- Markup for Form Container 3 : Beginning -->
      <form class="form-container-3">
        <label class="label-name-3" for="text-field">Field Name</label>
        <div class="search-field-3">
          <svg
            class="search-field-img-3"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M21.0004 20.9999L16.6504 16.6499" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <input class="input-3" type="text" placeholder="Search">
        </div>
      </form>
      <!-- Markup for Form Container 3 : End -->
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.content {
  margin-bottom: 50px;
}

.container {
  border: 1px dashed #7B61FF;
  padding: 50px;
  margin: auto;
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

/* Style for Form Container 1 : Beginning */
.form-container-1 {
  display: flex;
  flex-direction: column;
}

.label-name-1 {
  font-size: 14px;
  margin-bottom: 10px;
}

.input-field-1 {
  border: 1px solid #4B545A;
  border-radius: 3px;
  height: 50px;
  padding-left: 16px;
  width: 327px;
}

.input-field-1::placeholder {
  color: #818181;
}
/* Style for Form Container 1 : End */

/* Style for Form Container 2 : Beginning */
.form-container-2 {
  display: flex;
  flex-direction: column;
}

.label-name-2 {
  font-size: 14px;
  margin-bottom: 10px;
}

.input-field-2 {
  border: 1px solid #4B545A;
  border-radius: 3px;
  height: 50px;
  padding-left: 16px;
  width: 327px;
}

.input-field-2::placeholder {
  color: #230B34;
}

/* Style for Form Container 2 : End */

/* Style for Form Container 3 : Beginning */
.form-container-3 {
  display: flex;
  flex-direction: column;
}

.label-name-3 {
  font-size: 14px;
  margin-bottom: 10px;
}

.search-field-3 {
  border: 1px solid #4B545A;
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 50px;
  /* padding-left: 16px; */
  width: 327px;
}

.search-field-img-3 {
  margin: 0 16px;
}

.input-3 {
  border: none;
  outline: none;
  width: 100%;
}

.search-field-3::placeholder {
  color: #818181;
}

/* Style for Form Container 3 : End */

@media only screen and (max-width: 500px) {
  .container {
    padding: 10px;
    width: 100%;
  }
  .form-container-1,
  .form-container-2,
  .form-container-3 {
    margin: 20px auto;
}
  .input-field-1,
  .input-field-2,
  .search-field-3 {
    width: 300px;
  }
}
</style>
