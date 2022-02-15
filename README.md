# blog_jangbogo_front

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

websocket  
npm i webstomp-client sockjs-client  

firstdoor=메인페이지    
기능  
-지도표시/배달받을위치표시,변경/키워드 검색후 마트및가게 표시  

2021-12-0x~2021-12-05  
기본적 기능 테스트 + 지도표시/배달받을위치표시/키워드 검색후 마트및가게 표시 구현   
2021-12-06  
카카오 기능 각 모듈화 뒤로가기시 검색한 정보가 있다면 유지기능 추가  

2021-12-07  
브랜치만듬  

2021-12-08  
회사컴퓨터로 브랜치 clone 후 반영테스트 성공  
집에가서 pull해보자  
1.집주소 불러오기 버튼 헤더로 분리  
-집네비바에 넣을 예정이므로 현재 내기술로는 이게 한계
2.세션 활용해 검색기록남기기  
-새로고침/뒤로가기시 마트검색/집주소 초기화방지
3.기타 소스정리  
merge완료  

2021-12-09  
1.부트스트랩연동 네비바 붙히기성공  
2.네비바 로그인 여부 구분  
3.window.onresize를 이용해 리사이즈 감지  
4.메인 링크는 분홍색  마진제거
병합완료  


2021-12-10  
1.다른컴포넌트간 통신성공  
-eventbus를 이용했다  
병합시도/병합성공  


2021-12-11  
1.로그인 구현시작  
-회원가입 부터 구현시작  

2021-12-12  
1.회원가입 구현시작  
2.ul태그 점 제거/app 가운데 정렬 분할  
3.카카오 우편번호 npm  
-npm install vue-daum-postcode --save  
import VueDaumPostcode from "vue-daum-postcode"    
Vue.use(VueDaumPostcode) 까먹지 말고  
4.회원가입 창크기 고정  
-window.resizeTo(500,900)  
5.회원가입 전 회원 분류  
-생각해보니 회원가입전 기업구매,판매자/개인회원을 나눠서 받아야한다  
6.기업회원가입시 주소검색후 지도 까지 표시 
7.지도 검색이 달라 졌을때 마커/인포윈도우 제어중  
-배열에 넣고 제어하자   
8.인증페이지 제작  
병합시도/병합성공  
join branch만듬  

2021-12-13  
1.로그인 페이지 시작  
2.페이지 상단 로그 컴포넌트로 분리  
3.아이디/비밀번호찾기 페이지 구현  
병합시도/병합성공

2021-12-14  
깜박하고 기록안했다  
병합시도/병합성공

2021-12-15  
1.인증완료 구현하기  
2.사업자번호,회원가입버튼생성  
3.회원가입 구현시작
<<<<<<< HEAD
병합시도/병합성공  

2021-12-16  
1.백엔드 작업중  
=======
병합시도/병합성공    
>>>>>>> 2d0699133cc5de96fb0f2bca8fdad481bb8da47b
2021-12-17  
1.회원가입 유형별 분류  
-기업회원은 나중에 마이페이지에서 
둘다 할수있게 해주자  
병합시도/병합성공  

2021-12-18  
1.로그인 구현시작  

2021-12-20  
1.백엔드 http->https
-세션이슈로 인해 http로 다시 전환  
2.로그인 후처리 작업중  
3.이중요청해결 어차피 이제 eventbus로  
mount단에 넣어서 네비바가 있던없던 줄수있음  

2021-12-21  
1.기업회원가입 추가정보 입력  
-디자인을 언제 할지 고민인데  
디자인은 스토어 기능까지 붙히고 하자  
병합시도/병합성공  
2.토큰만료시 재요청 함수 구축  
병합시도/병합성공  

userother 브랜치생성  

2021-12-22  
1.아이디/비밀번호찾기 구축  
<<<<<<< HEAD
2.비밀번호 찾기 페이지 구축  
=======
병합시도/병합성공  
>>>>>>> 1e50614974fe80ab2628d637c52ae86ac0dee1d7
git pull까먹지 말고하자  

2021-12-24  
1.비밀번호 변경 페이지 구축완료  
-만료된토큰이나 값으로 페이지 접근 불가  
병합시도/병합성공  
2.도메인수정
-몇번더 전체적으로 도메인 분리 혹은 수정이 일어날거같다  
병합시도/병합성공  
3.이메일 중복검사(회원가입시)

