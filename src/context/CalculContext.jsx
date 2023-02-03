import { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const CalculContext = createContext()

export function CalculProvider({ children }) {
  const [calcul, updateCalcul] = useState({
    terms: { 1: 12, 2: undefined },
    activeTerm: 1,
    operator: '',
    result: undefined,
  })

  const { terms, activeTerm, result } = calcul

  function onScreen() {
    if (result) {
      return result
    }
    if (terms[activeTerm]) {
      return terms[activeTerm]
    }
    return 0
  }

  function updateTerm(digit) {
    // probleme quand rajoute 0 après la vrigule
    if (digit === '.' && !terms[activeTerm].toString().includes('.')) {
      updateCalcul({
        ...calcul,
        terms: { ...terms, 1: terms[activeTerm] + digit },
      })
    } else {
      const newTerm = terms[activeTerm].toString() + digit
      updateCalcul({
        ...calcul,
        terms: { ...terms, [activeTerm]: parseFloat(newTerm) },
      })
    }
  }

  function updateOperator(oper) {
    if (!terms[1]) {
      updateCalcul({ ...calcul, activeTerm: 1, operator: oper })
    }
  }

  console.log(calcul)
  // console.log(eval(`${keysList[0]}${keysList[7]}${keysList[5]}`))

  return (
    <CalculContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ calcul, updateCalcul, updateTerm, updateOperator, onScreen }}
    >
      {children}
    </CalculContext.Provider>
  )
}

CalculProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
