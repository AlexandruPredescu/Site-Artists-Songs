<template>
    <div class="login-form">
      <h1>Log In</h1>
      <form @submit.prevent="login()">
        <input class="input-login" v-model="email" type="email" placeholder="email" /><br>
        <input class="input-login" v-model="password" type="password" placeholder="password" /><br><br>
        <button type="submit">LogIn</button>
      </form>
      <div>
        {{ infoProp }}
      </div>
    </div>
  </template>
  
  <script>
  import utils from "../utils.js";
  export default {
    name: "Login",
    data() {
      return {
        email: "",
        password: "",
        infoProp: "",};
    },
    methods: {
      login() {
        let data = {
          email: this.email,
          password: this.password,
        };
        let parameters = utils.globalParameters;
        parameters.method = "POST";
        parameters.body = JSON.stringify(data);
        fetch(utils.url + "login", parameters).then((res) => {res.json().then((res) => {
            this.infoProp = res.message;
            if (res.token) {
              localStorage.setItem("token", res.token);
              parameters.headers.Authentication = res.token;
              console.log(res.token)
              this.$store.dispatch("login", true);}
              this.$router.push("/");
          });
        });
      },
    },
  };
  </script>
  
<style>

.login-form {
  display: flex;
  margin-top: 10px;
  flex-direction: column;
  align-items: center;
  padding: 50px 40px;
  color: whitesmoke;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 20px;
  box-shadow: 0 0.4px 0.4px rgba(128, 128, 128, 0.109),
    0 1px 1px rgba(128, 128, 128, 0.155),
    0 2.1px 2.1px rgba(128, 128, 128, 0.195),
    0 4.4px 4.4px rgba(128, 128, 128, 0.241),
    0 12px 12px rgba(128, 128, 128, 0.35);

  h1 {
    margin: 0 0 24px 0;
  }
}

.input-login{
  border: 0;
  background: #00B33D;
  background: #ecf0f3;
  padding: 10px;
  padding-left: 20px;
  height: 20px;
  font-size: 14px;
  border-radius: 50px;
  margin: 8px 8px 8px 8px;
  outline: 0;
}
</style>
  