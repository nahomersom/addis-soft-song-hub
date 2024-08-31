import axios from "axios";
import { SongResponse } from "../model/songsResponse";

const baseUrl = 'https://music-api-dcqp.onrender.com/api/songs/'

export const fetchSongsApi = async () => axios.get(`${baseUrl}getAll`);

export const registerSongApi = async (data: SongResponse) => axios.post(`${baseUrl}add`, data)

export const deleteSongApi = async (id: string) => axios.delete(`${baseUrl}delete/${id}`)

export const updateSongApi = async (id: string,data:SongResponse) => axios.patch(`${baseUrl}update/${id}`, data)