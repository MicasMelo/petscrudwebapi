import React, { useState } from "react";
import Login from "./Login";
import CadastroAnimais from "./Cadastro"; // seu código original pode ir aqui

function App() {
  const [autenticado, setAutenticado] = useState(!!localStorage.getItem("token"));

  const handleLogin = () => {
    setAutenticado(true);
  };

  return (
    <>
      {autenticado ? <CadastroAnimais /> : <Login onLogin={handleLogin} />}
    </>
  );
}

export default App;
