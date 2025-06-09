import { initializeApp } from "firebase/app"
import { 
    getFirestore, 
    collection,
    doc, 
    getDocs, 
    getDoc
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBNLn9Tqc64i4KFHVy4VxwinqoI0X8mMdg",
  authDomain: "van-life-reactroute.firebaseapp.com",
  projectId: "van-life-reactroute",
  storageBucket: "van-life-reactroute.firebasestorage.app",
  messagingSenderId: "704417564625",
  appId: "1:704417564625:web:e76f7e7fd5864b3c6e82f0"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const vansCollection = collection(db, "vans")

export async function getVans() {
    const snapshot = await getDocs(vansCollection)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = getDoc(docRef)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms))
}

export async function getVans() {
    const snapshot = await getDocs(vansCollection)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

//export async function getVan(id) {
//    const res = await fetch(`/api/vans/${id}`)
//    if (!res.ok) throw new Error("Failed to fetch van")
//    const data = await res.json()
//    return data.van
//}


export async function getHostVans(id) {
    const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
    const res = await fetch(url)

    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
}

export async function loginUser(creds) {
   const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
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
