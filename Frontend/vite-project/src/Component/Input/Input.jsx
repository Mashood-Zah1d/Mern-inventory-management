import React, { forwardRef } from 'react'

function Input({
    label ="",
    type = "text",
    className= "",
    ...props
},ref) {
  return (
    <>
    {label && <label className='m-4 black'>{label}</label>}

    <input
    type={type}
    className={className}
    ref={ref}
    {...props}
     />
    </>
  )
}

export default forwardRef(Input)