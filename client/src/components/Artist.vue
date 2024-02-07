<template>
    <div id="container">
      <div>Name:<b>{{ artist.name }}</b></div>
      <div>Description: {{ artist.description }}</div>
      <div>
        <button class="butonc" v-if="Authen" v-bind:id="artist.id" @click="edit">Select</button>
        <button class="butonc" v-if="Authen" v-bind:id="'DELETE_' + artist.id" @click="deleteArtist">Delete</button>
      </div>
    </div>
  </template>
  
  <script>
  import utils from "../utils.js";
  export default {
    name: "Artist",
    props: ["artist"],
    data() {
      return {};},
    computed: {
      Authen() {
        return this.$store.state.Authen;},},
    methods: {edit() {this.$emit("edit", this.artist);},
              deleteArtist() {
                let deleteArtist = document.getElementById(`DELETE_${this.artist.id}`).getAttribute("id").split("_")[1];
                console.log("Delete this item: ", deleteArtist);
                let requestParameters = utils.globalParameters;
                let token = window.localStorage.getItem("token");
                requestParameters.headers.Authorization = token;
                requestParameters.method = "DELETE";
                fetch(utils.url + "artists/" + deleteArtist, requestParameters)
                this.$store.dispatch('deleteArtist', deleteArtist)
              }},
    mounted() {
      fetch("http://127.0.0.1:3000/artists")
        .then((res) => res.json())
        .then((data) => (this.artistsList = data))
        .catch((err) => console.log(err.message));
    },};
  </script>
  
  <style>
  #container {
    border: 2px solid #597B65;
    margin: auto;
    width: 70%;
    padding: 30px;
    position: relative;
    text-align: left;
    border-radius: 50px;
    margin-bottom: 20px;
  }

  button{
    border-radius: 500px;
    border: 1px solid transparent;
    letter-spacing: 3px;
    text-transform: uppercase;
    text-align: center;
    padding: 16px 14px 18px;
    background-color: #33814D;
  }

  .butonc{
    display: inline;
    align-content: center;
    justify-content: center;
    margin-top: 10px;
    margin-left: 3px;
  }
  

  </style>