import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import SharedButton from "../shared/button";

import { SongResponse } from "../../model/songsResponse";
import TextField from "../shared/TextField";
import { RootState } from "../../redux/store/store";
import { CREATE_SONG, UPDATE_SONG_BY_ID } from "../../redux/types/reduxTypes";

import { useEffect } from "react";
import { resetErrorState, resetSuccessState } from "../../redux/data/SongSlice";


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

const initialValue = {

  title: "",
  artist: "",
  album: "",
  genre: "",
};

const Song = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { songs, isPending, isSuccess, error } = useSelector((state: RootState) => state.songs);

  const existingSong = params.id ? songs.find(song => song._id === params.id) : null;

  const [values, setValues] = useState(existingSong || initialValue);

  useEffect(() => {
    if (isSuccess) {
      alert("Song successfully created/updated!");
      navigate('/');
      dispatch(resetSuccessState());  // Reset success state after navigation
    }
  }, [isSuccess, navigate, dispatch]);

  useEffect(() => {
    if (error) {
      alert(`Error: ${error}`);
      dispatch(resetErrorState());  // Reset error state after showing the error
    }
  }, [error, dispatch]);

  const handleFormSubmit = () => {
    if (params.id) {
      dispatch({
        type: UPDATE_SONG_BY_ID,
        payload: values,
      });
    } else {
      dispatch({
        type: CREATE_SONG,
        payload: values,
      });
    }
  };

  return (
    <Container>
      <Wrapper>
        <FormHolder>
          <h2>{params.id ? 'Edit Song' : 'Add a new Song'}</h2>

          {isPending ? (
            <p>Loading...</p>
          ) : (
            <>
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
            </>
          )}
        </FormHolder>
      </Wrapper>
    </Container>
  );
};

export default Song;
