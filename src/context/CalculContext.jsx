import { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const CalculContext = createContext()

export function CalculProvider({ children }) {
  const [calcul, updateCalcul] = useState({
    terms: { 1: undefined, 2: undefined },
    activeTerm: 1,
    operator: undefined,
    result: undefined,
  })

  const { terms, activeTerm, operator, result } = calcul

  function toDisplay() {
    if (result !== undefined) {
      return result
    }
    return terms[activeTerm]
  }

  function handleReset() {
    updateCalcul({
      terms: { 1: undefined, 2: undefined },
      activeTerm: 1,
      operator: undefined,
      result: undefined,
    })
  }

  function handleDel() {
    if (terms[activeTerm] === undefined) return

    const newTerm =
      terms[activeTerm].length > 1
        ? terms[activeTerm].substring(0, terms[activeTerm].length - 1)
        : undefined

    updateCalcul({
      ...calcul,
      terms: {
        ...terms,
        [activeTerm]: newTerm,
      },
    })
  }

  function handleDigitAndPoint(digit) {
    if (digit === 0 && terms[activeTerm] === '0') return

    const newTerm =
      (terms[activeTerm] === '0' && digit !== '.') || !terms[activeTerm]
        ? digit.toString()
        : terms[activeTerm].toString() + digit.toString()
    if (
      typeof digit === 'number' ||
      (digit === '.' && terms[activeTerm] === undefined) ||
      !terms[activeTerm].includes('.')
    ) {
      updateCalcul({
        ...calcul,
        terms: {
          ...terms,
          [activeTerm]: newTerm,
        },
      })
    }
  }

  function calculResult(firstTerm, oper, secondTerm = 0) {
    const parsedFirstTerm = parseFloat(firstTerm)
    const parsedSecondTerm = parseFloat(secondTerm)
    let tempResult

    switch (oper) {
      case '+':
        tempResult = parsedFirstTerm + parsedSecondTerm
        break
      case '-':
        tempResult = parsedFirstTerm - parsedSecondTerm
        break
      case 'x':
        tempResult = parsedFirstTerm * parsedSecondTerm
        break
      case '/':
        tempResult = parsedFirstTerm / parsedSecondTerm
        break
      default:
        tempResult = undefined
        break
    }

    return tempResult
  }

  function handleOperator(oper) {
    const changeResultToTerm = {
      terms: { 1: result, 2: undefined },
      activeTerm: 2,
      operator: oper,
      result: undefined,
    }

    if (terms[1] === undefined) return
    if (result !== undefined) {
      updateCalcul(changeResultToTerm)
    } else if (terms[2] === undefined) {
      updateCalcul({ ...calcul, activeTerm: 2, operator: oper })
    } else {
      updateCalcul({
        ...changeResultToTerm,
        terms: {
          ...changeResultToTerm.terms,
          1: calculResult(terms[1], operator, terms[2]),
        },
      })
    }
  }

  function handleEqual() {
    if (!operator) return

    updateCalcul({
      ...calcul,
      result: calculResult(terms[1], operator, terms[2]),
    })
  }

  console.log(calcul)

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
