import styled, { css } from 'styled-components'
import { tabletLandscape } from '../breakpoints'
import ThemeSwitchButton from './ThemeSwitchButton'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${tabletLandscape(css`
    margin-bottom: 8px;
  `)}
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
