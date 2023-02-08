import { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import { evaluate } from 'mathjs'

export const CalculContext = createContext()

export function CalculProvider({ children }) {
  const [calcul, updateCalcul] = useState({
    terms: [],
    activeTerm: 0,
    operator: [],
    result: undefined,
  })

  const { terms, activeTerm, operator, result } = calcul

  function toDisplay() {
    if (terms[0] === undefined) return undefined
    if (result !== undefined) {
      return result
    }

    let display = ''
    terms.forEach((elem, index) => {
      display += elem.toString()
      if (operator[index]) {
        display += ` ${operator[index]} `
      }
    })
    return display
  }

  function handleReset() {
    updateCalcul({
      terms: [],
      activeTerm: 0,
      operator: [],
      result: undefined,
    })
  }

  function handleDel() {
    // if (terms[activeTerm] === undefined) return
    // const newTerm =
    //   terms[activeTerm].length > 1
    //     ? terms[activeTerm].substring(0, terms[activeTerm].length - 1)
    //     : undefined
    // updateCalcul({
    //   ...calcul,
    //   terms: {
    //     ...terms,
    //     [activeTerm]: newTerm,
    //   },
    // })
  }

  function handleDigitAndPoint(digit) {
    const newTerms = [...terms]

    if (digit === '.') {
      if (newTerms[activeTerm] === undefined) {
        newTerms.push('0.')
      } else if (!newTerms[activeTerm].includes('.')) {
        newTerms[activeTerm] += '.'
      }
    }

    if (typeof digit === 'number') {
      if (newTerms[activeTerm] === undefined) {
        newTerms.push(digit.toString())
      } else if (newTerms[activeTerm] === '0') {
        newTerms[activeTerm] = digit.toString()
      } else {
        newTerms[activeTerm] += digit.toString()
      }
    }

    updateCalcul({ ...calcul, terms: newTerms })
  }

  function handleOperator(oper) {
    if (operator.length >= terms.length) return

    const newOperator = [...operator]

    newOperator.push(oper)

    updateCalcul({
      ...calcul,
      activeTerm: activeTerm + 1,
      operator: newOperator,
    })
  }

  function handleEqual() {
    // Merge Terms and Operators
    const mergedArray = []
    terms.forEach((elem, index) => {
      mergedArray.push(parseFloat(elem))
      if (index !== terms.length - 1) {
        mergedArray.push(operator[index])
      }
    })

    const expression = mergedArray.join(' ').replace('x', '*')
    updateCalcul({ ...calcul, result: evaluate(expression) })
  }

  return (
    <CalculContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        calcul,
        updateCalcul,
        toDisplay,
        handleReset,
        handleDel,
        handleDigitAndPoint,
        handleOperator,
        handleEqual,
      }}
    >
      {children}
    </CalculContext.Provider>
  )
}

CalculProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
