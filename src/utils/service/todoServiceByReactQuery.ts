import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ITodo } from "../types/dataType";

class TodoServiceByReactQuery {

  private idToken: string | null;
  private baseUrl: string;
  private config: AxiosRequestConfig;
  
  constructor() {
    this.idToken = "default";
    this.baseUrl = "http://localhost:8080/todos/"
    this.config = {
      headers: {
        Authorization: this.idToken as unknown as string
      }
    }
  }
  
  // idToken getter setter 
  setIdToken (_idToken: string | null) {
    this.idToken = _idToken;
  }

  getIdToken () {
    return this.idToken
  }


  // todos 가져오기
  async getTodos <T>(): Promise<AxiosResponse<{data: T}>| null>   {
    try {
      console.log(this.baseUrl, this.config)
      return await axios.get(this.baseUrl, this.config );
    } catch (e) {
      console.log(e, "에러")
      return null
    }
  }


  // todo 추가
  async createTodo <T>(inputTitle: string, inputContent: string): Promise<AxiosResponse<T>| null>  {
    const params = { title: inputTitle, content: inputContent }

    try {
      return await axios.post(this.baseUrl, params, this.config );
    } catch (e) {
      console.log(e)
      alert("알 수 없는 오류로 실패하였습니다.")
      return null
    }
  }


  // todo 수정
  async updateTodo <T>(inputTitle: string, inputContent: string, editTodo: ITodo): Promise<AxiosResponse<T>| null>  {
    const params = { title: inputTitle, content: inputContent }
    try {
      return await axios.put(this.baseUrl + editTodo.id, params, this.config );
    } catch (e) {
      console.log(e)
      alert("알 수 없는 오류로 실패하였습니다.")
      return null
    }
  }


  // todo 삭제
  async deleteTodo (todo: ITodo) {
    try {
      return await axios.delete(this.baseUrl + todo.id, this.config );
    } catch (e) {
      console.log(e, "에러")
    }
  }
}

export default TodoServiceByReactQuery;