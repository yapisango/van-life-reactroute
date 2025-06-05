import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div>
      <h1>Your Dashboard Hear</h1>
      <p>Coming soon!</p>
      <Outlet />
    </div>
  )
}