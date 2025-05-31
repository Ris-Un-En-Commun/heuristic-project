import {Button} from "../common/button";
import {PencilLine, Trash2, Users} from "lucide-react";
import {Pagination} from "../common/Pagination";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../common/table";
import type {Reservation} from "../../api/reservations/dto/get-all-reservations.dto";
import {toast} from "react-hot-toast";

type Props = {
    reservations: Reservation[];
    currentPage: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onDeleteClick: (reservation: Reservation) => void;
};

export const ReservationTable = ({
                                     reservations,
                                     currentPage,
                                     pageSize,
                                     onPageChange,
                                     onDeleteClick
                                 }: Props) => {
    const start = (currentPage - 1) * pageSize;
    const paginated = reservations.slice(start, start + pageSize);

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead><Users className="inline mr-1"/> Utilisateur</TableHead>
                        <TableHead>Emplacement</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Check-in</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginated.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">
                                Aucune réservation trouvée
                            </TableCell>
                        </TableRow>
                    ) : (
                        paginated.map((r) => (
                            <TableRow key={r.id}>
                                <TableCell>{r.user.name}</TableCell>
                                <TableCell>{r.parkingSpot.label}</TableCell>
                                <TableCell>{r.date}</TableCell>
                                <TableCell>{r.checkedIn ? "✔️" : "❌"}</TableCell>
                                <TableCell className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => toast("Fonction d'édition à venir")}
                                    >
                                        <PencilLine className="size-4 mr-1"/> Modifier
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => onDeleteClick(r)}
                                    >
                                        <Trash2 className="size-4 mr-1"/> Supprimer
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            <Pagination
                currentPage={currentPage}
                totalCount={reservations.length}
                pageSize={pageSize}
                onPageChange={onPageChange}
            />
        </>
    );
};
