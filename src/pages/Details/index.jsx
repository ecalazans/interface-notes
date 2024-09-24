import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom"; // buscar pelos parâmetros que existem na rota

import { Container, Links, Content } from "./styles";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Section } from "../../components/Section"
import { ButtonText } from "../../components/ButtonText";
import { Tag } from "../../components/Tag";

import { api } from "../../services/api";

export function Details() {
  const [data, setData] = useState(null);
  // console.log(data)

  const params = useParams();
  // console.log(params)

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1) // retorna para rota de navegação anterior
  }

  async function handleRemove() {
    const confirm = window.confirm("Deseja realmente remover a nota ?")

    if (confirm) {
      await api.delete(`/notes/${params.id}`)
      navigate(-1) // retorna para rota de navegação anterior
    }
  }

  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`/notes/${params.id}`);
      setData(response.data)
    }

    fetchNote();
  }, []);

  return (
    <Container>
      <Header />

      {
        data &&
        <main>
          <Content>
            <ButtonText
              title={"Excluir Nota"}
              onClick={handleRemove}
            />

            <h1>
              {data.title}
            </h1>

            <p>
              {data.description}
            </p>

            {
              data.links &&
              <Section title={"Links úteis"}>
                <Links>
                  {
                    data.links.map(link => (
                      <li key={String(link.id)}>
                        <a
                          href={link.url}
                          target="_blank"
                        >
                          {link.url}
                        </a>
                      </li>
                    ))
                  }
                </Links>
              </Section>
            }

            {
              data.tags &&
              <Section title={"Marcadores"}>
                {
                  data.tags.map(tag => (
                    <Tag
                      key={tag.id}
                      title={tag.name}
                    />
                  ))
                }
              </Section>
            }


            <Button
              title="Voltar"
              onClick={handleBack}
            />
          </Content>
        </main>
      }
    </Container>
  )
};