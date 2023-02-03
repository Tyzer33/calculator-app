import styled from 'styled-components'
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
