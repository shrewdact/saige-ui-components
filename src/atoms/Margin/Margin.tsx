import React from 'react'
import { Spacing } from '@saige.ds/foundation'

interface MarginProps {
  space?: keyof typeof Spacing
  left?: boolean
  right?: boolean
  top?: boolean
  bottom?: boolean
  children: React.ReactNode
}

const Margin: React.FC<MarginProps> = ({
  space = 'xxxs',
  children,
  left,
  right,
  top,
  bottom,
}) => {
  let className = ``

  if(!left && ! right && !top && !bottom){
    className = `sds-margin-${space}`
  }

  if(left){
    className = `${className} sds-margin-left-${space}`
  }
  if(right){
    className = `${className} sds-margin-right-${space}`
  }
  if(top){
    className = `${className} sds-margin-top-${space}`
  }
  if(bottom){
    className = `${className} sds-margin-bottom-${space}`
  }
  return <div className={className}>{children}</div>
}

export default Margin
