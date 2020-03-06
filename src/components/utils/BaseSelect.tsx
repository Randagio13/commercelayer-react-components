import React, { FunctionComponent, useEffect } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { BaseComponent } from '../../@types/index'
import Parent from './Parent'

export interface OptionType {
  label: string
  value: number | string
}

const BSProps = {
  children: PropTypes.func,
  options: PropTypes.arrayOf<OptionType>(
    PropTypes.exact({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      selected: PropTypes.bool
    })
  ).isRequired,
  placeholder: PropTypes.exact({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  }),
  value: PropTypes.string,
  name: PropTypes.string.isRequired
}

export type BaseSelectProps = InferProps<typeof BSProps> & BaseComponent

const BaseSelect: FunctionComponent<BaseSelectProps> = props => {
  const { options, children, placeholder, ...p } = props
  useEffect(() => {
    if (options.indexOf(placeholder) === -1) {
      options.unshift(placeholder)
    }
  }, [])
  const Options = options.map((o, k) => {
    return (
      <option key={k} value={o.value}>
        {o.label}
      </option>
    )
  })
  const parentProps = {
    options,
    ...p
  }
  return children ? (
    <Parent {...parentProps}>{children}</Parent>
  ) : (
    <select {...p}>{Options}</select>
  )
}

BaseSelect.propTypes = BSProps

BaseSelect.defaultProps = {
  options: [],
  placeholder: {
    label: 'select an option',
    value: ''
  }
}

export default BaseSelect
