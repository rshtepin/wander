import React from 'react'

export const ButtonPlus = (prop) => {
  const {click} = prop
  return (
    <button onClick={click}
      className="buttonplus right
       mt-2">+</button>
  )
}
export default ButtonPlus
