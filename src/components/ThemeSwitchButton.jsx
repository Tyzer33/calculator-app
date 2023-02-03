import styled, { css } from 'styled-components'
import { useContext, useState } from 'react'
import { ThemeContext } from '../context/ThemeProvider'

const Container = styled.div`
  display: grid;
  align-items: center;
  grid: 'none number' 'label button';
  gap: 0.25rem 1.75rem;
`

const Label = styled.span`
  grid-area: label;
  font-size: 12px;
  letter-spacing: 0.05rem;
  color: ${(props) => props.theme.headerText};
`

const Number = styled.div`
  display: flex;
  justify-content: space-around;
  grid-area: number;
  color: ${(props) => props.theme.headerText};
  font-size: 12px;
`

const Button = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  grid-area: button;
  background: ${(props) => props.theme.themeSwitchBackground};
  width: 71px;
  height: 26px;
  border-radius: 100px;
  padding: 0 0.3125rem;

  &::after {
    content: '';
    position: absolute;
    border-radius: 1rem;
    height: 1rem;
    width: 1rem;
    background: ${(props) => props.theme.themeSwitch};

    ${(props) => {
      switch (props.position) {
        case 'left':
          return css`
            left: 5px;
          `
        case 'center':
          return css`
            left: 50%;
            translate: -62.5%;
          `
        case 'right':
          return css`
            right: 5px;
          `
        default:
          return ''
      }
    }}
  }
`

export default function ThemeSwitchButton() {
  const { theme, setTheme } = useContext(ThemeContext)
  const [buttonPosition, setButtonPosition] = useState('left')

  function nextTheme(currentTheme) {
    if (currentTheme === 'first') {
      setTheme('second')
      setButtonPosition('center')
    } else if (currentTheme === 'second') {
      setTheme('third')
      setButtonPosition('right')
    } else if (currentTheme === 'third') {
      setTheme('first')
      setButtonPosition('left')
    }
  }

  return (
    <Container>
      <Label>THEME</Label>
      <Number>
        <p>1</p>
        <p>2</p>
        <p>3</p>
      </Number>
      <Button position={buttonPosition} onClick={() => nextTheme(theme)} />
    </Container>
  )
}
