import axios from 'axios';

export function requestGet(url){
    return axios.get(url,{withCredentials: true});
}
export function a(){
    alert('a');
}