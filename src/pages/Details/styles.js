import styled from "styled-components";

export const Container = styled.div`
  width: 100%; // Conteúdo ocupe 100% da tela
  height: 100vh; // Conteúdo ocupe 100% da altura

  display: grid;
  // Definindo altura das linhas da tela para cada seção... ex: header/menu/footer
  grid-template-rows: 105px auto;
  // Nomeando as linhas
  grid-template-areas: 
  "header"
  "content";

  > main {
    grid-area: content;
    overflow-y: scroll; // Quando conteúdo não couber mais na vertical, adicionar barra de scroll

    padding: 64px 0;
  }
`;

export const Links = styled.ul`
  list-style: none;

  > li {
    margin-top: 12px;

    a {
      color: ${({theme}) => theme.COLORS.WHITE};
    }
  }
`;

export const Content = styled.div`
  max-width: 550px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;

  > button:first-child {
    align-self: end;
  }

  > h1 {
    font-size: 36px;
    font-weight: 500;

    padding-top: 64px;
  }

  > p {
    font-size: 16px;
    margin-top: 16px;

    text-align: justify;
  }

`;