import { createSlice } from "@reduxjs/toolkit";
import { SongResponse } from "../../model/songsResponse";

type SongState = {
  songs: SongResponse[];
  error: null | string;
  isPending: boolean;
  isSuccess: boolean;
};

const initialState: SongState = {
  songs: [],
  error: null,
  isPending: false,
  isSuccess: false,
};

const songSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {

    getSongsRequest: (state) => {
      state.isPending = true; // Set loading to true when request starts
    },
    getSongsSuccess: (state, action) => {
      state.songs = Array.isArray(action.payload) ? action.payload : [];
      state.isPending = false; // Set loading to false when request succeeds
    },
    getSongsFailure: (state, action) => {
      state.error = action.payload;
      state.isPending = false; // Set loading to false if request fails
    },
    createSongRequest: (state) => {
      state.isPending = true;
    },
    createSongSuccess: (state, action) => {
      state.songs.push(action.payload);
      state.isPending = false;
      state.isSuccess = true;
    },
    createSongFailure: (state, action) => {
      state.error = action.payload;
      state.isPending = false;
    },
    updateSongRequest: (state) => {
      state.isPending = true;
    },
    updateSongSuccess: (state, action) => {
      const updatedSong = action.payload;
      state.songs = state.songs.map((song) =>
        song._id === updatedSong._id ? updatedSong : song
      );
      state.isPending = false;
      state.isSuccess = true;
    },
    updateSongFailure: (state, action) => {
      state.error = action.payload;
      state.isPending = false;
    },
    deleteSongRequest: (state) => {
      state.isPending = true;
    },
    deleteSongSuccess: (state, action) => {
      state.songs = state.songs.filter(song => song._id !== action.payload);
      state.isPending = false;
      state.isSuccess = true;
    },
    deleteSongFailure: (state, action) => {
      state.error = action.payload;
      state.isPending = false;
    },
  
    resetSuccessState: (state) => {
      state.isSuccess = false;
    },
    resetErrorState: (state) => {
      state.error = null;
    },
    getSongById: (state, action) => {
      let id = action.payload._id;
      state.songs = state.songs.map(i => i._id === id ? action.payload : i);
    },
    removeSong: (state, action) => {
      let id = action.payload;
      state.songs = state.songs.filter(i => i._id !== id);
    }
  }
});

export const { 
  createSongRequest,
  createSongSuccess,
  createSongFailure,
  updateSongRequest,
  updateSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
  updateSongSuccess,resetSuccessState, resetErrorState,getSongsRequest,getSongsFailure,getSongsSuccess, getSongById, removeSong } = songSlice.actions;
export default songSlice.reducer;
