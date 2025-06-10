import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getVans } from "../../api";

export default function Vans() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [vans, setVans] = React.useState(null);  
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const typeFilter = searchParams.get("type");

    React.useEffect(() => {
        async function loadVans() {
            try {
                setLoading(true);
                const data = await getVans();
                console.log("Fetched vans from Firebase:", data);
                setVans(data); 
            } catch (err) {
                console.error("Failed to load vans:", err);
                setError("Failed to load vans.");
            } finally {
                setLoading(false);
            }
        }

        loadVans();
    }, []);

    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key);
            } else {
                prevParams.set(key, value);
            }
            return prevParams;
        });
    }

    if (loading) 
        return <h2 aria-live="polite">Loading vans...</h2>;
    if (error) 
        return <h2 aria-live="assertive">{error}</h2>;
    if (!Array.isArray(vans)) 
        return <h2 aria-live="assertive">No vans available.</h2>;

    const filteredVans = typeFilter
        ? vans.filter(van => van.type === typeFilter)
        : vans;

    const vanElements = filteredVans.map(van => (
        <div key={van.id} className="van-tile">
            <Link
                to={van.id}
                state={{ search: `?${searchParams.toString()}` }}
                aria-label={`View details for ${van.name}, priced at $${van.price} per day`}
            >
                <img src={van.imageUrl} alt={`Image of ${van.name}`} />
                <div className="van-info">
                    <p>{van.name}</p>
                    <p>${van.price}<span>/day</span></p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    ));

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

                {typeFilter && (
                    <button
                        onClick={() => handleFilterChange("type", null)}
                        className="van-type clear-filters"
                    >Clear filter</button>
                )}
            </div>
            <div className="van-list">
                {vanElements.length > 0 ? vanElements : <p>No vans match your filter.</p>}
            </div>
        </div>
    );
}

