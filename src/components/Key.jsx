import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { useContext } from 'react'
import { CalculContext } from '../context/CalculContext'
import { tabletLandscape } from '../breakpoints'

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

  ${tabletLandscape(css`
    padding-top: 6px;
  `)}

  ${(props) => {
    switch (props.type) {
      case 'primary':
        return css`
          font-size: 2rem;
          background: ${props.theme.primaryKeyBackground};
          box-shadow: 0px 4px ${props.theme.primaryKeyShadow};
          color: ${props.theme.primaryKeyText};

          ${tabletLandscape(css`
            font-size: 2.5rem;
          `)}
        `
      case 'secondary':
        return css`
          font-size: 1.125rem;
          background: ${props.theme.secondaryKeyBackground};
          box-shadow: 0px 4px ${props.theme.secondaryKeyShadow};
          color: ${props.theme.secondaryKeyText};

          ${tabletLandscape(css`
            font-size: 1.75rem;
          `)}
        `
      case 'tertiary':
        return css`
          font-size: 1.25rem;
          background: ${props.theme.tertiaryKeyBackground};
          box-shadow: 0px 4px ${props.theme.tertiaryKeyShadow};
          color: ${props.theme.tertiaryKeyText};

          ${tabletLandscape(css`
            font-size: 1.625rem;
          `)}
        `
      default:
        return ''
    }
  }}
`

export default function Key({ content, type, size }) {
  const {
    calcul,
    updateCalcul,
    resetCalcul,
    updateTerm,
    updateOperator,
    findResult,
  } = useContext(CalculContext)

  const { terms, activeTerm } = calcul

  function handleClick(keyContent) {
    if (keyContent === 'RESET') {
      resetCalcul()
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
      findResult()
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
