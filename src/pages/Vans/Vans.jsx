import React from "react"
import { Link, useSearchParams } from "react-router-dom";    

export default function Vans() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [vans, setVans] = React.useState([])

    const typeFilter = searchParams.get("type");

    React.useEffect(() => {
        fetch("/api/vans")
            .then(res => res.json())
            .then(data => {
            setVans(data.vans);
            })
    }, []);

    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

    const filteredVans = typeFilter 
        ? vans.filter(van => van.type === typeFilter) 
        : vans;

    const vanElements = filteredVans.map(van => (
        <div key={van.id} className="van-tile">
            <Link 
                to={van.id} 
                state={{ search: `?${searchParams.toString()}` }}
                aria-label={`View details for ${van.name}, 
                             priced at $${van.price} per day`}
            >
                <img src={van.imageUrl} alt={`Image of ${van.name}`} />
                <div className="van-info">
                    <p>{van.name}</p>
                    <p>${van.price}<span>/day</span></p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    ))

    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <div className="van-list-filter-buttons">
                <button 
                    onClick={() => handleFilterChange("type", "simple")}
                    className={`van-type simple ${typeFilter === "simple" ? "selected" : ""}`}
                >Simple</button>
                <button 
                    onClick={() => handleFilterChange("type", "luxury")}
                    className={`van-type luxury ${typeFilter === "luxury" ? "selected" : ""}`}
                >Luxury</button>
                <button 
                    onClick={() => handleFilterChange("type", "rugged")}
                    className={`van-type rugged ${typeFilter === "rugged" ? "selected" : ""}`}
                >Rugged</button>

                {typeFilter ? (
                    <button
                        onClick={() => handleFilterChange("type", null)}
                        className="van-type clear-filters"
                    >Clear filter</button>
                ) : null}
            </div>
            <div className="van-list">
                {vanElements}
            </div>
        </div>
    )
}
