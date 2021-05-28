import React, { Fragment, FunctionComponent } from 'react'
import { PriceProps } from '#components/Price'
import PropTypes from 'prop-types'
import omit from 'lodash/omit'

const propTypes = {
  formattedAmount: PropTypes.string,
  formattedCompare: PropTypes.string,
}
const defaultProps = {
  formattedAmount: '',
  formattedCompare: '',
}

export type PTemplateProps = {
  formattedAmount?: string
  formattedCompare?: string
} & Omit<PriceProps, 'children'>

const PriceTemplate: FunctionComponent<PTemplateProps> = (props) => {
  const {
    className,
    formattedAmount,
    formattedCompare,
    compareClassName,
    showCompare,
    ...p
  } = props
  return (
    <Fragment>
      <span className={className} {...omit(p, ['skuCode'])}>
        {formattedAmount}
      </span>
      {showCompare && (
        <span className={compareClassName || ''}>{formattedCompare}</span>
      )}
    </Fragment>
  )
}

PriceTemplate.propTypes = propTypes
PriceTemplate.defaultProps = defaultProps

export default PriceTemplate
