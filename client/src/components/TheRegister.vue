<template>
      <div class="col-4">
      <div class="login-background">
      <h4 class="row justify-content-center fw-bolder mt-2">Book Your Seats Right Now!</h4>
        <div class="row justify-content-center">
        <div class="mb-3 col-10">
          <label for="exampleFormControlInput1" class="form-label">Username</label>
          <input v-model="username" type="text" class="form-control" id="exampleFormControlInput1" placeholder="username">
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="mb-3 col-10">
          <label for="exampleFormControlInput1" class="form-label">Email address</label>
          <input v-model="email" type="email" class="form-control" id="exampleFormControlInput2" placeholder="name@example.com">
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="mb-3 col-10">
          <label for="exampleFormControlInput1" class="form-label">Password</label>
          <input v-model="password" type="password" class="form-control" id="exampleFormControlInput3" placeholder="password">
        </div>
      </div>
      <div class="row justify-content-center">
        <button @click="registration" type="button" class="btn btn-success col-2">Register</button>
      </div>
      <div class="">
        <p class="text-center">Already a user?<button type="button" class="btn btn-link" style="margin-left: -15px;" @click="$emit('login')">Login!</button></p>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  data(){
    return{
      username:"",
      email:"",
      password:"",
    }
  },
  methods:{
    async registration(){
      const payload={
        name: this.username,
        email: this.email,
        password: this.password
      }
        const resp= await this.$store.dispatch("register",payload)
        if (resp.status===201) this.$emit("goToLogin")
    }
  }
}
</script>

<style scoped>
/* .bold{ */
  /* font-weight: bold; */
/* } */
.login-background{
  background-color: rgba(255, 255, 255, 0.89);
  border-radius: 0.5rem;
  padding: 1rem;
  color: black;
}
</style>
