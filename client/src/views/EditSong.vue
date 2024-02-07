<template>
  <div>
    <header class="toptitle">Edit your song list</header>
    <form id="form" class="topBF" @submit.prevent="editSong(song.id)">
      <div>
        <input class="formcl" v-bind:value="formSong.title" id="songTitle" type="text" placeholder="Song's Title"/>
      </div><br>
      <div>
        <input class="formcl" v-bind:value="formSong.genre" id="songGenre" type="text" placeholder="Song's genre"/>
      </div><br>
      <div>
        <input class="formcl" v-bind:value="formSong.duration" id="songDuration" type="number" placeholder="Song's Duration"/>
      </div><br>
      <button v-bind:id="song.id">Edit this song</button>
    </form>
    <br>
  </div>
</template>

<script>
import utils from "../utils.js";
export default {
  name: "EditSong",
  data() {
    return {
      formSong: {},};
    },
      props: {
        song: Object,},
  updated() {
    this.formSong = this.song;},
  computed: {
    songs() {
      return this.$store.state.songs;},},
  methods: {
   async editSong(id) {
        let parameters = utils.globalParameters;
        let token = window.localStorage.getItem("token");
        parameters.headers.Authorization = token;
        console.log("asta este autorizarea pe care o cautam oare?" + parameters.headers.Authorization)
        parameters.method = "PUT";
        let data = {};
        data.id = id;
        data.title = document.getElementById("songTitle").value;
        data.genre = document.getElementById("songGenre").value;
        data.duration = document.getElementById("songDuration").value;
        parameters.body = JSON.stringify(data);
        console.log("You are editing the song with id: " + data.id);
        await fetch(utils.url + "updatesong/" + data.id, parameters)
        document.getElementById("songTitle").value = "";
        document.getElementById("songGenre").value = "";
        data.duration = document.getElementById("songDuration").value = "";
        this.$store.dispatch("editSong", data);
            }
      }
};
</script>

<style>
button {
  padding: 5px;
}
</style>