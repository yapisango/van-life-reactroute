export async function getVans() {
    const res = await fetch("/api/vans");
    if (!res.ok) {
        throw new Error("Failed to fetch vans data.");
    }
    const data = await res.json();
    return data.vans;
}

export async function getVan(id) {
    const res = await fetch(`/api/vans/${id}`);
    if (!res.ok) {
        throw new Error("Failed to fetch van data.");
    }
    const data = await res.json();
    return data.van;
}

