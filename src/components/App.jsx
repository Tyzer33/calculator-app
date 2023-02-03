import styled from 'styled-components'
import Header from './Header'
import Screen from './Screen'
import Keypad from './Keypad'

const Container = styled.main`
  display: flex;
  flex-direction: column;
  min-width: 100vw;
  min-height: 100vh;
  background: ${(props) => props.theme.mainBackground};
  gap: 1.5rem;
  padding: 2rem 1.5rem;
`

export default function App() {
  return (
    <Container>
      <Header />
      <Screen />
      <Keypad />
    </Container>
  )
}
