import { useState } from "react";

import { api } from "../../services/api";

import { useNavigate } from "react-router-dom";

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { NoteItem } from "../../components/NoteItem";
import { Section } from "../../components/Section";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";

import { Container, Form } from "./styles";

export function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [links, setLinks] = useState([]); // guarda todos os links
  const [newLink, setNewLink] = useState(""); // link que vai ser adicionado no momento

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  function handleAddLink() {
    // prevState -> acessa as informações que tinham antes no array + novo link
    setLinks(prevState => [...prevState, newLink]);
    setNewLink("");
  }

  // usamos a palavra handle em concequência a ação de um usuário
  function handleRemoveLink(deleted) {
    // criando um novo array, removendo o link selecionado
    setLinks(prevState => prevState.filter(link => link !== deleted));
  }

  function handleAddTag() {
    setTags(prevState => [...prevState, newTag]);
    setNewTag(""); // limpando o input para não ficar com o último valor digitado
  }

  function handleRemoveTag(deleted) {
    setTags(prevState => prevState.filter(tag => tag !== deleted))
  }

  async function handleNewNote() {
    // validando inputs não adicionados
    if(!title) {
      return alert("Digite o título da nota");
    }

    if(newLink) {
      return alert("Você deixou um link no campo, é preciso adicioná-lo");
    }

    if(newTag) {
      return alert("Você deixou uma tag no campo, é preciso adicioná-la");
    }

    await api.post("/notes", {
      title,
      description,
      tags,
      links,
    })

    alert("Nota criada com sucesso!");
    navigate(-1) // retorna para rota de navegação anterior
  }

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText 
              title={"Voltar"}
              onClick={handleBack}
            />
          </header>

          <Input
            placeholder={"Título"}
            onChange={e => setTitle(e.target.value)}
          />
          <Textarea 
            placeholder={"Observações"} 
            onChange={e => setDescription(e.target.value)}
          />

          <Section title={"Links úteis"}>
            {
              links.map((link, index) => (
                <NoteItem
                  key={String(index)}
                  value={link}
                  // quando temos parâmetros na função, passamos ela dentro do
                  // onClick como arrow function, caso contrário ela ficará 
                  // tentando execultar sozinha
                  onClick={() => handleRemoveLink(link)}
                />
              ))
            }
            <NoteItem
              isNew
              placeholder={"Novo link"}
              value={newLink}
              onChange={e => setNewLink(e.target.value)}
              onClick={handleAddLink}
            />
          </Section>

          <Section title={"Marcadores"}>
            <div className="tags">
              {
                tags.map((tag, index) => (
                  <NoteItem
                    key={String(index)}
                    value={tag}
                    onClick={() => handleRemoveTag(tag)}
                  />
                ))
              }

              <NoteItem
                isNew
                placeholder={"Nova tag"}
                onChange={e => setNewTag(e.target.value)}
                value={newTag}
                onClick={handleAddTag}
              />
            </div>
          </Section>

          <Button 
            title={"Salvar"} 
            onClick={handleNewNote}
          />
        </Form>
      </main>
    </Container>
  )
}