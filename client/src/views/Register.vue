  <template>
    <div class="login-form">
      <h1>Register</h1>
      <form @submit.prevent="register()">
        <input class="input-login" v-model="email" type="email" placeholder="email" /><br>
        <input class="input-login" v-model="password" type="password" placeholder="password" /><br><br>
        <button type="submit">Register</button>
      </form>
      <div>
        {{ infoProp }}
      </div>
    </div>
  </template>
  
  <script>
  import utils from "../utils.js";
  export default {
    name: "Register",
    data() {
      return {
        email: "",
        password: "",
        infoProp: "",};},
    methods: {
      register() {
        let data = {
          email: this.email,
          password: this.password,};
        let parameters = utils.globalParameters;
        parameters.method = "POST";
        parameters.body = JSON.stringify(data);
        fetch(utils.url + "register", parameters).then((res) => {res.text().then((res) => (this.infoProp = res));
        });
      },
    },
  };
  </script>
  
  <style>
</style>
  