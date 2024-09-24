import { Container } from "./styles"

export function Section({ title, children }) {
  return (
    <Container>
      <h2>{title}</h2>
      {
      /*
      O children captura os filhos dentro da tag do container.
      Ex.: <Section>...</Section>
      */
      }
      {children}
    </Container>
  )
}