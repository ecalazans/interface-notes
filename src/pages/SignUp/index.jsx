import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "../../services/api";

import { Container, Form } from "./styles";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export function SignUp() {
  // nome do estado e função que vai atualizar o estado
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // O then pode ser utilizado como alternativa ao async await
  function handleSignUp() {
    if (!name || !email || !password) {
      return alert("Preencha todos os campos!")
    }

    api.post("users", { name, email, password })
      .then(() => {
        alert("Usuário cadastrado com sucesso!")
        navigate("/")
      })
      .catch(error => {
        if (error.response) {
          alert(error.response.data.message) // Mensagem do backend
        } else {
          alert("Não foi possível cadastrar") // Caso não seja erro no banco
        }
      })
  }

  return (
    <Container>
      <Form>
        <h1>Notes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis.</p>

        <h2>Crie sua conta</h2>

        <Input
          placeholder={"Nome"}
          type={"text"}
          icon={FiUser}
          onChange={e => setName(e.target.value)}
        />

        <Input
          placeholder={"E-mail"}
          type={"text"}
          icon={FiMail}
          onChange={e => setEmail(e.target.value)}
        />

        <Input
          placeholder={"Senha"}
          type={"password"}
          icon={FiLock}
          onChange={e => setPassword(e.target.value)}
        />

        <Button title={"Cadastrar"} onClick={handleSignUp} />

        <Link to={"/"}>Voltar para o login</Link>

      </Form>

    </Container>
  )
}