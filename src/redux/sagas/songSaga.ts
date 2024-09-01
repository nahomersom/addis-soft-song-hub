
import {call,put,SagaReturnType, takeLatest, all} from 'redux-saga/effects';
import { deleteSongApi, fetchSongsApi, registerSongApi, updateSongApi } from '../../Api/api';
import {  createSongFailure, createSongRequest, createSongSuccess, deleteSongFailure, deleteSongRequest, deleteSongSuccess, getSongById,getSongsFailure,getSongsRequest,getSongsSuccess,removeSong, updateSongFailure, updateSongRequest, updateSongSuccess} from '../data/SongSlice';
import { CREATE_SONG, DELETE_SONG_BY_ID, GET_SONGS, UPDATE_SONG_BY_ID } from '../types/reduxTypes';
import { SongResponse } from '../../model/songsResponse';





// Worker Saga: Fetch songs asynchronously
// function* fetchSongsSaga() {
//     try {
//       yield put(getSongsRequest()); // Dispatch loading state
//       const songs:SagaReturnType<typeof fetchSongsApi> = yield call(fetchSongsApi);  // Fetch songs from API
//       yield put(getSongsSuccess(songs)); // Dispatch success with payload
//     } catch (error:any) {
//       yield put(getSongsFailure(error?.message)); // Dispatch failure with error
//     }
//   }

  function* fetchSongsSaga() {
    try {
      // Call the API
      const response:SagaReturnType<typeof fetchSongsApi> = yield call(fetchSongsApi);
      
      // Extract only the data (omit headers and other non-serializable metadata)
      yield put(getSongsSuccess(response.data)); // Dispatch only the serializable data
    } catch (error:any) {
      yield put(getSongsFailure(error.message || "Failed to fetch songs"));
    }
  }
// Create Song Saga
function* createSongSaga(action:any) {
    try {
      yield put(createSongRequest());
      const newSong:SagaReturnType<typeof registerSongApi> = yield call(registerSongApi, action.payload);
      yield put(createSongSuccess(newSong.data));
    } catch (error:any) {
      yield put(createSongFailure(error?.message || "Failed to create song"));
    }
  }
  
  // Update Song Saga
  function* updateSongSaga(action:any) {
    try {
      yield put(updateSongRequest());
      const updatedSong:SagaReturnType<typeof updateSongApi> = yield call(updateSongApi, action.payload._id, action.payload);
      yield put(updateSongSuccess(updatedSong.data));
    } catch (error:any) {
      yield put(updateSongFailure(error?.message || "Failed to update song"));
    }
  }
  
  // Delete Song Saga
  function* deleteSongSaga(action:any) {
    try {
      yield put(deleteSongRequest());
      yield call(deleteSongApi, action.payload);
      yield put(deleteSongSuccess(action.payload));
    } catch (error:any) {
      yield put(deleteSongFailure(error?.message || "Failed to delete song"));
    }
  }
  
//   // Watcher Sagas
//   function* watchSongsSagas() {
//     yield takeLatest(getSongsRequest.type, fetchSongsSaga);
//     yield takeLatest(createSongRequest.type, createSongSaga);
//     yield takeLatest(updateSongRequest.type, updateSongSaga);
//     yield takeLatest(deleteSongRequest.type, deleteSongSaga);
//   }



  function* sagas() {
    yield takeLatest(CREATE_SONG, createSongSaga);
    yield takeLatest(UPDATE_SONG_BY_ID, updateSongSaga);
    yield takeLatest(DELETE_SONG_BY_ID, deleteSongSaga);
    yield takeLatest(GET_SONGS, fetchSongsSaga);
}
export function* songSaga() {
    yield all([
        sagas()
    ])
}








