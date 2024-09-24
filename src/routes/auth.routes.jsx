import { Routes, Route, Navigate } from "react-router-dom";

import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";

export function AuthRoutes() {

  // pegando o usuário no localStorage
  const user = localStorage.getItem("@notes:user");

  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />

      {
        /* 
          Rota de  Fallback | Em lógica de programação... entender como Else
          Caso nenhuma das rotas acima seja atendida, então redirecione
          para rota abaixo
        */
      }
      {!user && <Route path="*" element={<Navigate to={"/"}/>} />}
    </Routes>
  )
}