import React, { useState } from "react";

import CreateContainer from "./auth_create/CreateContainer";
import LoginContainer from "./auth_login/LoginContainer";

interface IAuthRouter {
  
}


const AuthRouter = ( {

}: IAuthRouter ) => {

  const [isOpenCreatePopup, setIsOpenCreatePopup] = useState(false)


  return(
  <>
    <LoginContainer 
      setIsOpenCreatePopup={setIsOpenCreatePopup}
    />

    { isOpenCreatePopup &&
      <CreateContainer 
        setIsOpenCreatePopup={setIsOpenCreatePopup}
      />
    }
  </>)
}

export default AuthRouter;