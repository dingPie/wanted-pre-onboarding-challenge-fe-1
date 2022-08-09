import axios from "axios";


class AuthService {

  private baseUrl: string;
  
  constructor() {
    this.baseUrl = "http://localhost:8080/users/"
  }
  

  // 로그인
  async login ( inputEmail: string, inputPw: string ): Promise<string | null>  {
    const params = { email: inputEmail, password: inputPw }

    try {
      const res = await axios.post(this.baseUrl + "login", params );
      localStorage.setItem("idToken", res.data.token);
      return res.data.token
    } catch (e) {
      alert("아이디 / 비밀번호가 잘못되었습니다.")
      return null
    }
  }


  // 회원가입
  async signUp ( inputEmail: string, inputPw: string ): Promise<string | null>  {
    const params = { email: inputEmail, password: inputPw }

    try {
      const res = await axios.post(this.baseUrl + "create", params )
      localStorage.setItem("idToken", res.data.token);
      alert(res.data.message)
      return res.data.token
    } catch (e) {
      alert("이미 가입된 아이디가 있습니다.")
      return null
    }
  }

}

export default AuthService;
