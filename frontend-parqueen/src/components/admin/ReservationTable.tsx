import {Button} from "../common/button";
import {ChevronDown, ChevronUp, PencilLine, Trash2, Users} from "lucide-react";
import {Pagination} from "../common/Pagination";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../common/table";
import type {Reservation} from "../../api/reservations/dto/get-all-reservations.dto";
import {useState} from "react";

type Props = {
    reservations: Reservation[];
    currentPage: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onDeleteClick: (reservation: Reservation) => void;
    onEditClick: (reservation: Reservation) => void;
};

export const ReservationTable = ({
                                     reservations,
                                     currentPage,
                                     pageSize,
                                     onPageChange,
                                     onDeleteClick,
                                     onEditClick,
                                 }: Props) => {
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
    const sorted = [...reservations].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });
    const start = (currentPage - 1) * pageSize;
    const paginated = sorted.slice(start, start + pageSize);

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead><Users className="inline mr-1"/> Utilisateur</TableHead>
                        <TableHead>Emplacement</TableHead>
                        <TableHead
                            className="cursor-pointer select-none"
                            onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
                        >
                            Date
                            {sortDirection === 'asc' ? (
                                <ChevronUp className="inline w-4 h-4 ml-1"/>
                            ) : (
                                <ChevronDown className="inline w-4 h-4 ml-1"/>
                            )}
                        </TableHead>
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
                                        onClick={() => onEditClick(r)}
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
