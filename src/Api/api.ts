import axios, { AxiosResponse } from "axios";
import { SongResponse } from "../model/songsResponse";

const baseUrl = 'https://music-api-dcqp.onrender.com/api/songs/';
// const baseUrl = 'http://localhost:4000/api/songs/'
export const fetchSongsApi = async (): Promise<AxiosResponse<SongResponse[]>> => axios.get(`${baseUrl}getAll`);

export const registerSongApi = async (data: SongResponse): Promise<AxiosResponse<SongResponse>> => axios.post(`${baseUrl}add`, data);

export const deleteSongApi = async (id: string): Promise<AxiosResponse<any>> => axios.delete(`${baseUrl}delete/${id}`);

export const updateSongApi = async (id: string, data: SongResponse): Promise<AxiosResponse<SongResponse>> => axios.patch(`${baseUrl}update/${id}`, data);
