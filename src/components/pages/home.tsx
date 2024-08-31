import styled from '@emotion/styled'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { SongResponse } from "../../model/songsResponse";
import { RootState } from "../../redux/store/store";
import SharedButton from "../shared/button";
import { DELETE_SONG_BY_ID, GET_SONGS } from '../../redux/types/reduxTypes';

const TableContent = styled.div`
display:flex;
gap:6em;
min-width: 83%;
padding-left:10px;  
`

const SongCard = styled(TableContent)`
background-color:white;
box-shadow: 0 3px 10px rgb(0 0 0 / 0.2); 
`
const TableText = styled.div`
min-width:10%;
max-width:10%;
text-align: center;
`
const IconsContainer = styled(TableText)`
display:flex;
gap:6px;
justify-content: center;
align-items: center;
`

const SongsTable = styled.div`
display:flex;

flex-direction:column;
margin-top:5em;
gap:1em;
width:88%;
SharedButton{
    align-self: center;
}
p{
    text-align:center;
    font-size:25px;
    font-weight:bold;
}
`
const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;
const Wrapper = styled.div`
display:flex;
justify-content:center;
align-items:center;
`
const EditIcon  = styled(CreateOutlinedIcon)`
  color: green;
  cursor: pointer;
`;
const DeleteIcon  = styled(DeleteOutlineIcon)`
  color: red;
  cursor: pointer;
  
`;

const TableHeader =  styled(TableContent)`

    
`

function Home(){
    const dispatch = useDispatch();
    useEffect(() => {
        // Dispatch GET_SONGS action to trigger the saga
        dispatch({ type: GET_SONGS });
      }, [dispatch]);
    

    const handleRemoveSong = (id:string) =>{
    
        dispatch({type:DELETE_SONG_BY_ID,payload:{id:id}})
    }
  const songs = useSelector((state:RootState) => state.songs.songs);

 
const addSongs = () =>{
    
}
  
    return(
      
        <Wrapper>


    <SongsTable>
     <StyledLink to="/song">

        <SharedButton
        
        onClick={addSongs}
    label="Add New Song"

    props={{
        width:'100%',
     }}
    ></SharedButton>
     </StyledLink>
       

    <TableHeader>
    <TableText><h3>no</h3></TableText>
    <TableText><h3>Title</h3></TableText>
    <TableText><h3>Artist</h3></TableText>
    <TableText><h3>Album</h3></TableText>
    <TableText><h3>Genre</h3></TableText>
    <TableText><h3>Actions</h3></TableText>
</TableHeader>
    {
    songs.length ? songs.map((song:SongResponse,index:number)=>(
<SongCard key={index}>
    <TableText>
    <h6>{index + 1}</h6>
    </TableText>
    <TableText>
    <h6>{song.title}</h6>
    </TableText>
    <TableText>
    <h6>{song.artist}</h6>
    </TableText>
    <TableText>
    <h6>{song.album}</h6>
    </TableText>
    <TableText>
    <h6>{song.genre}</h6>
    </TableText>
   
    <IconsContainer>
<StyledLink to={`/song/${song._id}`} >

<EditIcon/>
</StyledLink>
<button onClick={()=>handleRemoveSong(song._id)}>

<DeleteIcon/>
</button>
    </IconsContainer>

</SongCard>


)) : <p>No Song Found</p>}
    
    </SongsTable>
    
        </Wrapper>
     
    )
}
export default Home;