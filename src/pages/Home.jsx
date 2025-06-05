import React from 'react'
import Navbar from '../components/Navbar.jsx'

function Home() {
  return (
    <>
      <Navbar />
      <div className="home-page">
        <h1>You got the travel plans, we got the travel vans.</h1>
        <p>
          Add adventure to your life by joining the #vanlife movement.
          Rent the perfect van to make your perfect road trip.
        </p>
        <button className='link-button'>Find your van</button>
        <footer style={{ marginTop: "2rem", fontSize: "0.9rem", color: "#fff" }}>
          Ⓒ 2022 #VANLIFE
        </footer>
      </div>
    </>
  )
}

export default Home



