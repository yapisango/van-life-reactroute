const useFirebase = import.meta.env.VITE_USE_FIREBASE === "true"

let getDocs, getDoc, doc, collection, getFirestore, initializeApp, db

if (useFirebase) {
    ({ initializeApp } = await import("firebase/app"))
    ({ getFirestore, collection, doc, getDocs, getDoc, query, where } = await import("firebase/firestore"))

const firebaseConfig = {
  apiKey: "AIzaSyA_xu5Wi1-106iRb0taAZ1lWMn-vk_KqSQ",
  authDomain: "van-life-reactroute-827b4.firebaseapp.com",
  projectId: "van-life-reactroute-827b4",
  storageBucket: "van-life-reactroute-827b4.appspot.com",
  messagingSenderId: "419647889289",
  appId: "1:419647889289:web:cf49d4ac26231ffa748b58"
};

    const firebase = initializeApp(firebaseConfig)
    db = getFirestore(firebase)
}

// ---------- FETCH FUNCTIONS ----------

export async function getVans() {
    if (useFirebase) {
        const vansCollectionRef = collection(db, "vans")
        const snapshot = await getDocs(vansCollectionRef)
        return snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }))
    } else {
        const res = await fetch("/api/vans")
        if (!res.ok) throw new Error("Failed to fetch vans from Mirage")
        const data = await res.json()
        return data.vans
    }
}

export async function getVan(id) {
    if (useFirebase) {
        try {
            const docRef = doc(db, "vans", id)
            const snapshot = await getDoc(docRef)
            if (!snapshot.exists()) {
                throw new Error(`Van with ID ${id} not found`)
            }
            return {
                ...snapshot.data(),
                id: snapshot.id
            }
        } catch (error) {
            console.error("Error fetching van:", error)
            throw error
        }
    } else {
        const res = await fetch(`/api/vans/${id}`)
        if (!res.ok) throw new Error("Failed to fetch van from Mirage")
        const data = await res.json()
        return data.van
    }
}

export async function getHostVans() {
    if (useFirebase) {
        const vansCollectionRef = collection(db, "vans")
        const q = query(vansCollectionRef, where("hostId", "==", "123"))
        const snapshot = await getDocs(q)
        return snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }))
    } else {
        const res = await fetch("/api/host/vans")
        if (!res.ok) {
            throw {
                message: "Failed to fetch host vans",
                statusText: res.statusText,
                status: res.status
            }
        }
        const data = await res.json()
        return data.vans
    }
}

export async function loginUser(creds) {
    const res = await fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(creds)
    })

    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}

