import {useEffect, useState} from "react";
import {X} from "lucide-react";
import {Button} from "../common/button";
import {Input} from "../common/input";
import type {Reservation} from "../../api/reservations/dto/get-all-reservations.dto";
import {updateReservation} from "../../api/reservations/api";
import {toast} from "react-hot-toast";
import {getAvailableSpots} from "../../api/parking-spots/api.ts";

type ParkingSpot = {
    id: string;
    label: string;
    isElectric: boolean;
};

type Props = {
    reservation: Reservation;
    onClose: () => void;
    onUpdated: () => void;
};

export const EditReservationModal = ({reservation, onClose, onUpdated}: Props) => {
    const [date, setDate] = useState(reservation.date);
    const [checkedIn, setCheckedIn] = useState(reservation.checkedIn);
    const [availableSpots, setAvailableSpots] = useState<ParkingSpot[]>([]);
    const [selectedSpotId, setSelectedSpotId] = useState(reservation.parkingSpot.id);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (date) fetchAvailableSpots(date).then();
    }, [date]);

    const fetchAvailableSpots = async (date: string) => {
        try {
            const res = await getAvailableSpots(date);
            setAvailableSpots(res.data);
        } catch {
            toast.error("Erreur lors du chargement des places disponibles");
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await updateReservation(reservation.id, {
                date,
                parkingSpotId: selectedSpotId,
                checkedIn
            });
            toast.success("Réservation mise à jour");
            onUpdated();
            onClose();
        } catch {
            toast.error("Erreur lors de la mise à jour");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Modifier la réservation</h2>
                    <button onClick={onClose}><X className="w-5 h-5 text-gray-500 hover:text-black"/></button>
                </div>

                <div className="space-y-3">
                    <label className="block text-sm font-medium">Date</label>
                    <Input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>

                    <label className="block text-sm font-medium">Check-in</label>
                    <div>
                        <input type="checkbox" checked={checkedIn} onChange={() => setCheckedIn(!checkedIn)}/>
                        <span className="ml-2">{checkedIn ? "Présent" : "Absent"}</span>
                    </div>

                    <label className="block text-sm font-medium">Place de parking</label>
                    <div className="space-y-2 max-h-40 overflow-y-auto border rounded p-2">
                        {availableSpots.map((spot) => (
                            <div
                                key={spot.id}
                                className={`flex justify-between items-center p-2 rounded cursor-pointer border ${
                                    selectedSpotId === spot.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-100"
                                }`}
                                onClick={() => setSelectedSpotId(spot.id)}
                            >
                                <span>{spot.label}</span>
                                {spot.isElectric && <span className="ml-2 text-green-500">🔌</span>}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" onClick={onClose}>Annuler</Button>
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Enregistrement..." : "Enregistrer"}
                    </Button>
                </div>
            </div>
        </div>
    );
};
