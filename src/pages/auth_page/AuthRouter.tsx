import React, { useState } from "react";

import CreateContainer from "./auth_create/CreateContainer";
import LoginContainer from "./auth_login/LoginContainer";

interface IAuthRouter {
  idToken: string | null;
  setIdToken: (v: string | null) => void;
}


const AuthRouter = ( {
  idToken,
  setIdToken
}: IAuthRouter ) => {

  const [isOpenCreatePopup, setIsOpenCreatePopup] = useState(false)


  return(
  <>
    <LoginContainer 
      setIsOpenCreatePopup={setIsOpenCreatePopup}
      setIdToken={setIdToken}
    />

    { isOpenCreatePopup &&
      <CreateContainer 
        setIsOpenCreatePopup={setIsOpenCreatePopup}
        setIdToken={setIdToken}
      />
    }
  </>)
}

export default AuthRouter;