import Travel from "./pages/Travel";
import React, { useState, useEffect } from "react";
import { SignUp, Login, Homepage } from "./authInOut/index";
import { Routes, Route } from "react-router-dom";
import "./main.scss";
const App = () => {
  const [token, setToken] = useState(false);

  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
    //console.log(token.user.email);
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      let data = JSON.parse(sessionStorage.getItem("token"));
      setToken(data);
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path={"/signup"} element={<SignUp />} />
        <Route path={"/"} element={<Login setToken={setToken} />} />
        {token ? (
          <Route path={"/homepage"} element={<Homepage token={token} />} />
        ) : (
          ""
        )}
      </Routes>
    </div>
  );
};

export default App;
