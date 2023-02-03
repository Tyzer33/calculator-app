import { useContext } from 'react'
import styled from 'styled-components'
import { CalculContext } from '../context/CalculContext'

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 5.625rem;
  padding: 0 1.5rem;
  font-size: 2.1875rem;
  background: ${(props) => props.theme.screenBackground};
  color: ${(props) => props.theme.screenText};
  border-radius: 10px;
`

export default function Screen() {
  const { onScreen } = useContext(CalculContext)

  return <Container>{onScreen()}</Container>
}
