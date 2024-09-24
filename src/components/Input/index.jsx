import { Container } from "./styles";

export function Input({ icon: Icon, ...rest }) {
  return (
    <Container>
      {/* Se existir Icon ele vai ser renderizado com size de 20 */}
      {Icon && <Icon size={20} />}
      <input {...rest} />
    </Container>
  )
}