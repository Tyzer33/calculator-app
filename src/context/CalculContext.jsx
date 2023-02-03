import { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const CalculContext = createContext()

export function CalculProvider({ children }) {
  const [calcul, updateCalcul] = useState({
    termsAndOperators: [],
    activeTerm: 0,
    result: undefined,
  })

  const { termsAndOperators, activeTerm, result } = calcul

  function resetCalcul() {
    updateCalcul({
      termsAndOperators: [],
      activeTerm: 0,
      result: undefined,
    })
  }

  function onScreen() {
    if (result !== undefined) {
      return result
    }
    if (termsAndOperators[0] === undefined) {
      return 0
    }
    return termsAndOperators.join(' ')
  }

  function updateTerm(digit) {
    const newArr = [...termsAndOperators]
    if (
      (digit === 0 && newArr[activeTerm] === 0) ||
      (digit === '.' && newArr[activeTerm] && newArr[activeTerm].includes('.'))
    ) {
      return ''
    }

    if (newArr[activeTerm] === undefined) {
      newArr.push(digit)
    } else {
      newArr[activeTerm] = newArr[activeTerm].toString() + digit.toString()
    }
    updateCalcul({ ...calcul, termsAndOperators: newArr })
  }

  function updateOperator(oper) {
    const newArr = [...termsAndOperators]

    if (newArr[activeTerm] !== undefined) {
      newArr[activeTerm] = parseFloat(newArr[activeTerm])
      newArr.push(oper)
      updateCalcul({
        ...calcul,
        termsAndOperators: newArr,
        activeTerm: activeTerm + 2,
      })
    }
  }

  function findResult() {
    // Attention si dernier index est un opérateur
    const currArr = [...termsAndOperators]
    const newArr = []
    currArr[currArr.length - 1] = parseFloat(currArr[currArr.length - 1])

    if (typeof currArr[currArr.length - 1] !== 'number') {
      currArr.pop()
    }
    while (newArr.length !== 1) {
      currArr.forEach((value, index, arr) => {
        if (value === '/') {
          const calculResult = arr[index - 1] / arr[index + 1]
          currArr.splice(index - 1, 3, calculResult)
        }
        if (value === 'x') {
          const calculResult = arr[index - 1] * arr[index + 1]
          currArr.splice(index - 1, 3, calculResult)
        }
        console.log('/*', currArr)
      })
      currArr.forEach((value, index, arr) => {
        if (value === '+') {
          const calculResult = arr[index - 1] + arr[index + 1]
          currArr.splice(index - 1, 3, calculResult)
        }
        if (value === '-') {
          const calculResult = arr[index - 1] - arr[index + 1]
          currArr.splice(index - 1, 3, calculResult)
        }
        console.log('+-', currArr)
      })
    }

    updateCalcul({ ...calcul, result: currArr[0] })
  }

  console.log(calcul)
  // console.log(eval(`${keysList[0]}${keysList[7]}${keysList[5]}`))

  return (
    <CalculContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        calcul,
        updateCalcul,
        resetCalcul,
        updateTerm,
        updateOperator,
        findResult,
        onScreen,
      }}
    >
      {children}
    </CalculContext.Provider>
  )
}

CalculProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
