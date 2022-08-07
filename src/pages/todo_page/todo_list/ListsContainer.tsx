import axios from "axios";
import React from "react";

interface IListsContainer {
  idToken: string;
}

const ListsContainer = ({
  idToken
}: IListsContainer) => {

  const onLoadTodos = async () => {
    const url = "http://localhost:8080/todos"
    const config = {
      headers: {
        Authorization: idToken
      }
    }
    try {
      const res = await axios.get(url, config);
      console.log("가져온 투두 목록", res.data)
    } catch (e) {
      console.log(e, "에러")
    }
  }

  React.useEffect(() => {
    onLoadTodos()
  }, [])
  


  return(
    <>
    </>
  )
}

export default ListsContainer;