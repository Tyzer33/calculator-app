import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { useContext } from 'react'
import { CalculContext } from '../context/CalculContext'

const StyledKey = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  height: 100%;
  width: 100%;
  border-radius: 5px;
  padding-top: 4px;
  grid-column-end: ${(props) => `span ${props.size}`};

  ${(props) => {
    switch (props.type) {
      case 'primary':
        return css`
          font-size: 2rem;
          background: ${props.theme.primaryKeyBackground};
          box-shadow: 0px 4px ${props.theme.primaryKeyShadow};
          color: ${props.theme.primaryKeyText};
        `
      case 'secondary':
        return css`
          font-size: 18px;
          background: ${props.theme.secondaryKeyBackground};
          box-shadow: 0px 4px ${props.theme.secondaryKeyShadow};
          color: ${props.theme.secondaryKeyText};
        `
      case 'tertiary':
        return css`
          font-size: 20px;
          background: ${props.theme.tertiaryKeyBackground};
          box-shadow: 0px 4px ${props.theme.tertiaryKeyShadow};
          color: ${props.theme.tertiaryKeyText};
        `
      default:
        return ''
    }
  }}
`

export default function Key({ content, type, size }) {
  const { calcul, updateCalcul, updateTerm, updateOperator } =
    useContext(CalculContext)

  const { terms, activeTerm } = calcul

  function handleClick(keyContent) {
    if (keyContent === 'RESET') {
      updateCalcul({
        terms: { 1: undefined, 2: undefined },
        activeTerm: 1,
        operator: '',
        result: undefined,
      })
    } else if (keyContent === 'DEL' && terms[activeTerm].length > 0) {
      updateCalcul()
    } else if (typeof keyContent === 'number' || keyContent === '.') {
      updateTerm(keyContent)
    } else if (
      keyContent === '+' ||
      keyContent === '-' ||
      keyContent === 'x' ||
      keyContent === '/'
    ) {
      updateOperator(keyContent)
    } else if (keyContent === '=') {
      updateCalcul(parseFloat(calcul))
    }
  }

  return (
    <StyledKey type={type} size={size} onClick={() => handleClick(content)}>
      {content}
    </StyledKey>
  )
}

Key.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.string,
  size: PropTypes.number,
}

Key.defaultProps = {
  type: 'primary',
  size: 1,
}
