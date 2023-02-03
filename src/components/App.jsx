import styled, { css } from 'styled-components'
import { tabletLandscape } from '../breakpoints'
import Header from './Header'
import Screen from './Screen'
import Keypad from './Keypad'

const Body = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100vw;
  min-height: 100vh;
  background: ${(props) => props.theme.mainBackground};
  padding: 2rem 1.5rem;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 20.4375rem;

  ${tabletLandscape(
    css`
      max-width: 33.75rem;
    `
  )}
`

export default function App() {
  return (
    <Body>
      <Container>
        <Header />
        <Screen />
        <Keypad />
      </Container>
    </Body>
  )
}
