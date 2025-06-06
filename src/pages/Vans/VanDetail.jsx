import React from "react"
import { useParams } from "react-router-dom"

export default function VanDetail() {
    const params = useParams()
    const [van, setVan] = React.useState(null)

    React.useEffect(() => {
        console.log("Fetching van with ID:", params.id)

        fetch(`/api/vans/${params.id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch van")
                }
                return res.json()
            })
            .then(data => {
                console.log("Fetched data:", data)
                setVan(data.van)
            })
            .catch(err => {
                console.error("Fetch error:", err)
            })
    }, [params.id])

    return (
        <div className="van-detail-container">
            {van ? (
                <div className="van-detail">
                    <img src={van.imageUrl} />
                    <i className={`van-type ${van.type} selected`}>{van.type}</i>
                    <h2>{van.name}</h2>
                    <p className="van-price"><span>${van.price}</span>/day</p>
                    <p>{van.description}</p>
                    <button className="link-button">Rent this van</button>
                </div>
            ) : <h2>Loading...</h2>}
        </div>
    )
}
