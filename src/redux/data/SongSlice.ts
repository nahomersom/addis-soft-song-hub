import { createSlice } from "@reduxjs/toolkit";
import { SongResponse } from "../../model/songsResponse";

type SongState = {
    songs: SongResponse[]; 
    error: null | string;
    isPending: boolean;

  };
  
  const initialState: SongState = {
    songs: [],
    error: null,
    isPending: false,
  };

 const songSlice = createSlice({
   name:'songs',
   
   initialState:initialState,
   reducers:{
getSongs:(state,action)=>{
        state.songs = action.payload;
        state.isPending = false;
   },
addSong:(state,action)=>{
    
       state.songs.push(action.payload);
   },
getSongById:(state,action)=>{
  
    let id = action.payload._id;
    state.songs = state.songs.map(i => i._id == id ? action.payload : i)
    return state
},
removeSong:(state,action)=>{
  let id = action.payload;
  console.log('payl',action.payload)
  state.songs = state.songs.filter(i => i._id !== id)
  console.log('deleatle',state.songs)
  return state
}

}
});
export const {addSong,getSongs,getSongById,removeSong} = songSlice.actions;
export default songSlice.reducer;