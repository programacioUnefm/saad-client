import React, { useEffect, useState } from "react";
import "../login.css";
import { LoginForm } from "../components/LoginForm";
import logo from "/saad-logo.svg";
import reversed from "/saad-reversed.svg";
import background from "/loginBack.png";
import backReversed from "/loginBackReversed.png";
import laptop from "/laptop.svg";
import { useSelector } from "react-redux";
import { RegisterForm } from "../components/RegisterForm";
import { PasswordForgot } from "../components/PasswordForgot";
import { Toaster } from "../../components/ui/toaster";
import { useToast } from "../../components/ui/use-toast";

export const LoginPage = () => {
  const { theme, dialog } = useSelector((state) => state.ui);
  const [loginState, setloginState] = useState("login"); // si es false es login y si es true es register
  const { toast } = useToast();
  useEffect(() => {
    dialog.status &&
      toast({
        variant: "destructive",
        title: dialog.message,
      });
  }, [dialog]);

  const toggleAcction = () => {
    if (loginState === "login") {
      setloginState("register");
    } else {
      setloginState("login");
    }
  };

  const estilo = {
    backgroundImage: `url(${theme == "dark" ? backReversed : background})`,
    backgroundSize: "cover",
    width: "60vw",
    height: "100vh",
  };

  return (
    <div className="flex">
      <div className="right">
        <div className="flex justify-center mb-4">
          <img
            className="logo"
            src={theme == "dark" ? reversed : logo}
            alt="sadd-logo"
          />
        </div>
        {loginState == "login" ? (
          <LoginForm setloginState={setloginState} />
        ) : loginState == "register" ? (
          <RegisterForm />
        ) : (
          <PasswordForgot />
        )}
        {/* <div className="sign-in">
          <div className="content">
            <span>
              {loginState == "register"
                ? "¿Crees que posees una cuenta?"
                : loginState == "login"
                ? "No posees una cuenta aún"
                : "¿Te equivocaste?"}
              <span
                className="text-blue-500 font-medium hover:text-blue-300 ml-2 cursor-pointer"
                onClick={() => toggleAcction()}
              >
                {loginState == "register"
                  ? "inicia sesión"
                  : loginState == "login"
                  ? "create una ahora"
                  : "volver inicio de sesión"}
              </span>
            </span>
          </div>
        </div> */}
      </div>
      <div style={estilo} className="hidden  lg:block">
        <div className="flex flex-col justify-center items-center h-full px-36">
          <img src={laptop} alt="" />
          <h2 className="text-xl my-5 mt-10 text-white font-semibold">
            Sistema adminisitrativo SAAD
          </h2>
          <p className="text-center text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem optio asperiores enim, earum sit quo excepturi, illo
            voluptatum, nesciunt dolores inventore.
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
};
