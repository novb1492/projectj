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
