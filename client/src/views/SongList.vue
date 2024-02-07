<template>
  <div>
    <div class="filter">
    <button @click.prevent="ascend()">Ascending</button>
    <button @click.prevent="descendend()">Descending</button>
    </div>
    <div>
      <edit-song :song="formSong" />
      <Song @edit="editSong" :song="song" v-for="song in songs" :key="song.id"/>
      </div>
  </div>
  
</template>

<script>
import Song from "../components/Song.vue";
import EditSong from "./EditSong.vue";
import utils from "../utils.js";
export default {
  name: "SongList",
  
  components: {
    Song,
    EditSong,},
  data() {return { formSong: {}, songsList: [], order: 1,};},
  created() {
    let url = utils.url;
    let parameters = utils.globalParameters;
    if (!this.songs.length) {
      fetch(url + "songs", parameters).then((res) => res.json().then((res) => {
          this.$store.dispatch("fetchSongs", res);
          this.songsList = res;
          function compare(x, y) {
            if (x.title < y.title) return -1;
            if (x.title > y.title) return 1;
            return 0;}
          return this.songsList.sort(compare);
        })
      );
    }
  },
  computed: {
    songs() {
      return this.$store.state.songs;},},

  methods: {
    editSong(song) {
      this.formSong = song;},
    ascend() {
        this.order = 1;
        return this.songsList.sort(function compare(x, y) {
          if (x.title < y.title) return -1;
          if (x.title > y.title) return 1;
          return 0;
        });
    },
    descendend() {
        this.order = 0;
        return this.songsList.sort(function compare(x, y) {
          if (x.title > y.title) return -1;
          if (x.title < y.title) return 1;
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

</style>
