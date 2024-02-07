<template>
    <div id="container">
      <b>Song title: {{ song.title }} </b>
      Genre: {{ song.genre }}
      <div v-if="viewtags === true">
  <b>Tags:</b>
  <!-- list every tag -->
  <ul>
    <li v-for="tag in songTags" :key="tag.id">{{ tag.name }}</li>
  </ul>
</div>

      <div id="buttons">
        <button class="butonf" v-if="Authen" v-bind:id="song.id" @click="edit">Select</button>
        <button class="butonf" v-if="Authen" v-bind:id="'DELETE_' + song.id" @click="deleteSong">Delete</button>
        <button @click="showtags">Show tags</button>
        <button @click="deletetags">Delete tags</button>

      </div>
      <div>
      <input type="text" v-model="tag" >
        <button @click="addtag" >Add Tag</button>
      </div>
    </div>
  </template>
  
  <script>
  import utils from "../utils.js";
  export default {
    name: "Song",
    props: ["song"],
    data() {
      return {artistsList: [],
              tag: "",
              viewtags: false,
              songTags: []
      };
    },
    update() {this.artistsList = this.artist;},
    computed: {
      Authen() {return this.$store.state.Authen;},
      artists() {return this.$store.state.artists;},},
      created() {
      },
    methods: {
      edit() {this.$emit("edit", this.song);},
      deleteSong() {
        let songDelete = document.getElementById(`DELETE_${this.song.id}`).getAttribute("id").split("_")[1];

        console.log("Selected for deletion: " + songDelete);
        let requestParameters = utils.globalParameters;
        let token = window.localStorage.getItem("token");
        requestParameters.headers.Authorization = token;
        requestParameters.method = "DELETE";
        fetch(utils.url+"songs/"+songDelete, requestParameters)
        this.$store.dispatch("deleteSong", songDelete);
      },
      addtag() {
        if (this.tag !== "") {
          const tag = {
            name: this.tag,
          };
        
          // Make the API request to add the tag
          let requestParameters = utils.globalParameters;
          let token = window.localStorage.getItem("token");
          requestParameters.headers.Authorization = token;
          requestParameters.method = "POST"; // Use POST method instead of GET
          requestParameters.body = JSON.stringify(tag);
        
          fetch(utils.url + "songs/tags/" + this.song.id, requestParameters)
            .then((res) => res.json())
            .then((data) => {
              // Handle the response
              console.log("Tag added:", data, this.song.id);
              // Perform any necessary actions after adding the tag
              // For example, you can emit an event or update the component's data
            })
            .catch((err) => console.log(err.message));
          
          // Clear the input field after adding the tag
          this.tag = "";
        }
        if(this.viewtags === true){
          this.showtags();
        setTimeout(() => {
            this.showtags();
          }, 400);
        }
  
},

showtags() {
      this.viewtags = !this.viewtags;
      if (this.viewtags) {
        const songId = this.song.id; // Store the song ID in a variable
      
        // Make the API request to get all tags for the song
        let requestParameters = utils.globalParameters;
        let token = window.localStorage.getItem("token");
        requestParameters.headers.Authorization = token;
        requestParameters.method = "GET";
        delete requestParameters.body; // Remove the request body
      
        fetch(utils.url + "songs/tags/" + songId, requestParameters)
          .then((res) => res.json())
          .then((data) => {
            // Handle the response
            console.log("Tags for song", songId + ":", data);
            this.songTags = data.map((tag) => ({
              name: tag._fieldsProto.name.stringValue, // Update this line if necessary
              id: tag._fieldsProto.id.stringValue // Update this line if necessary
            }));
          })
          .catch((err) => console.log(err.message));
      } else {
        this.songTags = []; // Clear the songTags array when hiding the tags
      }
    },
deletetags() {
  const songId = this.song.id; // Get the song ID
  let requestParameters = utils.globalParameters;
  let token = window.localStorage.getItem("token");
  requestParameters.headers.Authorization = token;
  requestParameters.method = "DELETE";

  fetch(utils.url + "songs/tags/" + songId, requestParameters)
    .then(() => {
      // Handle the response (no need to parse the response)
      console.log("Tags deleted for song", songId);
      // Perform any necessary actions after deleting the tags
      // For example, you can update the component's data or refresh the tags list
      this.songTags = [];
    })
    .catch((err) => console.log(err.message));
}

      
    },
    mounted() {
  fetch("http://127.0.0.1:3000/songs")
    .then((res) => res.json())
    .then((data) => {
      this.songList = data;
    })
    .catch((err) => console.log(err.message));
},



  };
  </script>
  
  <style>
  
  #buttons {
    display:inline;
    right: 10px;
    position: absolute;
  
  }
  
  .butonf{
    margin-left: 3px;
  }
  </style>