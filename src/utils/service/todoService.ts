import axios from "axios";
import { ITodo } from "../dataType";

class TodoService {

  private idToken: string | null;

  constructor() {
    this.idToken = null;
  }

  setIdToken (_idToken: string | null) {
    this.idToken = _idToken;
  }

  getIdToken (_idToken: string | null) {
    return this.idToken
  }


  // todos 가져오기
  async getTodos (): Promise<ITodo[] | null> {
    const url = "http://localhost:8080/todos"
    const config = {
      headers: {
        Authorization: this.idToken as string
      }
    }
    try {
      const res = await axios.get(url, config);
      return res.data.data as ITodo[]
    } catch (e) {
      console.log(e, "에러")
      return null
    }
  }


  // todo 추가
  async createTodo (inputTitle: string, inputContent: string): Promise<ITodo | null>  {
    const url = "http://localhost:8080/todos"
    const params = { title: inputTitle, content: inputContent }
    const config = {
      headers: {
        Authorization: this.idToken as string
      }
    }
    try {
      const res = await axios.post(url, params, config);
      return res.data.data as ITodo
      // setTodos([...todos, res.data.data])
    } catch (e) {
      console.log(e)
      alert("알 수 없는 오류로 실패하였습니다.")
      return null
    }
  }


  // todo 수정
  async updateTodo (inputTitle: string, inputContent: string, editTodo: ITodo): Promise<ITodo | null>  {
    const url = `http://localhost:8080/todos/${editTodo.id}`
    const params = { title: inputTitle, content: inputContent }
    const config = {
      headers: {
        Authorization: this.idToken as string
      }
    }
    try {
      const res = await axios.put(url, params, config);
      return res.data.data as ITodo
    } catch (e) {
      console.log(e)
      alert("알 수 없는 오류로 실패하였습니다.")
      return null
    }
  }


  // todo 삭제
  async deleteTodo (todo: ITodo) {
    const targetId = todo.id;
    const url = `http://localhost:8080/todos/${targetId}`
    const config = {
      headers: {
        Authorization: this.idToken as string
      },
    }
    try {
      const res = await axios.delete(url, config);
      return res.data
    } catch (e) {
      console.log(e, "에러")
    }
  }
}

export default TodoService;