이제 프론트디자인좀 더 만져보고 store해보자  
병합시도/병합성공  

정리 위해 1cleanup브랜치생성  
4.엔터키 이벤트추가  
5.소셜로그인 구현  

2021-12-26
1.일반회원시 생년월일 추가  
-현재는 사실상의미없음 
나중에 나이스api로 검증해야함  
2.외부 api 호출후 결고 표시페이지 작성  

2021-12-27  
1.기업회원 회원가입방식변경  
-기존 사업자+상호 같이회원가입  
변경 사업자로 회원가입 후 가맹점 따로 가입  
병합시도/병합성공  

가맹정등록위해 company 브랜치 생성  

2021-12-28  
1.가맹점페이지 구축시작  
2.백엔드 도메인변수화  
3.로그인 체크시 권한/이메일/플래그저장  
4.헤더 일반/기업회원 분리  

2021-12-29  
1.사진업로드 테스트겸 에터 연동  
vue2=npm install —save @ckeditor/ckeditor5-vue2 이다  
jwt방식이므로 요청시 쿠키 추가 + 만료시 재요청 로직추가  
자스크립트는 .files[n]으로 가져올 수 있다  
2.올린 파일별로 썸네일 자동 동적할당 성공  

2021-12-30  
1.가맹정등록 페이지 구축  
-배달반경 입력시 배달반경 표시  
그냥 파라미터값만 바꿔주면 해결되는 문제였다  

2021-01-01  
1.백엔드위주 구축  
2.유저권한 판별  
3.oauth페이지 로그인 결과 구축  
병합시도/병합성공  

2021-01-03
소캣연결성공
-배달원위치표시위해  
일단 너무 피곤해서 쉬자  

2021-01-04  
사장님페이지 가게목록 페이징구현  

2021-01-05  
1.검색기능 구축  

2021-01-05  
1.검색기능추가  
2.에디터 컴포넌트로 분리  
-키업으로 인식중이여서 이미지 삽입이 버그존재  

2021-01-06  
1.에디터연동 방식변경
-좀 더 잘 이해되는 방식으로 변경  
2.지도 컴포넌트화  

2021-01-07  
1.에디터 근본원인 해결  
-원인: 토큰 재발급시 재요청까지는 됨
그러나 에디터에 다시 띄어지지가 않음  
해결: upload에있는 요청 방식을 그대로 한번더 요청  

병합을 할건데 이제 버전으로 하자  
0.0.1 부터 시작  
한파트가 완성되면 가운데 0 올리기  
같은 버전에서 소소한 변화면 마지막 0 올리기  
병합시도/병합성공  

2021-01-10  
1.매장검색후 마커클릭시 사이드바 출력  

2021-01-11  
1.footer하단고정  
2.로그인/회원가입 팝업->페이지  
3.풋터 스크롤생길시 하단 고정이 안되는 버그발생  

2021-01-13  
1.sidebar버그해결  
2.var->bar  
3.사장님페이지 가게표시 재디자인  
4.가게등록 재디자인  
5.localstorege이용해 새로고침시 데이터 유지  
6.부트스트랩이용해 푸터 하단고정 
-navbar-fixed-bottom 한줄 알았으나.. 아직안됨.. 
7.네비바 상단 고정 지정으로 가로길이 문제해결  
-fixed-top  

2021-01-14  
1.get방식 유지위해 0.0.1로결정  
-아니다 ㅋㅋ 새로고침 없다 있으니까 좀 걸슬려서 localstorege사용결정  
2.브라우저 종료시 사라지게 sessionStorege로 변경  
3.전체적인 디자인 구조 수정
-abo->float left  
4.vue 동적 라우트+ 동적 컴포넌트로변경  

0.0.4 버전업  
(버전업=머지)  

2021-01-15  
1.드래그 이동시 근처 마트들 표시  
-검색시 마트=대형위주 슈퍼= 동네슈퍼 위주로 나옴  

2021-01-17  
1.firstdoor 검색/드래그 표시구분  
-검색시 드래그로인한 것들은 삭제  
드래그시 검색시 표시된거는 남김  
2.검색내역없을때 지도이동 방지  
-검색내용이 없는데 이동되면 깨짐  

