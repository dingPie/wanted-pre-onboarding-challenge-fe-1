import axios, { AxiosRequestConfig } from "axios";
import { ITodo } from "../types/dataType";

/**
 * @class
 * todo CRUD service
 */
class TodoService {

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
  async getTodos (): Promise<ITodo[] | null> {
    try {
      const res = await axios.get(this.baseUrl, this.config );
      return res.data.data as ITodo[]
    } catch (e) {
      console.log(e, "에러")
      return null
    }
  }


  // todo 추가
  async createTodo (inputTitle: string, inputContent: string): Promise<ITodo | null>  {
    const params = { title: inputTitle, content: inputContent }

    try {
      const res = await axios.post(this.baseUrl, params, this.config );
      return res.data.data as ITodo
    } catch (e) {
      console.log(e)
      alert("알 수 없는 오류로 실패하였습니다.")
      return null
    }
  }


  // todo 수정
  async updateTodo (inputTitle: string, inputContent: string, editTodo: ITodo): Promise<ITodo | null>  {
    const params = { title: inputTitle, content: inputContent }
    try {
      const res = await axios.put(this.baseUrl + editTodo.id, params, this.config );
      return res.data.data as ITodo
    } catch (e) {
      console.log(e)
      alert("알 수 없는 오류로 실패하였습니다.")
      return null
    }
  }


  // todo 삭제
  async deleteTodo (todo: ITodo) {
    try {
      const res = await axios.delete(this.baseUrl + todo.id, this.config );
      return res.data
    } catch (e) {
      console.log(e, "에러")
    }
  }
}

export default TodoService;