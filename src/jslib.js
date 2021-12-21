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
export function requestPost(url,data){
    return  axios.post(url,data,{
      headers: {
          "Content-Type": `application/json`,
      },
      withCredentials: true ,
  });
}
export function wrongAccese(){
    alert('잘못된 접근입니다');
    location.href='/';
}
export function checkNull(val){
    if(val==null||val==undefined||val==''){
        return true;
    }
}
export function disabledById(id,flag){
    document.getElementById(id).disabled=flag;
}
export async function requestAsyncToPost(url,data){
    return  await axios.post(url,data,{
      headers: {
          "Content-Type": `application/json`,
      },
      withCredentials: true ,
  }).then(function(response){
      var result=response.data;
      console.log(result);
      console.log('통신직후')
      if(result.message=='new'){
        console.log('새토큰으로 요청');
        return requestAsyncToPost(url,data);
        }   
      return result;
   })
}
