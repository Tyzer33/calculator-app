import { createContext, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import PropTypes from 'prop-types'

const themes = {
  first: {
    mainBackground: 'hsl(222, 26%, 31%)',
    // Header
    headerText: 'hsl(0, 0%, 100%)',
    themeSwitchBackground: 'hsl(223, 31%, 20%)',
    themeSwitch: 'hsl(6, 63%, 50%)',
    // Screen
    screenBackground: 'hsl(224, 36%, 15%)',
    screenText: 'hsl(0, 0%, 100%)',
    // Keypad
    keypadBackground: 'hsl(223, 31%, 20%)',
    primaryKeyBackground: 'hsl(30, 25%, 89%)',
    primaryKeyShadow: 'hsl(28, 16%, 65%)',
    primaryKeyText: 'hsl(221, 14%, 31%)',
    secondaryKeyBackground: 'hsl(225, 21%, 49%)',
    secondaryKeyShadow: 'hsl(224, 28%, 35%)',
    secondaryKeyText: 'hsl(0, 0%, 100%)',
    tertiaryKeyBackground: 'hsl(6, 63%, 50%)',
    tertiaryKeyShadow: 'hsl(6, 70%, 34%)',
    tertiaryKeyText: 'hsl(0, 0%, 100%)',
  },
  second: {
    mainBackground: 'hsl(0, 0%, 90%)',
    // Header
    headerText: 'hsl(60, 10%, 19%)',
    themeSwitchBackground: 'hsl(0, 5%, 81%)',
    themeSwitch: 'hsl(6, 63%, 50%)',
    // Screen
    screenBackground: 'hsl(0, 0%, 93%)',
    screenText: 'hsl(60, 10%, 19%)',
    // Keypad
    keypadBackground: 'hsl(0, 5%, 81%)',
    primaryKeyBackground: 'hsl(45, 7%, 89%)',
    primaryKeyShadow: 'hsl(35, 11%, 61%)',
    primaryKeyText: 'hsl(60, 10%, 19%)',
    secondaryKeyBackground: 'hsl(185, 42%, 37%)',
    secondaryKeyShadow: 'hsl(185, 58%, 25%)',
    secondaryKeyText: 'hsl(0, 0%, 100%)',
    tertiaryKeyBackground: 'hsl(25, 98%, 40%)',
    tertiaryKeyShadow: 'hsl(25, 99%, 27%)',
    tertiaryKeyText: 'hsl(0, 0%, 100%)',
  },
  third: {
    mainBackground: 'hsl(268, 75%, 9%)',
    // Header
    headerText: 'hsl(52, 100%, 62%)',
    themeSwitchBackground: 'hsl(268, 71%, 12%)',
    themeSwitch: 'hsl(176, 100%, 44%)',
    // Screen
    screenBackground: 'hsl(268, 71%, 12%)',
    screenText: 'hsl(52, 100%, 62%)',
    // Keypad
    keypadBackground: 'hsl(268, 71%, 12%)',
    primaryKeyBackground: 'hsl(268, 47%, 21%)',
    primaryKeyShadow: 'hsl(290, 70%, 36%)',
    primaryKeyText: 'hsl(52, 100%, 62%)',
    secondaryKeyBackground: 'hsl(281, 89%, 26%)',
    secondaryKeyShadow: 'hsl(285, 91%, 52%)',
    secondaryKeyText: 'hsl(0, 0%, 100%)',
    tertiaryKeyBackground: 'hsl(176, 100%, 44%)',
    tertiaryKeyShadow: 'hsl(177, 92%, 70%)',
    tertiaryKeyText: 'hsl(198, 20%, 13%)',
  },
}

export const ThemeContext = createContext()

export function Theme({ children }) {
  const [theme, setTheme] = useState('first')

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={themes[theme]}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}

Theme.propTypes = {
  children: PropTypes.node.isRequired,
}
