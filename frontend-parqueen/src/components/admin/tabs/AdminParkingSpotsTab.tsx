    import {useCallback, useEffect, useState} from "react";
    import {toast} from "react-hot-toast";
    import {changeParkingSpotAvailability, getAllParkingSpots} from "../../../api/parking-spots/api.ts";
    import {ParkingSpotTable} from "../ParkingSpotTable.tsx";
    import type {ParkingSpots} from "../../../api/reservations/dto/get-all-parking-spots.dto.ts";
    import {Input} from "../../common/input.tsx";

    export const AdminParkingSpotsTab = () => {
        const [parkingSpots, setParkingSpots] = useState<ParkingSpots[]>([]);
        const [filtered, setFiltered] = useState<ParkingSpots[]>([]);
        const [currentPage, setCurrentPage] = useState(1);
        const [searchTerm, setSearchTerm] = useState("");
        const [loading, setLoading] = useState(false);

        const PAGE_SIZE = 15;

        useEffect(() => {
            loadParkingSpots().then();
        }, []);

        const loadParkingSpots = async () => {
            setLoading(true);
            try {
                const res = await getAllParkingSpots();
                if (Array.isArray(res.data)) {
                    setParkingSpots(res.data);
                    setFiltered(res.data);
                } else {
                    toast.error("Format de données incorrect");
                    setParkingSpots([]);
                    setFiltered([]);
                }
            } catch (error) {
                console.error('Erreur lors du chargement des places de parking:', error);
                toast.error("Erreur lors du chargement des places de parking");
                setParkingSpots([]);
                setFiltered([]);
            } finally {
                setLoading(false);
            }
        };

        const onAvailibilityChange = useCallback(
            async (id: string, isAvailable: boolean) => {
                try {
                    await changeParkingSpotAvailability(id, isAvailable);
                    setParkingSpots(prev =>
                        prev.map(spot =>
                            spot.id === id ? {...spot, isAvailable} : spot
                        )
                    );
                    setFiltered(prev =>
                        prev.map(spot =>
                            spot.id === id ? {...spot, isAvailable} : spot
                        )
                    );
                } catch (e) {
                    console.error(
                        "Erreur lors de la mise à jour de la disponibilité:",
                        e
                    );
                    toast.error(
                        "Erreur lors de la mise à jour de la place de parking"
                    );
                }
            },
            []
        );


        useEffect(() => {
            const lower = searchTerm.toLowerCase();
            const result = parkingSpots.filter((spot) =>
                spot.label.toLowerCase().includes(lower)
            );
            setFiltered(result);
            setCurrentPage(1);
        }, [searchTerm, parkingSpots]);

        return (
            <div className="space-y-6">
                <h2 className="text-xl font-medium text-center">Gestion des Places de Parking</h2>

                <div className="flex justify-center">
                    <Input
                        placeholder="Filtrer par nom d'emplacement"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-96"
                    />
                </div>

                {!loading && (
                    <ParkingSpotTable
                        parkingSpots={filtered}
                        currentPage={currentPage}
                        pageSize={PAGE_SIZE}
                        onPageChange={setCurrentPage}
                        onAvailibilityChange={onAvailibilityChange}
                    />
                )}
            </div>
        );
    };
