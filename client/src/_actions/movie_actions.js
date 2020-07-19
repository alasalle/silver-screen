import axios from 'axios';
import {CREATE_MOVIE} from './types';
import {beURL} from "../config/key";

const URL = `${beURL}/api/movies`;

export function createMovie(data){
    const request = axios.post(`${URL}/create_movie`, data)
        .then(response => response.data);
    
    return {
        type: CREATE_MOVIE,
        payload: request
    }
}