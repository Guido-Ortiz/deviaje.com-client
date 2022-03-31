import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import bootstrap from 'bootstrap'

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button type="button" class="btn btn-outline-secondary" onClick={() => loginWithRedirect()}>Log In</button>
};

export default LoginButton;




