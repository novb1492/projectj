import axios from 'axios';

export function requestGet(url){
    return axios.get(url,{withCredentials: true});
}
export function a(){
    alert('a');
}
export function getValueById(id){
    return document.getElementById(id).value;
}
export function openPOPup(uri,popName,width,height){
    window.open(uri,popName, 'width='+width+', height='+height+'','resizable=no');
}
export function getParam(sname) {
    var params = location.search.substr(location.search.indexOf("?") + 1);
    var sval = "";
    params = params.split("&");
    for (var i = 0; i < params.length; i++) {
       var temp = params[i].split("=");
        if ([temp[0]] == sname) { sval = temp[1]; }
    }
    return sval;
}
