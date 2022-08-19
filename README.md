# 원티드 프리온보딩 챌린지 프론트엔드 코스 최종 과제


## 실제 구현 화면

<br>

여기 움짤로 삽입

 

## 사용한 패키지 (라이브러리)

- `React.js`
- `TypeScript`
- `styled-components` <br>
  : 작은 단위의 컴포넌트 설계를 용이하게 하기 위함
- `axios` <br>
  : fetch API 보다 더 나은 가독성 및 사용성
- `yarn` <br>
  : 패키지 install시, 호환되는 버전을 선택하여 설치해줌
  

<br>

## 폴더 구조

![image](https://user-images.githubusercontent.com/82368684/183444209-11b390ef-7a6e-4811-9826-1abbe761a518.png)

|name|desc|
|------|---|
|components| 공용 컴포넌트 모음입니다.
|pages| 각 router가 나눠지는 페이지 별로 폴더를 나눕니다.<br> page안에선 컴포넌트별로 추가로 나눕니다.
|styles| styled-component를 이용한 기본 및 공용 스타일을 정의합니다
|utils | axios를 이용한 api 통신 서비스 및 공용 타입을 정의합니다. 

<br>

## 시작하기

`yarn start `
<br>

해당 명령어 입력시 http://localhost:3000 으로 실행됩니다. <br>
server와 따로 실행해줘야 합니다.

<br>

## 구현 사항

### 1. 0주차 기능구현
- Auth Page 구현 완료
1. Login Page는 /auth Router에 구현함
2. join(회원가입) ui 는 팝업 기능으로 구현
3. email / pw의 입력 환경에 따라 로그인 / 가입버튼의 disabled 처리
- Todo Page 구현 완료
1. 기본 TODO CRUD 구현 완료
2. 현재 선택한 Todo 항목을 `localStorage`에 저장, 재접속하여도 유지기능


<br>

### 2. 1.1 주차 Type Script 작성
- 기존 프로젝트 또한 Type Script 작성
- api 호출 로직의 generic 문법 활용

<br>

### 2. 1.2 주차 React Query 구현
- `index.ts`(최상위 파일)에서 생성한 clientQuery Props drilling 형태로 하위 컴포넌트 전달, 사용
- todo를 불러오는 컴포넌트에서 `useQuery` 사용, 반환받은 data를 직접적으로 화면에 출력
- add / edit / delete 로직 시, `useMutation` 사용, 성공시 `queryClient.invalidateQueries(GET_TODOS)` 사용하여 todos 최신화

<br>

## 과제 진행 시 주안점


### 1. React Query 공식문서의 해석과 사용방법
처음 접하는 기술이었기에 사용법을 익히는 점이 가장 중요했다. <br>
지금에서야 조금 눈에 보이지만, 나 또한 해당 공식문서가 굉장히 불친절하다고 느꼈다.<br>
React Query 항목에는 아무것도 없었으며 <br>
Quick Start 항목 또한 몇 가지 케이스만 있었을 뿐, 제대로 된 설명이 없었고 <br>
직접 하나 하나 검색하거나 찾아가며 각 메서드의 사용법을 익혀야 되었기 때문이다.
<br><br>
그러나 다행히 현재 꽤 각광받는 기술답게 사용법을 국문으로 소개해주신 블로그들이 많이 있어, 그래도 처음을 시작할 수 있었다. <br>
아직 여러 메서드의 활용방법을 몰라, `useQuery`의 사용과 `useMutation`의 사용, 그 외에 `clientQuery` 일부 옵션밖에 모르지만 사용 목적과 일부 방법에 대해서는 익힐 수 있었다.

<br>

### 2. React Qeury 더 모던하게 사용하기
React Query 적용 덕에 관리해야 할 상태도 줄고, 전체적으로 코드도 꽤 짧아졌다. <br>
그러나 어느 부분에서, 어떤 구조로, 어떤 로직을 분리하여 코드를 짜야 될 지 잘 몰랐고, 이 때문에 몇 가지 구현하지 못한 부분이 생겼다. <br>
(아래 한계점 및 개선사항 에서 계속)

<br>

## 한계점 및 개선사항 

1. `QueryClient` 관리 <br>
  이 부분은 index.js에서 생성한 `QueryClient`를 props drilling으로 하위로 전달해주는 과정에서, 더 쉽게 사용할 수 없을까? 라고 고민하게 되었다. <br>
  물론 이 방법으로 작성하지 않을때, `queryClient.invalidateQueries` 가 제대로 동작하지 않아, 해당 방법을 사용하였다. <br>
  많은 참고 자료를 찾아보았으나, 대부분 1개의 파일 내에서 사용하는 예제가 많다보니 제대로 된 레퍼런스를 찾을 수 없었다.

2. `useQuery` 결과 참조 오류 <br>
  `useQuery`로 불러온 함수의 return type을 `{data: T}` 의 형태로 하지 않으면 오류가 발생한다.
  
  |API 로직|hooks 사용부분|결과|
  |------|---|-----|
  |`async getTodos <T>(): Promise<AxiosResponse<{data: T}>` | data && data.data.data.map(todo => | 에러 X |
  |`async getTodos <T>(): Promise<AxiosResponse<T>` |data && data.data.map(todo =>| Uncaught TypeError: data.data.map is not a function

3. `useMutation`의 선언과 사용 <br>
`useMutation` 또한 hooks 형태이기 때문에 일반 함수 내부에서 선언이 어렵다. <br>
`useMutation` 을 외부로 분리하여 사용하는 부분 또한 hooks가 불필요하게 중첩된다고 생각한다. 
그럼, 해당 부분을 어떻게 사용해아 읽고 쓰기 쉽게 작성할 수 있을까?
<br>

![image](https://user-images.githubusercontent.com/82368684/185665750-4cf78f25-a4a1-4497-a7fe-f26dbf1191b6.png)

