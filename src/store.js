// 전역 상태 관리 유저저

// 1. 초기 상태
const initialState = {
  isLogin: false,
  jwt: "",
};

// 2. 리듀서(reducer - )

// const reducer(state = initialState, action){};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        isLogin: true,
        jwt: action.jwt,
      };
    case "LOGOUT":
      return {
        isLogin: false,
        jwt: "",
      };
    default:
      return state;
  }
};

// 3. 액션
export function login(jwt) {
  return {
    type: "LOGIN",
    jwt: jwt,
  };
}

// export function logout(jwt) {
export function logout() {
  // localStorage.removeItem("jwt"); 이렇게 해도 되지만 SRP에 위배된다.
  return {
    type: "LOGOUT",
  };
}

export default reducer;
