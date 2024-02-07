<template>
  <div class="container">
    <form @submit.prevent="addArtist()">
      <div>
        <div></div>
        <br>
        <div class="page-title"><h2>Add an ARTIST</h2></div>
        <label>Name: </label>
        <div></div>
        <input class="input-form" v-model="name" type="text" placeholder="Artist's Name"
        />
      </div>
      <div>
        <label>Description: </label>
        <div></div>
        <input class="input-form"  v-model="description" type="text" placeholder="About the artist" />
      </div><br>
      <button type="submit">Add the artist</button>
    </form>
  </div>
</template>

<script>
import utils from "../utils";
export default {
  data() {
    return {
      name: "",
      description: "",
      songId: "",};
  },
  methods: {
    addArtist() {

      let requestParameters = { ...utils.globalParameters };
      let token = window.localStorage.getItem("token");
      requestParameters.headers.Authorization = token;
      requestParameters.method = "POST";
      let data = {};
      data.name = this.name;
      data.description = this.description;
      data.songId = [];
      requestParameters.body = JSON.stringify(data);
      fetch(utils.url + "artists", requestParameters).then((res) => res.json()).then((res) =>{
        console.log("Artist created with the following id: " + res.id);
        data.id = res.id;
        this.$store.dispatch("addArtist", data);
        this.$router.push("/");
      })
    },
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