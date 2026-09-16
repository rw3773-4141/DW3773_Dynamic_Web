import cx from 'classnames'

import {twMerge} from 'tailwind-merge'

const Button = (props) => {
  const {
    children, 
    primary, 
    secondary, 
    success, 
    danger, 
    warning, 
    rounded, 
    outline, 
    // spread the rest of the props to the button element
    ...otherProps} = props

  // only one color varient can be use at a time
  // !! coerces a boolean value to true or false
  // number to coerces a boolean value to 1 or 0

  const count = 
    Number(!!primary) + 
    Number(!!secondary) + 
    Number(!!success) + 
    Number(!!danger) + 
    Number(!!warning)

// if we get a count greater than 1, we will throw an error
  if(count > 1){
    console.warn('Only one of primary, secondary, success, danger, warning can be true')
  }

  const baseClass = 'flex items-center px-8 py-3 border'
  const classes = twMerge(
    cx(otherProps.className, baseClass, {
      // color variants, only one can be true at a time
      'bg-blue-500 border-blue-500 text-white': primary,
      'bg-gray-500 border-gray-500 text-white': secondary,
      'bg-green-500 border-green-500 text-white': success,
      'bg-red-500 border-red-500 text-white': danger,
      'bg-yellow-500 border-yellow-500 text-white': warning,
      // modifiers can be combined with colors
      'rounded-full': rounded,
      'bg-white': outline,
      'text-blue-500': outline && primary,
      'text-gray-500': outline && secondary,
      'text-green-500': outline && success,
      'text-red-500': outline && danger,
      'text-yellow-500': outline && warning,
    })
  )

  // const classes = cx('px-8 py-3 border', {
  //   // color variants, only one can be true at a time
  //   'bg-blue-500 border-blue-500 text-white': primary,
  //   'bg-gray-500 border-gray-500 text-white': secondary,
  //   'bg-green-500 border-green-500 text-white': success,
  //   'bg-red-500 border-red-500 text-white': danger,
  //   'bg-yellow-500 border-yellow-500 text-white': warning,
  //   // modifiers can be combined with colors
  //   'rounded-full': rounded,
  //   'bg-white': outline,
  //   'text-blue-500': outline && primary,
  //   'text-gray-500': outline && secondary,
  //   'text-green-500': outline && success,
  //   'text-red-500': outline && danger,
  //   'text-yellow-500': outline && warning,
  // })

  return <button {...otherProps} className={classes}>{children}</button>
}

export default Button
