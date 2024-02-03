import React from 'react'

function Home() {
  return (
    <div style={{ backgroundImage: `url(${require('../bg.jpg')})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
      <h1 className='text-center' style={{height:'500px'}}>This is HOME page</h1>
    </div>
  )
}

export default Home
