import React from "react"
import { Link, useParams, useLocation } from "react-router-dom"

export default function VanDetail() {
  const { id } = useParams()
  const location = useLocation()
  const search = location.state?.search || ""
  const [van, setVan] = React.useState(null)

  React.useEffect(() => {
    fetch(`/api/host/vans/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data?.van) {
          setVan(data.van)
        } else {
          console.warn("No van returned")
        }
      })
      .catch(err => {
        console.error("Fetch error:", err)
      })
  }, [id])

  return (
    <div className="van-detail-container">
      <Link 
        to={`..${search}`} 
        relative="path"
        className="back-button"
      >
        &larr; <span>Back to all vans</span>
      </Link>
      {van ? (
        <div className="van-detail">
          <img src={van.imageUrl} alt={van.name} />
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
          <h2>{van.name}</h2>
          <p className="van-price"><span>${van.price}</span>/day</p>
          <p>{van.description}</p>
          <button className="link-button">Rent this van</button>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  )
}

