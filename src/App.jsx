import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Shared from "./components/Shared";
import About from "./components/About";
import Home from "./components/Home";
import CollectionState from "./context/collection/CollectionState";
import LoginState from "./context/userlogin/LoginState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbottom from "./components/Navbottom";

function App() {
  const [authPending, setAuthPending] = useState(true);
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="scrollbar-hide">
      <div className="overflow-y-scroll overflow-x-hidden scrollbar-hide flex flex-col justify-between min-h-screen">
        <LoginState>
          <CollectionState>
            <Router>
              {authPending ? (
                isLogin ? (
                  <Login
                    setAuthPending={setAuthPending}
                    switchToSignup={() => setIsLogin(false)}
                  />
                ) : (
                  <Signup
                    setAuthPending={setAuthPending}
                    switchToLogin={() => setIsLogin(true)}
                  />
                )
              ) : (
                <>
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/shared" element={<Shared />} />
                  </Routes>
                </>
              )}
            </Router>
          </CollectionState>
        </LoginState>
        <Navbottom />
      </div>
    </div>
  );
}

export default App;
