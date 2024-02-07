<template>
    <div>
      <header class="toptitle">View and edit artists</header>
      <form id="form" class="topBF" @submit.prevent="editArtist(artist.id)">
        <div>
          <input class="formcl" v-bind:value="formArtist.name" id="artistName" type="text" placeholder="Artist Name"/>
        </div><br>
        <div>
          <textarea class="formcl" rows="2" cols="25" v-bind:value="formArtist.description" id="artistDescription" type="text" placeholder="Artist's Description"/>
        </div><br>
        <button v-bind:id="artist.id">Edit artist</button><br>
      </form>
    </div>
  </template>
  
  <script>
  import utils from "../utils.js";
  export default {
    name: "EditArtist",
    data() {
      return {
        formArtist: {},};},
    props: {
      artist: Object,},
    updated() {
      this.formArtist = this.artist;
    },
    computed: {
      artists() {
        return this.$store.state.artists;},
    },
    methods: {
      editArtist(id) {
          let requestParameters = utils.globalParameters;
          let token = window.localStorage.getItem("token");
          requestParameters.headers.Authorization = token;
          requestParameters.method = "PUT";
          let data = {};
          data.id = id;
          data.name = document.getElementById("artistName").value;
          data.description = document.getElementById("artistDescription").value;
          requestParameters.body = JSON.stringify(data);
          console.log("Editing the following artist: " + data.id);
          fetch(utils.url + "artists/" + id, requestParameters)
          document.getElementById("artistName").value = "";
          document.getElementById("artistDescription").value = "";
          this.$store.dispatch("editArtist", data);
          }
      }
  }
  </script>
  
  <style>
.toptitle{
  font-weight: 300;
  font-size: 40px;
  margin: 20px 20px 20px 20px;
  color: #194e19;
}

.formcl {
  background-color: #195D30;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: white;
  font-size: 18px;
  height: 100%;
  outline: 0;
  padding: 4px 20px 0;
  width: 30%;
}


  button {
    padding: 5px;
  }
  </style>