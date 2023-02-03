import styled, { css } from 'styled-components'
import { tabletLandscape } from '../breakpoints'
import Key from './Key'

const Container = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
  grid: repeat(5, 3.75rem) / repeat(4, 3.75rem);
  gap: 1.0625rem 0.8125rem;
  padding: 1.5rem;
  background: ${(props) => props.theme.keypadBackground};
  border-radius: 10px;

  ${tabletLandscape(css`
    grid: repeat(5, 3.75rem) / repeat(4, 6.3125rem);
    gap: 1.75rem 1.5rem;
    padding: 2rem 1.875rem;
  `)}
`

const keysList = [
  7,
  8,
  9,
  { content: 'DEL', type: 'secondary', size: 1 },
  4,
  5,
  6,
  '+',
  1,
  2,
  3,
  '-',
  '.',
  0,
  '/',
  'x',
  { content: 'RESET', type: 'secondary', size: 2 },
  { content: '=', type: 'tertiary', size: 2 },
]

export default function Keypad() {
  return (
    <Container>
      {keysList.map((key) => {
        if (typeof key === 'object') {
          return (
            <Key
              content={key.content}
              type={key.type}
              size={key.size}
              key={key.content}
            />
          )
        }
        return <Key content={key} key={key} />
      })}
    </Container>
  )
}
