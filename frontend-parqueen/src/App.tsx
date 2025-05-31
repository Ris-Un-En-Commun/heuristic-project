import './App.css'
import Header from "./components/common/Header.tsx";
import ReserveParkingSpot from "./components/reservation/reserve_parking_spot.tsx";
import {Toaster} from "react-hot-toast";
import {RoleProvider, useRole} from "./lib/contexts/authentication/RoleContext.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "./components/common/tabs.tsx";
import BackOffice from "./components/admin/BackOffice.tsx";
import UserReservations from './components/reservation/use_reservations.tsx';

function InnerApp() {
    const {role} = useRole();

    return (
        <>
            <Toaster/>
            <Header/>
            <main className="m-auto my-0 px-8 sm:w-full md:w-3/4">
                <Tabs defaultValue="booking">
                    <TabsList className={`grid w-full ${role === 'admin' ? 'grid-cols-3' : 'grid-cols-2'}`}>
                        <TabsTrigger value="booking">Réserver une Place</TabsTrigger>
                        <TabsTrigger value="my-reservations">Mes réservations</TabsTrigger>
                        {role === 'admin' && (
                            <TabsTrigger value="back-office">Administration</TabsTrigger>
                        )}
                    </TabsList>
                    <TabsContent value="booking">
                        <ReserveParkingSpot/>
                    </TabsContent>

                    <TabsContent value="my-reservations">
                         <UserReservations />
                    </TabsContent>
                    {role === 'admin' && (
                        <TabsContent value="back-office">
                            <BackOffice/>
                        </TabsContent>
                    )}
                </Tabs>
            </main>
        </>
    )
}

function App() {
    return (
        <RoleProvider initialRole="user">
            <InnerApp/>
        </RoleProvider>
    );
}

export default App
