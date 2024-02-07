import { createStore } from 'vuex'

export default createStore({
  state: {
    Authen: false,
    artists: [],
    songs: [],},
  getters: {
    artists: state => {
      return state.artists;},
    songs: state => {return state.songs;},},
  mutations: {
    SET_AUTH: (state, status) => {state.Authen = status;},
    SET_ARTISTS: (state, artists) => {state.artists = artists;},
    ADD_ARTIST: (state, artist) => {state.artists.push(artist);},
    DELETE_ARTIST: (state, id) => {state.artists = state.artists.filter(element => element.id !== id);},
    EDIT_ARTIST: (state, artist) => {
      state.artists = state.artists.map(element => {
        if (element.id === artist.id) {
          if (element.name !== artist.name)
            element.name = artist.name;
          if (element.description !== artist.description)
            element.description = artist.description;
          if (element.songId !== artist.songId)
            element.songId = artist.songId;
        }
        return element;})},

    SET_SONGS: (state, songs) => {state.songs = songs;},
    ADD_SONG: (state, song) => {state.songs.push(song);},
    DELETE_SONG: (state, id) => {state.songs = state.songs.filter(element => element.id !== id);},
    EDIT_SONG: (state, song) => {
      state.songs = state.songs.map(element => {
        if (element.id === song.id) {
          if (element.title !== song.title)
            element.title = song.title;
          if (element.genre !== song.genre) {
            element.genre = song.genre}}
        return element;})}, 
        CHECK_AUTHENTICATED: (state) => {
      if (window.localStorage.getItem('token')) {
        state.Authen = true;}}
  },
  actions: {
    login: ({ commit }, payload) => {
      commit('SET_AUTH', payload);
    },
    verifyAuth: ({ commit }) => {
      commit('CHECK_AUTHENTICATED');
    },


    fetchArtists: ({ commit }, payload) => {
      commit('SET_ARTISTS', payload);
    },
    addArtist: ({ commit }, payload) => {
      commit('ADD_ARTIST', payload);
    },
    editArtist: ({ commit }, payload) => {   
      commit('EDIT_ARTIST', payload);
    },
    deleteArtist: ({ commit }, payload) => {
      commit('DELETE_ARTIST', payload);
    },


    fetchSongs: ({ commit }, payload) => {
      commit('SET_SONGS', payload);
    },
    addSong: ({ commit }, payload) => {
      commit('ADD_SONG', payload);
    },
    editSong: ({ commit }, payload) => {
      commit('EDIT_SONG', payload);
    },
    deleteSong: ({ commit }, payload) => {
      commit('DELETE_SONG', payload);
    }},

})
