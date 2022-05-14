<template>
  <div>
    <div class="grid">
      <div class="lhs">
        <span class="filter_flex">
          Filter
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 4H13V6H3V4ZM0 0H16V2H0V0ZM6 8H10V10H6V8Z" fill="black" />
          </svg>
        </span>
        <br>
        <div class="category_flex">
          <select v-model="category" placeholder="Select Category" required class="select_category">
            <option value="" selected>
              Select category
            </option>
            <option
              v-for="(unit, index) in categories"
              :key="index"
              :value="unit"
            >
              {{ unit }}
            </option>
          </select>
          <div>
            <saturn-switch
              :data="switchData3"
            />
          </div>
        </div>
      </div>
      <div class="rhs">
        <h4 class="Big_text">
          Popular Categories
        </h4>
        <div class="word_flex">
          <span class="small_text">Mathematics</span>
          <span class="small_text">English</span>
          <span class="small_text">Literature</span>
          <span class="small_text">Economics</span>
          <span class="small_text">Religion</span>
          <span class="small_text">Anatomy</span>
          <span class="small_text">Engineering</span>
          <span class="small_text">Biology</span>
        </div>
      </div>
    </div>
    <div class="grid">
      <div class="lhs">
        <h4 class="Big_text">
          Basics of Financial Accounting
        </h4>
        <div class="sub_text">
          <p>Aurthur Velon</p>
          <p>Dec 2022</p>
        </div>
        <p
          class="small_text"
          style="color: #575757;font-weight: 500;
        font-size: 18px;
        line-height: 34px;"
        >
          We are also focused on supporting members of the DAO
        </p>
        <div class="options_flex">
          <span class="Big_text">Cite</span>
          <span class="Big_text">Earnable</span>
          <button class="border_btn">
            Download
          </button>
        </div>
      </div>
      <div class="rhs">
        <h4 class="Big_text">
          Read summary
        </h4>
        <br>
        <p class="small_text">
          21 Available
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      switchData3: {
        state: 'OFF',
        positiveText: 'Show All',
        negativeText: 'Earnable'
      },
      categories: [],
      category: ''
    }
  }
}
</script>

<style scoped>
.lhs{
    max-width:90%;
}
.grid{
    margin: 3rem 5rem;
    padding-bottom: 3rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.filter_flex{
    width: 5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
}
.select_category{
    width: auto;;
height: 3rem;
background: #F4F6FE;
}
.category_flex{
    display:grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    grid-gap:1rem;
}
.category_flex select{
    border: 1px solid #0000003b;
    border-radius: 10px;
    padding: .5rem 1rem;
}
.category_flex div{
    margin-top:-1.2rem;
}
.category_flex select option {
    color: rgba(0, 0, 0, 0.5);;
}
.Big_text{
    font-weight: 500;
font-size: 20px;
color: #000000;
}
.word_flex{
    width:70%;
    margin-left: 0;
    margin-top:1rem;
    display:flex;
    justify-content:flex-start;
    align-items:center;
    flex-wrap: wrap;
}
.word_flex span{
    margin-right:2rem;
    margin-bottom:1rem;
}
.small_text{
    font-weight: 500;
font-size: 16px;
color: rgba(0, 0, 0, 0.5);
}
.sub_text{
    line-height: 24px;
color: rgba(0, 0, 0, 0.5);
    width:15rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.options_flex{
    display:flex;
    width: 70%;
    justify-content: space-between;
    padding-top: 1rem;
    align-items:center;
}
.options_flex button{
    border: 1px solid #000000;
border-radius: 10px;
width: 170px;
height: 2.5rem;
background:none;
cursor:pointer;
}
.rhs{
    margin:auto 0;
}
</style>
