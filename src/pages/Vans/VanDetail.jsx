import React from "react"
import { Link, useParams, useLocation } from "react-router-dom"
import { getVan } from "../../api";

export default function VanDetail() {
    const params = useParams()
    const location = useLocation()
    const [van, setVan] = React.useState(null)
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        async function loadVan() {
            try {
                const res = await fetch("api/vans");
                setLoading(true);
                const data = await res.json();
                const foundVan = data.vans.find(v => v.id === params.id);
                setVan(foundVan);
            } catch (err) {
                console.error("Failed to load van:", err);
                setError("Van not found or failed to load.");
            } finally {
                setLoading(false);
            }
        }

        loadVan();
    }, [params.id]);

    if (loading) 
      return <h2>Loading van details...</h2>;
    if (error) 
      return <h2>{error}</h2>;
    if (!van) 
      return <h2>Van not found.</h2>;

    const search = location.state?.search || ""
    const typeFilter = new URLSearchParams(search).get("type")
    const backText = typeFilter 
        ? `Back to ${typeFilter} vans` 
        : "Back to all vans"

    return (
        <div className="van-detail-container">
            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            >
                &larr; <span>{backText}</span>
            </Link>
            
            {van ? (
                <div className="van-detail">
                    <img src={van.imageUrl} alt={van.name} />
                    <i className={`van-type ${van.type} selected`}>
                        {van.type}
                    </i>
                    <h2>{van.name}</h2>
                    <p className="van-price"><span>${van.price}</span>/day</p>
                    <p>{van.description}</p>
                    <button className="link-button">Rent this van</button>
                </div>
            ) : <h2>Loading...</h2>}
        </div>
    )
}


