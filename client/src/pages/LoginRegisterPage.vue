<template>
<div style="background-image: url('../assets/movies.jpg')">
  <div style="height: 85vh;" class="row align-items-center">
    <div class="col">
    </div>
    <the-login @register="register" v-if="isLoginPage"/>
    <the-register v-else @login="login" @goToLogin="isLoginPage=true"/>
  <div class="col-1"></div>
  </div>
</div>
</template>

<script>
import TheLogin from '../components/TheLogin.vue'
import TheRegister from '../components/TheRegister.vue'
const token = localStorage.getItem("token")
export default {
    components:{
        TheLogin,
        TheRegister,
    },
    data(){
        return{
            isLoginPage: true,
        }
    },
    methods:{
        register(){
            this.isLoginPage=false
        },
        login(){
            this.isLoginPage=true
        }
    },
    mounted(){
        if (token) this.$router.push("/movies")
    }
}
</script>