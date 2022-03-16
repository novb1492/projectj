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
    if(val==null||val==undefined||val==''||val=='null'){
        return true;
    }
}
export function disabledById(id,flag){
    document.getElementById(id).disabled=flag;
}
export async function requestAsyncToGet(url){
    return  await axios.get(url,{withCredentials: true}).then(function(response){
      var result=response.data;
      console.log(result);
      console.log('통신직후');
      if(result.message=='new'){
          console.log('새토큰으로 요청');
          return requestAsyncToGet(url);
      }
      return result;
   })
}
export async function requestAsyncToDelete(url){
    return  await axios.delete(url,{withCredentials: true}).then(function(response){
      var result=response.data;
      console.log(result);
      console.log('통신직후');
      if(result.message=='new'){
          console.log('새토큰으로 요청');
          return requestAsyncToDelete(url);
      }
      return result;
   })
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
export async function requestAsyncToPut(url,data){
    return  await axios.put(url,data,{
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
        return requestAsyncToPut(url,data);
        }   
      return result;
   })
}
export async function requestFormAsyncToPost(url,data){
    return  await axios.post(url,data,{
        headers: {
            'Content-Type': 'multipart/form-data'
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
export async function requestPutToServer(url,data){
    return  await axios.put(url,data,{
      headers: {
          "Content-Type": `application/json`,
      },
      withCredentials: true ,
  }).then(function(response){
      var result=response.data;
      console.log(result);
      console.log('통신직후')
      if(result.message=='newAccessToken'){
        console.log('새토큰으로 요청');
        return requestPutToServer(url,data);
    }
      return result;
   })
}
export async function requestDelete(url){
    return  await axios.delete(url,{withCredentials: true}).then(function(response){
      var result=response.data;
      console.log(result);
      console.log('통신직후');
      if(result.message=='new'){
          console.log('새토큰으로 요청');
          return requestDelete(url);
      }
      return result;
   })
}
export function changeUrl(url){
    if (typeof (history.pushState) != "undefined"){ 
        history.pushState(null, null, url); 
        return true;
    }
    return false;
}
export function checkRole(role,loginFlag,denideRole){
    if(checkLoginFlag(loginFlag)||role==denideRole){
        return true;
    }
    return false;
}
export function checkLoginFlag(loginFlag){
    if(!loginFlag){
        return true;
    }
    return false;
}
export function changeValueById(id,value){
    document.getElementById(id).value=value;
}
export function footerAtButton(footerHeight){
    window.addEventListener('resize',()=>{
        document.getElementById('container').style.height=window.innerHeight-footerHeight+'px';
    });
    document.getElementById('container').style.height=window.innerHeight-footerHeight+'px';
}
export function getTodayDate(){
    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    return  year + '-' + month  + '-' + day;
}
export function payForCard(SETTLE_PG,result){
    SETTLE_PG.pay({
        "env": "https://tbnpg.settlebank.co.kr",
        "mchtId": result.mchtId,
        "method": result.method,
        "trdDt": result.date,    
        "trdTm": result.time,
        "mchtTrdNo": result.mchtTrdNo,
        "mchtName": "WonderLand",
        "mchtEName": "WonderLand",
        "pmtPrdtNm": result.productNames,
        "trdAmt": result.price,
        "mchtCustId":result.mchtCustId,
        "notiUrl": "http://kim80800.iptime.org:8080/auth/settlebank",
        "nextUrl": "http://localhost:8080/settle/card/suc",
        "cancUrl": "http://localhost:8080/settle/card/fail",
        "pktHash": result.pktHash,
        "ui": {
            "type": "popup",
            "width": "430",
            "height": "660"
        }
        }, function(rsp){
            //iframe인경우 온다고 한다
            console.log('통신완료');
            console.log(rsp);
        });      
}
export function payForVbank(SETTLE_PG,result){
    SETTLE_PG.pay({
        "env": "https://tbnpg.settlebank.co.kr",
        "mchtId": result.mchtId,
        "method": result.method,
        "trdDt": result.date,    
        "trdTm": result.time,
        "mchtTrdNo": result.mchtTrdNo,
        "mchtName": "WonderLand",
        "mchtEName": "WonderLand",
        "pmtPrdtNm": result.productNames,
        "expireDt": result.expireDt,
        "trdAmt": result.price,
        "mchtCustId":result.mchtCustId,
        "notiUrl": "http://kim80800.iptime.org:8080/auth/settlebank",
        "nextUrl": "http://localhost:8080/settle/vbank/suc",
        "cancUrl": "http://localhost:8080/settle/vbank/fail",
        "pktHash": result.pktHash,
        "ui": {
            "type": "popup",
            "width": "430",
            "height": "660"
        }
        }, function(rsp){
            //iframe인경우 온다고 한다
            console.log('통신완료');
            console.log(rsp);
        });      
}