import Image from 'next/image'
import React from 'react'
import comingSoon from '../public/coming-soon.png'
function File() {
  return (
    <>
    <Image src={comingSoon.src} alt="coming-soon" width={100} height={100} />
    </>
  )
}

export default File