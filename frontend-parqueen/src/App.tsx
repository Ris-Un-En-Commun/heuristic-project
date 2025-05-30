import './App.css'
import Header from "./components/common/Header.tsx";
import ReserveParkingSpot from "./components/reservation/reserve_parking_spot.tsx";
import {Toaster} from "react-hot-toast";
import {RoleProvider} from "./lib/contexts/authentication/RoleContext.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "./components/common/tabs.tsx";

function App() {
    return (
        <RoleProvider initialRole="user">
            <Toaster/>
            <Header/>
            <main className="m-auto my-0 px-8 sm:w-full md:w-3/4">
                <Tabs defaultValue="booking">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="booking">Réserver une Place</TabsTrigger>
                        <TabsTrigger value="my-reservations">Mes réservations</TabsTrigger>
                    </TabsList>
                    <TabsContent value="booking">
                        <ReserveParkingSpot/>
                    </TabsContent>
                    <TabsContent value="my-reservations">
                    </TabsContent>
                </Tabs>
            </main>
        </RoleProvider>
    )
}

export default App
