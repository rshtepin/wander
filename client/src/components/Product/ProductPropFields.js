import React from 'react'

export const ProductPropFields = (prop) => {
  const {names, values} = prop

  return (
    < div className="fieldBG " >
      {names}
      < div className="fieldText" >
        {values}
      </div >
    </div >)
}
