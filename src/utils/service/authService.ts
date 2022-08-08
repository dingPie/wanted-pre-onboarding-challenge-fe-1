import axios from "axios";


class AuthService {
  async login ( inputEmail: string, inputPw: string ): Promise<string | null>  {
    const url = "http://localhost:8080/users/login"
    const params = { email: inputEmail, password: inputPw }
    try {
      const res = await axios.post(url, params );
      localStorage.setItem("idToken", res.data.token);
      return res.data.token
    } catch (e) {
      alert("아이디 / 비밀번호가 잘못되었습니다.")
      return null
    }
  }

  async signUp ( inputEmail: string, inputPw: string ): Promise<string | null>  {
    const url = "http://localhost:8080/users/create"
    const params = { email: inputEmail, password: inputPw }
    try {
      const res = await axios.post(url, params )
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
