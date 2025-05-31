import {AlertTriangle, X} from "lucide-react";
import {Button} from "../common/button";
import type {Reservation} from "../../api/reservations/dto/get-all-reservations.dto";

type Props = {
    reservation: Reservation | null;
    onClose: () => void;
    onConfirm: () => void;
};

export const DeleteReservationModal = ({reservation, onClose, onConfirm}: Props) => {
    if (!reservation) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="h-6 w-6 text-red-500"/>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Confirmer la suppression
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="h-5 w-5"/>
                    </button>
                </div>

                <div className="mb-6">
                    <p className="text-gray-600 mb-4">
                        Êtes-vous sûr de vouloir supprimer cette réservation ?
                    </p>

                    <div className="bg-gray-50 rounded-md p-3 space-y-1 text-sm">
                        <div><strong>Utilisateur :</strong> {reservation.user.name}</div>
                        <div><strong>Emplacement :</strong> {reservation.parkingSpot.label}</div>
                        <div><strong>Date :</strong> {reservation.date}</div>
                    </div>

                    <p className="text-red-600 text-sm mt-3">
                        Cette action est irréversible.
                    </p>
                </div>

                <div className="flex gap-3 justify-end">
                    <Button variant="outline" onClick={onClose}>
                        Annuler
                    </Button>
                    <Button variant="destructive" onClick={onConfirm}>
                        Supprimer
                    </Button>
                </div>
            </div>
        </div>
    );
};
