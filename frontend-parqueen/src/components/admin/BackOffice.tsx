import {useEffect, useState} from "react";
import {Button} from "../common/button";
import {toast} from "react-hot-toast";
import {AlertTriangle, X} from "lucide-react";
import {deleteReservation, getAllReservations} from "../../api/reservations/api";
import {Input} from "../common/input";
import type {Reservation} from "../../api/reservations/dto/get-all-reservations.dto";
import {ReservationTable} from "./ReservationTable.tsx";

const PAGE_SIZE = 15;

const BackOffice = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [filtered, setFiltered] = useState<Reservation[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [reservationToDelete, setReservationToDelete] = useState<Reservation | null>(null);

    useEffect(() => {
        loadReservations().then();
    }, []);

    const loadReservations = async () => {
        setLoading(true);
        try {
            const res = await getAllReservations();
            if (Array.isArray(res.data)) {
                setReservations(res.data);
                setFiltered(res.data);
            } else {
                toast.error("Format de données incorrect");
                setReservations([]);
                setFiltered([]);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des réservations:', error);
            toast.error("Erreur lors du chargement des réservations");
            setReservations([]);
            setFiltered([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const lower = searchTerm.toLowerCase();
        const result = reservations.filter((res) =>
            res.user.name.toLowerCase().includes(lower)
        );
        setFiltered(result);
        setCurrentPage(1);
    }, [searchTerm, reservations]);

    const openDeleteModal = (reservation: Reservation) => {
        setReservationToDelete(reservation);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setReservationToDelete(null);
    };

    const confirmDelete = async () => {
        if (!reservationToDelete) return;

        try {
            await deleteReservation(reservationToDelete.id);
            setReservations((prev) => prev.filter((r) => r.id !== reservationToDelete.id));
            toast.success("Réservation supprimée avec succès");
            closeDeleteModal();
        } catch (error) {
            console.error('Erreur lors de la suppression de la réservation:', error);
            toast.error("Erreur lors de la suppression de la réservation");
        }
    };

    return (
        <div className="max-w-5xl mx-auto my-10 space-y-6">
            <h1 className="text-center text-2xl font-bold">
                🗂️ Back-Office — Réservations
            </h1>

            <div className="flex justify-center">
                <Input
                    placeholder="Filtrer par nom d'utilisateur"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-96"
                />
            </div>

            {!loading && (
                <ReservationTable
                    reservations={filtered}
                    currentPage={currentPage}
                    pageSize={PAGE_SIZE}
                    onPageChange={setCurrentPage}
                    onDeleteClick={openDeleteModal}
                />
            )}

            {/* Modal de confirmation de suppression */}
            {showDeleteModal && (
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
                                onClick={closeDeleteModal}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="h-5 w-5"/>
                            </button>
                        </div>

                        <div className="mb-6">
                            <p className="text-gray-600 mb-4">
                                Êtes-vous sûr de vouloir supprimer cette réservation ?
                            </p>

                            {reservationToDelete && (
                                <div className="bg-gray-50 rounded-md p-3 space-y-1 text-sm">
                                    <div><strong>Utilisateur :</strong> {reservationToDelete.user.name}</div>
                                    <div><strong>Emplacement :</strong> {reservationToDelete.parkingSpot.label}</div>
                                    <div><strong>Date :</strong> {reservationToDelete.date}</div>
                                </div>
                            )}

                            <p className="text-red-600 text-sm mt-3">
                                Cette action est irréversible.
                            </p>
                        </div>

                        <div className="flex gap-3 justify-end">
                            <Button
                                variant="outline"
                                onClick={closeDeleteModal}
                            >
                                Annuler
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={confirmDelete}
                            >
                                Supprimer
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BackOffice;