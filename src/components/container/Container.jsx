import React from 'react'

//styling properties dalenge hum idhar
//return ke andar agar ek hi div ho to hum () ye wale brackets hata sakte
//hain return se
export default function Container({children}) {
  return <div className='w-full max-w-7xl mx-auto px-4'>
  {children}</div>;
}
