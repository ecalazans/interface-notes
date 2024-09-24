import { createContext, useContext, useState, useEffect } from "react";

import { api } from "../services/api";

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [data, setData] = useState({});

  async function signIn({ email, password }) {
    try {
      const response = await api.post("/sessions", { email, password });
      const { user, token } = response.data;

      localStorage.setItem("@notes:user", JSON.stringify(user));
      localStorage.setItem("@notes:token", token);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setData({ user, token });

    } catch (error) {
      if (error.response) {
        alert(error.response.data.message); // mensagem personalizada do backend
      } else {
        alert("Não foi possível entrar."); // erro por outro motivo que não msg do backend
      }
    }
  }

  function signOut() {
    localStorage.removeItem("@notes:token");
    localStorage.removeItem("@notes:user");

    setData({});
  }

  async function updateProfile({ user, avatarFile }) {
    try {

      if(avatarFile){
        const fileUploadForm = new FormData();
        fileUploadForm.append("avatar", avatarFile) // semelhante ação feita no insominia -> multiform data...

        const response = await api.patch("/users/avatar", fileUploadForm);
        // atribuindo o avatar no user que chega pelo parâmetro
        user.avatar = response.data.avatar;
      }

      await api.put("/users", user)
      localStorage.setItem("@notes:user", JSON.stringify(user));

      setData({ user, token: data.token })

      alert("Perfil atualizado!");

    } catch (error) {
      if (error.response) {
        alert(error.response.data.message); // mensagem personalizada do backend
      } else {
        alert("Não foi possível atualizar o perfil."); // erro por outro motivo que não msg do backend
      }
    }
  }

  // função que sempre recarrega após a renderização do componente
  // não precisa necessariamente estar ligada a um estado, ex: [data, setData]
  useEffect(() => {
    const token = localStorage.getItem("@notes:token");
    const user = localStorage.getItem("@notes:user");

    if (token && user) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setData({ token, user: JSON.parse(user) });
    }

  }, []);

  return (
    // Provendo os contextos para o children, que no caso serão as rotas
    <AuthContext.Provider value={{
      signIn,
      user: data.user,
      signOut,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
