<template>
      <div class="col-4">
      <div class="login-background">
      <h4 class="row justify-content-center fw-bolder mt-2">Book Your Seats Right Now!</h4>
      <div class="row justify-content-center">
        <div class="mb-3 col-10">
          <label for="exampleFormControlInput1" class="form-label">Email address</label>
          <input v-model="email" type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="mb-3 col-10">
          <label for="exampleFormControlInput1" class="form-label">Password</label>
          <input v-model="password" type="password" class="form-control" id="exampleFormControlInput2" placeholder="password">
        </div>
      </div>
      <div class="row justify-content-center">
        <button @click="login" type="button" class="btn btn-success col-2">Login</button>
      </div>
      <div class="">
        <p class="text-center">Don't have an account? <button type="button" class="btn btn-link" style="margin-left: -15px;" @click="$emit('register')">Register Now!</button></p>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  data(){
    return{
      email:"",
      password:"",
    }
  },
  methods:{
    async login(){
      const payload={
        email:this.email,
        password:this.password
      }
      const resp = await this.$store.dispatch("login",payload)
      if (resp.data.token) this.$router.push("/movies")
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
