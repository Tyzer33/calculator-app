import styled from 'styled-components'
import ThemeSwitchButton from './ThemeSwitchButton'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.h1`
  margin-left: 0.5rem;
  color: ${(props) => props.theme.headerText};
`

export default function Header() {
  return (
    <Container>
      <Title>calc</Title>
      <ThemeSwitchButton />
    </Container>
  )
}
