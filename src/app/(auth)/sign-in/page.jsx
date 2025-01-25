//we are taking signinform as component rather than doing the entire ui of form here because hame yeh server side chahiye aur form should be client component hi dts why we are taking signinform as component


import SignInform from '@/components/form/SignInform'
import React from 'react'

const page = () => {
  return (
    <div className=' w-full'>
        <SignInform /> 
    </div>
  )
}

export default page