import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import SharedButton from "../shared/button";

import { SongResponse } from "../../model/songsResponse";
import TextField from "../shared/TextField";
import { RootState } from "../../redux/store/store";
import { CREATE_SONG, UPDATE_SONG_BY_ID } from "../../redux/types/reduxTypes";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
const Wrapper = styled.div`
  margin-top: 60px;
  width: 50%;
`;
const FormHolder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  h2 {
    align-self: center;
  }
`;

const initialValue: SongResponse = {
  _id: "",
  title: "",
  artist: "",
  album: "",
  genre: "",
};

const Song = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  
  // Select songs from the Redux store
  const songs = useSelector((state: RootState) => state.songs.songs);

  // Ensure songs is an array
  const songList = Array.isArray(songs) ? songs : [];

  // Filter the song by id if `params.id` exists
  const existingSongs = params.id ? songList.filter(song => song._id === params.id) : [];

  const [values, setValues] = useState<SongResponse>(
    existingSongs[0] ?? initialValue
  );

  const handleFormSubmit = () => {
    if (params.id && existingSongs.length > 0) {
      dispatch({
        type: UPDATE_SONG_BY_ID,
        payload: {
          _id: params.id,
          title: values.title,
          artist: values.artist,
          genre: values.genre,
          album: values.album,
        },
      });
    } else {
      dispatch({
        type: CREATE_SONG,
        payload: {
          title: values.title,
          artist: values.artist,
          genre: values.genre,
          album: values.album,
        },
      });
    }
    setValues(initialValue);
    navigate('/');
  };

  return (
    <Container>
      <Wrapper>
        <FormHolder>
          <h2>{params.id ? 'Edit Song' : 'Add a new Song'}</h2>
          <TextField
            label="Title"
            value={values.title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            props={{
              placeholder: 'Song Title',
            }}
          />
          <TextField
            label="Artist"
            value={values.artist}
            onChange={(e) => setValues({ ...values, artist: e.target.value })}
            props={{
              placeholder: 'Artist Name',
            }}
          />
          <TextField
            label="Album"
            value={values.album}
            onChange={(e) => setValues({ ...values, album: e.target.value })}
            props={{
              placeholder: 'Album Name',
            }}
          />
          <TextField
            label="Genre"
            value={values.genre}
            onChange={(e) => setValues({ ...values, genre: e.target.value })}
            props={{
              placeholder: 'Genre',
            }}
          />
          <SharedButton
            label="Submit"
            onClick={handleFormSubmit}
            props={{
              width: '5%',
            }}
          />
        </FormHolder>
      </Wrapper>
    </Container>
  );
};

export default Song;
