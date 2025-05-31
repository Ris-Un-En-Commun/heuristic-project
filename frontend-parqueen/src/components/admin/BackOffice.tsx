import {Tabs, TabsContent, TabsList, TabsTrigger} from "../common/tabs";
import {AdminReservationsTab} from "./tabs/AdminReservationsTab.tsx";
import {AdminParkingSpotsTab} from "./tabs/AdminParkingSpotsTab.tsx";


const BackOffice = () => {
    return (
        <div className="max-w-5xl mx-auto my-10">
            <h1 className="text-center text-2xl font-bold mb-6">
                🗂️ Back-Office
            </h1>

            <Tabs defaultValue="reservations">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="reservations">Réservations</TabsTrigger>
                    <TabsTrigger value="parking-spots">Places de Parking</TabsTrigger>
                    <TabsTrigger value="users">Utilisateurs</TabsTrigger>
                </TabsList>

                <TabsContent value="reservations">
                    <AdminReservationsTab/>
                </TabsContent>

                <TabsContent value="parking-spots">
                    <AdminParkingSpotsTab/>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default BackOffice;