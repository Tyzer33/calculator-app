import { useContext } from 'react'
import styled, { css } from 'styled-components'
import { tabletLandscape } from '../breakpoints'
import { CalculContext } from '../context/CalculContext'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 5.625rem;
  padding: 0 1.5rem;
  font-size: 2.1875rem;
  background: ${(props) => props.theme.screenBackground};
  color: ${(props) => props.theme.screenText};
  border-radius: 10px;
  overflow: hidden;

  ${tabletLandscape(css`
    height: 8rem;
    font-size: 3.5rem;
  `)}
`

const Display = styled.span`
  white-space: nowrap;
`
const Placeholder = styled(Display)`
  opacity: 0.5;
`

export default function Screen() {
  const { toDisplay } = useContext(CalculContext)

  return (
    <Container>
      {toDisplay() === undefined ? (
        <Placeholder>0</Placeholder>
      ) : (
        <Display>{toDisplay()}</Display>
      )}
    </Container>
  )
}
