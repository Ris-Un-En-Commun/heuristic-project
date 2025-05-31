import {useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import {deleteReservation, getAllReservations} from "../../api/reservations/api";
import {Input} from "../common/input";
import type {Reservation} from "../../api/reservations/dto/get-all-reservations.dto";
import {ReservationTable} from "./ReservationTable.tsx";
import {EditReservationModal} from "./EditReservationModal";
import {DeleteReservationModal} from "./DeleteReservationModal.tsx";

const PAGE_SIZE = 15;

const BackOffice = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [filtered, setFiltered] = useState<Reservation[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [reservationToDelete, setReservationToDelete] = useState<Reservation | null>(null);
    const [reservationToEdit, setReservationToEdit] = useState<Reservation | null>(null);

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
                    onEditClick={(r) => setReservationToEdit(r)}
                />
            )}

            {reservationToEdit && (
                <EditReservationModal
                    reservation={reservationToEdit}
                    onClose={() => setReservationToEdit(null)}
                    onUpdated={loadReservations}
                />
            )}

            {showDeleteModal && (
                <DeleteReservationModal
                    reservation={reservationToDelete}
                    onClose={closeDeleteModal}
                    onConfirm={confirmDelete}
                />
            )}
        </div>
    );
};

export default BackOffice;