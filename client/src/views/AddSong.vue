
<template>
  <div class="container">
    <form @submit.prevent="addSong()">
      <div><br>
        <div class="page-title"><h2>Add a SONG</h2></div>
        <label for="title">Name: </label>
        <div></div>
        <input class="input-form" v-model="title" type="text" placeholder="Title" />
      </div>
      <div>
        <label for="genre">Genre:</label>
        <div></div>
        <input class="input-form" v-model="genre" type="text" placeholder="Song's genre" />
      </div>
      <div>
        <label for="artistName">Choose the artist:</label>
        <div></div>
        <select v-model="artistName">
          <option class="input-form" v-for="artist in artistsList" :key="artist.id">
            {{ artist.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="duration">Duration: </label>
        <div></div>
        <input class="input-form" v-model="duration" type="text" placeholder="Song duration" />
      </div><br>
      <button type="submit">Add the song</button>
    </form>
  </div>
</template>

<script>
import utils from "../utils";
export default {
  data() {
    return {
      title: "",
      genre: "",
      duration: "",
      artistId: "",
      artistName: "",
      artistsList: [],
    };
  },
  methods: {
    addSong() {
      let requestParameters = { ...utils.globalParameters };
      let token = window.localStorage.getItem("token");
      requestParameters.headers.Authorization = token;
      requestParameters.method = "POST";
      let artist = this.artistsList.find((a) => a.name == this.artistName);
      let data = {};
      data.title = this.title;
      data.genre = this.genre;
      data.artistId = artist.id;
      data.duration = this.duration;
      requestParameters.body = JSON.stringify(data);
      let firebaseIdSong;
      fetch(utils.url + "songs", requestParameters).then((res) => res.json()).then((res) => {
            console.log("Create your song with the following id: " + res.id);
            data.id = res.id;
            firebaseIdSong = res.id;
            artist.songId.push(firebaseIdSong);
            this.$store.dispatch("addSong", data);
            this.$router.push("/");}).then(() => {
                fetch(utils.url + "artists/" + artist.id, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: localStorage.getItem("token"),},
                      body: JSON.stringify(artist),}).then(() => {
                            this.$router.push("/");
                              })});
    },
  },
  computed: {
    artisti() {
      return this.$store.state.artists;
    },
  },

  mounted() {
    fetch("http://127.0.0.1:3000/artists").then((res) => res.json()).then((data) => (this.artistsList = data)).catch((err) => console.log(err.message));
  },
};
</script>

<style scoped>
.page-title{
  color: #194e19;
  font-weight: bolder;
  font-size: large;
  margin: 10px 10px 10px 10px;
}


.input-form{
  border: 0;
  box-shadow:5px 5px 5px grey;
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