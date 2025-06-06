import React from "react"
import { useParams, Link, NavLink, Outlet } from "react-router-dom"

export default function HostVanDetail() {
  const { id } = useParams()
  const [van, setVan] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
}

  React.useEffect(() => {
    fetch(`/api/host/vans/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to fetch van data.")
        }
        return res.json()
      })
      .then(data => {
        setVan(data.van)
        setLoading(false)
      })
      .catch(err => {
        console.error("Fetch error:", err)
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  if (loading) return <h2>Loading host van...</h2>
  if (error) return <h2 className="error">Error: {error}</h2>

  return (
    <section>
      <Link 
        to=".." 
        relative="path" 
        className="back-button">
        &larr; <span>Back to all vans</span>
      </Link>

      <div className="host-van-detail-layout-container">
        <div className="host-van-detail">
          <img src={van.imageUrl} alt={van.name} />
          <div className="host-van-detail-info-text">
            <i className={`van-type van-type-${van.type}`}>
              {van.type}
            </i>
            <h3>{van.name}</h3>
            <h4>${van.price}/day</h4>
            <p>{van.description}</p>
            <button className="link-button">Manage this van</button>
          </div>
        </div>
        <nav className="host-van-detail-nav">
          <NavLink 
            to="." 
            end
            style={({ isActive }) => isActive ? activeStyles : null}
        >
                Details
          </NavLink>
          <NavLink 
            to="pricing"
            style={({ isActive }) => isActive ? activeStyles : null}
        >
                Pricing
          </NavLink>
          <NavLink 
            to="photos"
            style={({ isActive }) => isActive ? activeStyles : null}
            >
                Photos
          </NavLink>
        </nav>
        <Outlet context={{van}} />
      </div>
    </section>
  )
}


