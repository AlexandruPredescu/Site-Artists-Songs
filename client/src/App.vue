<template>
  <div class="nav">
  <input type="checkbox" id="nav-check">
  <div class="nav-header">
    <div class="nav-title">
      VueMusic
    </div>
  </div>
  <div class="nav-btn">
    <label for="nav-check">
      <span></span>
      <span></span>
      <span></span>
    </label>
  </div>
  <div class="nav-links">
    <router-link to="/">Home</router-link> |
    <router-link v-if="!Authen" to="/register" class="button">Register</router-link>
    <router-link v-if="!Authen" to="/login" class="button">Login</router-link>

    <router-link v-if="Authen" to="/songs">Songs</router-link> 
    <router-link v-if="Authen" to="/addSong">Add Song</router-link>
    
    <router-link v-if="Authen" to="/artists">Artists</router-link> 
    <router-link v-if="Authen" to="/addArtist">Add Artist</router-link> 
    
    <button class="button" v-if="Authen" @click="logout()">Logout</button>
    <router-view />
  </div>
</div>

</template>

<script>
export default {
  created() {
    this.$store.dispatch("verifyAuth");},
  computed: {
    Authen() {
      return this.$store.state.Authen;},
  },
  methods: {
    logout() {
      this.$store.commit("SET_AUTH", false);
      window.localStorage.removeItem("token");
      this.$router.push("/");},},
  };
</script>

<style>

#app {
  text-align: center;
}

.nav {
  height: 50px;
  width: 100%;
  background-color: #33864F;
  position: relative;
  border-radius: 20px;
}

.nav > .nav-header {
  display: inline;
}

.nav > .nav-header > .nav-title {
  display: inline-block;
  font-size: 22px;
  color: #fff;
  padding: 10px 10px 10px 10px;
}

.nav > .nav-btn {
  display: none;
}

.nav-links {
  display: inline;

  font-size: 18px;
}

.nav-links > a {
  display: inline-block;
  padding: 10px 10px 10px 10px;
  text-decoration: none;
  color: #efefef;
}

.nav-links > a:hover {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
}

.nav > #nav-check {
  display: none;
}

.button {
  color: black ;
  font-weight: bold;
}

</style>
