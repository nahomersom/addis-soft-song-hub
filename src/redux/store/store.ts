import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { songSaga } from '../sagas/songSaga';
import songsSlice from '../data/SongSlice';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store
export const store = configureStore({
  reducer: {
    songs: songsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware), // Add sagaMiddleware while keeping the default middleware
});

// Run the saga
sagaMiddleware.run(songSaga);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
