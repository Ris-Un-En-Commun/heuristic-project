import './App.css'
import Header from "./components/ui/Header.tsx";
import ReserveParkingSpot from "./components/reservation/reserve_parking_spot.tsx";
import {Toaster} from "react-hot-toast";
import {useEffect} from "react";
import {setupAxiosClient} from "./api/setupAxiosClient.ts";

function App() {
    useEffect(() => {
        setupAxiosClient('admin',)
    }, []);
    return (
        <>
            <Toaster/>
            <Header/>
            <main className="m-auto my-0 px-8">
                <ReserveParkingSpot/>
            </main>
        </>
    )
}

export default App
