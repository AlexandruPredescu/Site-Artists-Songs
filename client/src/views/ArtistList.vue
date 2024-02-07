<template>
  <div class="filter">
    <button @click.prevent="ascend()">Ascending</button>
    <button @click.prevent="descendend()">Descending</button>
    </div>
    <div>
      <edit-artist :artist="formArtist" />
      <div id="infoMessage">Below you will find the list of artists you currenyly have in you account!</div>
      <Artist @edit="editArtist" :artist="artist" v-for="artist in artists" :key="artist.id"/>
      
    </div>

</template>

<script>
import Artist from "../components/Artist.vue";
import EditArtist from "./EditArtist.vue";
import utils from "../utils.js";

export default {
  name: "ArtistList",
  components: {
    EditArtist,
    Artist,
  },
  data() {
    return {
      formArtist: {},
      artistsList: [],
      orderer: 1,};},
  created() {
    let url = utils.url;
    let parameters = utils.globalParameters;
    if (!this.artists.length) {
      fetch(url + "artists", parameters).then((res) =>
        res.json().then((res) => {
          this.$store.dispatch("fetchArtists", res);
          this.artistsList = res;
          function compare(x, y) {
            if (x.name < y.name) return -1;
            if (x.name > y.name) return 1;
            return 0;}
          return this.artistsList.sort(compare);}));
        }},
  computed: {
    artists() {
      return this.$store.state.artists;},},
  methods: {
    editArtist(artist) {
      this.formArtist = artist;
    },
    ascend() {
        this.orderer = 1;
        return this.artistsList.sort(function compare(x, y) {
          if (x.name < y.name) return -1;
          if (x.name > y.name) return 1;
          return 0;
        });
      },
    descendend() {
        this.orderer = 0;
        return this.artistsList.sort(function compare(x, y) {
          if (x.name > y.name) return -1;
          if (x.name < y.name) return 1;
          return 0;
        });
      }
    }
  }
</script>

<style>
.filter{
  position: absolute;
  left: 0px;
  top: 12px;
}
#infoMessage{
  margin: 20px 0px 30px 0px;
}
</style>
