import { Container } from "./styles";

export function ButtonText({ title, isActive = false, ...rest }) {
  return (
    // Qualquer tipo de propriedade de button pode ser passada pelo ...rest
    <Container
      type="button"
      $isactive={isActive}
      {...rest}
    >
      {title}
    </Container>
  )
}