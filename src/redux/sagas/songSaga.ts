
import {call,put,SagaReturnType, takeLatest, all} from 'redux-saga/effects';
import { deleteSongApi, fetchSongsApi, registerSongApi, updateSongApi } from '../../Api/api';
import { addSong, getSongs,getSongById,removeSong} from '../data/SongSlice';
import { CREATE_SONG, DELETE_SONG_BY_ID, GET_SONGS, UPDATE_SONG_BY_ID } from '../types/reduxTypes';




function* workGetSongsFetch(){
    const songs:SagaReturnType<typeof fetchSongsApi> = yield call(fetchSongsApi); 
    yield put(getSongs(songs.data));
}
function* workCreateSongs(data:any){
    yield call(registerSongApi,data.payload); 
    yield put(addSong(data.payload));
}
function* workPatchSongs(data:any){
    yield call(updateSongApi,data.payload._id,data.payload); 
 
    yield put(getSongById(data.payload));
}
function* workDeleteSongs(SongResponse:any){
    let id = SongResponse.payload.id
    yield call(deleteSongApi,id); 
    yield put(removeSong(id));
}



function* sagas(){
    yield takeLatest(GET_SONGS,workGetSongsFetch)
    yield takeLatest(CREATE_SONG,workCreateSongs)
    yield takeLatest(UPDATE_SONG_BY_ID,workPatchSongs)
    yield takeLatest(DELETE_SONG_BY_ID,workDeleteSongs)
}
export function* songSaga() {
    yield all([
        sagas()
    ])
}








