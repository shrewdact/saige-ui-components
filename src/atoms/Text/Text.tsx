import React from 'react'
import { FontSize} from '@saige.ds/foundation'

interface TextProps {
  size?: keyof typeof FontSize,
  children: React.ReactNode
}

const Text: React.FC<TextProps> = ({ size = FontSize.base, children }) => {
  const className = `sds-text-${size}`
  return <p className={className}>{children}</p>
}

export default Text
