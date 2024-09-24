import { useState } from "react";
import { useAuth } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";

import { api } from "../../services/api";

import avatarPlaceholder from "../../assets/avatar_placeholder.svg";

import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from "react-icons/fi";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Container, Form, Avatar } from "./styles";

export function Profile() {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user.name); // valor inicial renderizado
  const [email, setEmail] = useState(user.email);
  const [passwordOld, setPasswordOld] = useState();
  const [passwordNew, setPasswordNew] = useState();

  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;

  const [avatar, setAvatar] = useState(avatarUrl); // se usuário já tiver avatar, será carregado aqui
  const [avatarFile, setAvatarFile] = useState(null); // carregar nova imagem selecionada pelo usuário

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  async function handleUpdate() {

    if (email === "") {
      alert("E-mail precisa ser informado!")
      return
    }

    const updated = {
      name,
      email,
      old_password: passwordOld,
      password: passwordNew,
    }

    const userUpdated = Object.assign(user, updated)
    console.log(userUpdated)

    await updateProfile({ user: userUpdated, avatarFile })
  }

  async function handleChangeAvatar(event) {
    const file = event.target.files[0];
    setAvatarFile(file);

    const imagePreview = URL.createObjectURL(file);
    setAvatar(imagePreview);
  }

  return (
    <Container>

      <header>
        <button 
          type="button"
          onClick={handleBack}
        >
          <FiArrowLeft />
        </button>
      </header>

      <Form>
        <Avatar>
          <img src={avatar} alt="Foto do usuário" />

          <label htmlFor="avatar">
            <FiCamera />
            <input id="avatar" type="file" onChange={handleChangeAvatar} />
          </label>
        </Avatar>

        <Input
          placeholder={"Nome"}
          type={"text"}
          icon={FiUser}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          placeholder={"E-mail"}
          type={"text"}
          icon={FiMail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder={"Senha atual"}
          type={"password"}
          icon={FiLock}
          onChange={(e) => setPasswordOld(e.target.value)}
        />

        <Input
          placeholder={"Nova senha"}
          type={"password"}
          icon={FiLock}
          onChange={(e) => setPasswordNew(e.target.value)}
        />

        <Button title={"Salvar"} onClick={handleUpdate} />

      </Form>

    </Container>
  )
}