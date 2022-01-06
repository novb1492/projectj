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
검색기능추가  