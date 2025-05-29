import './App.css'
import Header from "./components/ui/Header.tsx";
import ReserveParkingSpot from "./components/reservation/reserve_parking_spot.tsx";
import {Toaster} from "react-hot-toast";
import {RoleProvider} from "./lib/contexts/authentication/RoleContext.tsx";

function App() {
    return (
        <RoleProvider initialRole="employee">
            <Toaster/>
            <Header/>
            <main className="m-auto my-0 px-8">
                <ReserveParkingSpot/>
            </main>
        </RoleProvider>
    )
}

export default App