2021-01-18  
1.master 0.0.3 merge  
-nelify베포위해  
병합시도/병합성공  
2.netlify vue 라우터 이슈로 인해 _redirects 생성  
-베포는 마스터에서 이뤄질거여서 마스터에만 생성  
3.매장 디테일 페이지 제작시작  
4.스토리지 사용안해도 되게 변경  
병합시도/병합성공 
5.입장시 사용자 위치로 포커싱  
-인포윈도우가 강제로 지금계속 잡는데 내일 해결해야겠다   

2021-01-20  
1.배달원-주문자 웹소켓 연결성공  
-새로고침시에도 연결되게 로컬스토리지 이용  
이제 백엔드에서 채팅방처럼 방을 파줘야할거 같다  
병합시도/병합성공  

0.0.4 브랜치 생성  

2022-01-23  
1.https=https
-netfly로 테스트결과 프론트가 https면 백엔드도 마찬가지  
ec2 https로 올리면됨  
2.https=wss  
-http=ws/https=wss  

0.0.5~0.0.6  

2021-01-25  
1.지도를 컴포넌트화 시도  
-메인페이지 완료  
2.가게등록 컴포넌트화 시도 
-완료  
3.가게수정페이지 완료  
병합시도/병합성공  

2022-01-26  
1.매장정보수정 구현시작  

0.0.7
-db다듬기 위해 생성 회사다니면서 컬럼명이 얼마나 중요한지 깨달았다  
지금이라도 바꿔야한다  

1.store컬럼명 변경성공  
-s->store_ 

2022-01-28  
1.배달방 나누기 성공  
-이제 제대로 페이지를 나눠보자  
2.watch를 이용해 뒤로가기 구현성공  
-라우터 변화를 감지해 url을 가져와서 이동시켜준다 =location.href 방식  
컴포넌트 교체방식으로 전환  

2022-01-29  
1.vue는 url을 변경할때 router.push로 해야한다  

2022-01-30
1.매장 목록 뒤로/앞으로 가기 대응만 하면될거같다 

0.0.8  
-컴포넌트 재분리  

2022-01-31  
1.eventbus->props  
-컴포넌트 호출시에는 props로 인자를 전달해야한다  
eventbus는 호출뒤 있는 함수만 당겨쓸때 사용해야한다  
3일동안 미친듯이 찾아보고 오늘 이해 했다  
2.ref  
-부모컴포넌트에서 자식 컴포넌트 함수/변수 호출가능 !!!  결국 해결했다   
 vue가 뭔지 훨씬더 잘알게 된거같다  이제 새로고침 없이 자유롭게 페이지가 구현 가능 하겠다!  
y
병합시도/병합성공  

3.v-on and emit  
-아주쉽게 자식 에서 부모 컴포넌트에게 전달이 가능하다
  
2022-02-01  
1.불필요한 evnetbus제거
->evnetbus->refs  

제발 git pull하고 작업해  

2.companyPage 권한/로그인 체크 구현  

병합시도/병합성공

0.0.9브랜치생성
-배송 추적(?) 페이지 구현시작  

1.배송추적구현시작  
-흐름
주문 -> 모아서 배달방만들기->배달선택->배달시작  
이지만 >배달선택->배달시작 먼저 구현  

2022-02-02~2022-02-03  
몸살이 심해서 작업 못함  

2022-02-04  
1.nextTick 이용해 생성되면 접근가능  
-컴포넌트 or 태그가 생성 되었을때 접근 할 수있는 함수이다 vue 짱이다  

2022-02-07  
1.배달 목록 구현중  
-페이징/기간별 검색  

2022-02-09  
1.영업상태변경 추가  
2.전단지 등록+상품 등록시작  
-가장 고비가 될 페이지같다 
1.구글 ocr이용해 글자를추출해준다  
2.가맹점에서 상품을 등록한다  

병합시도/병합성공  

0.1.0 생성  

2022-02-11  
1.배달 카테고리 세분화  
-배달 state로 구별  
2.javascript:void();  
-사용시 # 없이 이동가능  꿀팁이다  
3.상품등록 기능 구현시작  

2022-02-14  
1.전단리스트페이지 구현시작  

2022-02-15  
1.페이징 로직 리팩토링  
-url적극 활용  