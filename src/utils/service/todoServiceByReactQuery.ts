import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ITodo } from "../types/dataType";


/**
 * @class
 * @async
 * <T> generic 형태로 메서드 리턴문 분리
 * 
 * React Query 와 함께 사용목적으로 axios문 자체를 return 하도록 변경 
 */
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
  
  /**
   * Getter idToken
   * @returns 
   */
  getIdToken () {
    return this.idToken
  }
  
  /**
   * Setter idToken
   * @param _idToken 
   */
  setIdToken (_idToken: string | null) {
    this.idToken = _idToken;
  }

  /**
   * Todos 목록 가져오기
   * @returns await axios.get(this.baseUrl, this.config);
   */
  async getTodos <T>(): Promise<AxiosResponse<{data: T}>| null>   {
    try {
      return await axios.get(this.baseUrl, this.config);
    } catch (e) {
      console.log(e, "에러")
      return null
    }
  }

  /**
   * Todos 추가
   * @param inputTitle 
   * @param inputContent 
   * @returns await axios.post(this.baseUrl, params, this.config)
   */
  async createTodo <T>(inputTitle: string, inputContent: string): Promise<AxiosResponse<T>| null>   {
    const params = { title: inputTitle, content: inputContent }
    try {
      return await axios.post(this.baseUrl, params, this.config );
    } catch (e) {
      console.log(e)
      alert("알 수 없는 오류로 실패하였습니다.")
      return null
    }
  }

  /**
   * Todo 수정
   * @param inputTitle 
   * @param inputContent 
   * @param editTodo 변경할 대상 
   * @returns await axios.put(this.baseUrl + editTodo.id, params, this.config );
   */
  async updateTodo <T>(inputTitle: string, inputContent: string, editTodo: ITodo): Promise<AxiosResponse<T>| null>   {
    const params = { title: inputTitle, content: inputContent }
    try {
      return await axios.put(this.baseUrl + editTodo.id, params, this.config );
    } catch (e) {
      console.log(e)
      alert("알 수 없는 오류로 실패하였습니다.")
      return null
    }
  }


  /**
   * Todo 삭제
   * @param todo 삭제할 대상
   * @returns await axios.delete(this.baseUrl + todo.id, this.config );
   */
  async deleteTodo (todo: ITodo) {
    try {
      return await axios.delete(this.baseUrl + todo.id, this.config );
    } catch (e) {
      console.log(e, "에러")
    }
  }
}

export default TodoServiceByReactQuery;