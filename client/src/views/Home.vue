<template>
    <div class="login-form">
      <h1>Proiect</h1>
      <h1>Tehnologii ale informatiei si comunicatiilor</h1>
      <h3>Predescu Alexandru George</h3>
      <h4>E-Business Anul I</h4>
      <br>
      <div>Tehnologii folosite
        <ul>
          <li>
            Vue3.js
          </li>
          <li>
            Firebase
          </li>
          <li>
            Express.js
          </li>
          <li>
            Node.js
          </li>
        </ul>
        </div> 
    </div>
  </template>

  <script>
  import utils from "../utils.js";
  export default {
    name: "Home",
    data() {
      return {
        formArtist: {},
      };},
    created() {
      let url = utils.url;
      let parameters = utils.globalParameters;
      if (!this.artists.length) {
        fetch(url + "artists", parameters).then((res) =>
          res.json().then((res) => {this.$store.dispatch("fetchArtists", res);}));
      }
    },
    computed: {
      artists() {
        return this.$store.state.artists;},},
    methods: {
      editArtist(artist) {this.formArtist = artist;},},};
</script>

<style>

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li {
  font: 200 20px/1.5 Helvetica, Verdana, sans-serif;
}
</style>