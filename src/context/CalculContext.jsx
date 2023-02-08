import { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import { evaluate } from 'mathjs'

export const CalculContext = createContext()

export function CalculProvider({ children }) {
  const [calcul, updateCalcul] = useState({
    expressionArr: [],
    activeTerm: 0,
    result: undefined,
  })

  const { expressionArr, activeTerm, result } = calcul

  function toDisplay() {
    if (expressionArr.length === 0) return undefined
    if (result !== undefined) {
      return result
    }

    return expressionArr.join(' ')
  }

  function handleReset() {
    updateCalcul({
      expressionArr: [],
      activeTerm: 0,
      result: undefined,
    })
  }

  function handleDel() {
    if (expressionArr[0] === undefined) return
    let newExpressionArr = [...expressionArr]
    let newActiveTerm = activeTerm

    if (expressionArr.length <= 1 && expressionArr[0].toString().length <= 1) {
      newExpressionArr = []
    } else if (!newExpressionArr[activeTerm]) {
      if (activeTerm >= 2) newActiveTerm -= 2
      if (newExpressionArr[activeTerm] === '') newExpressionArr.pop()
      newExpressionArr.pop()
    } else {
      newExpressionArr[activeTerm] = newExpressionArr[activeTerm].toString()
      newExpressionArr[activeTerm] = newExpressionArr[activeTerm].slice(
        0,
        newExpressionArr[activeTerm].length - 1
      )
    }

    updateCalcul({
      ...calcul,
      expressionArr: newExpressionArr,
      activeTerm: newActiveTerm,
    })
  }

  function handleDigitAndPoint(digit) {
    let newExpressionArr = [...expressionArr]
    let newResult = result
    let newActiveTerm = activeTerm

    if (result !== undefined) {
      newExpressionArr = []
      newResult = undefined
      newActiveTerm = 0
    }

    if (digit === '.') {
      if (newExpressionArr[newActiveTerm] === undefined) {
        newExpressionArr.push('0.')
      } else if (!newExpressionArr[newActiveTerm].includes('.')) {
        newExpressionArr[newActiveTerm] += '.'
      }
    }

    if (typeof digit === 'number') {
      if (newExpressionArr[newActiveTerm] === undefined) {
        newExpressionArr.push(digit.toString())
      } else if (newExpressionArr[newActiveTerm] === '0') {
        newExpressionArr[newActiveTerm] = digit.toString()
      } else {
        newExpressionArr[newActiveTerm] += digit.toString()
      }
    }

    updateCalcul({
      ...calcul,
      expressionArr: newExpressionArr,
      activeTerm: newActiveTerm,
      result: newResult,
    })
  }

  function handleOperator(oper) {
    let newExpressionArr = [...expressionArr]
    let newResult = result
    let newActiveTerm = activeTerm

    if (result !== undefined) {
      newExpressionArr = [result]
      newResult = undefined
      newActiveTerm = 0
    }

    if (expressionArr.length % 2 === 0) return

    newExpressionArr[newActiveTerm] = parseFloat(
      newExpressionArr[newActiveTerm]
    )
    newExpressionArr.push(oper)

    updateCalcul({
      ...calcul,
      activeTerm: newActiveTerm + 2,
      expressionArr: newExpressionArr,
      result: newResult,
    })
  }

  function handleEqual() {
    const newExpressionArr = [...expressionArr]
    if (newExpressionArr[activeTerm] === undefined) {
      newExpressionArr.pop()
    }
    const expression = newExpressionArr.join(' ').replaceAll('x', '*')
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
