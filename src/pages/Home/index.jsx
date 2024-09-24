import { FiPlus, FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Container, Brand, Menu, Search, Content, NewNote } from "./styles";

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { ButtonText } from "../../components/ButtonText";
import { Section } from "../../components/Section";
import { Note } from "../../components/Note";
import { api } from "../../services/api";

export function Home() {
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]);
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();

  function handleTagSelected(tagName) {
    // console.log(tagName)
    if (tagName === "all") {
      return setTagsSelected([]);
    }

    const alreadySelected = tagsSelected.includes(tagName)

    if (alreadySelected) {
      // caso tag já selecionada, então criar novo array sem a tag selecionada
      const filteredTags = tagsSelected.filter(tag => tag !== tagName)
      setTagsSelected(filteredTags)

    } else {
      // caso tag não esteja selecionada, então adicione ela no array
      setTagsSelected(prevState => [...prevState, tagName])
    }
  }

  function handleDetails(id) {
    navigate(`/details/${id}`);
  }

  // carrega as tags na barra lateral da página sempre que a tela for renderizada
  useEffect(() => {
    // É possível criar uma função async que somente será executada dentro do useEffect
    async function facthTags() {
      const response = await api.get("/tags");
      // console.log(response.data);
      setTags(response.data);
    }

    facthTags();
  }, [])

  // dependencia para re renderização do componente serão os estados de:
  // tagsSelected e o search
  useEffect(() => {
    async function fetNotes() {
      const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`)
      setNotes(response.data);
      // console.log(response)
    }

    fetNotes();
  }, [tagsSelected, search])

  return (
    <Container>
      <Brand>
        <h1>Notes</h1>
      </Brand>

      <Header />

      <Menu>
        <li>
          <ButtonText
            title={"Todos"}
            onClick={() => handleTagSelected("all")}
            isActive={tagsSelected.length === 0}
          />
        </li>
        {
          tags && tags.map(tag => (
            <li key={String(tag.id)}>
              <ButtonText
                title={tag.name}
                onClick={() => handleTagSelected(tag.name)}
                isActive={tagsSelected.includes(tag.name)} //metodo includes retorna verdadeiro caso o valor seja encontrado dentro do array
              />
            </li>
          ))
        }
      </Menu>

      <Search>
        <Input
          icon={FiSearch}
          placeholder={"Pesquisar pelo título"}
          onChange={e => setSearch(e.target.value)}
        />
      </Search>

      <Content>
        <Section title={"Minhas notas"}>
          {
            notes.map((note) => (
              <Note
                key={String(note.id)}
                data={note}
                onClick={() => handleDetails(note.id)}
              />
            ))
          }
        </Section>
      </Content>

      <NewNote to={"/new"}>
        <FiPlus />
        Criar nota
      </NewNote>

    </Container>
  )
}