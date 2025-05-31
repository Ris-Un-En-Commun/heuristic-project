import {Pagination} from "../common/Pagination";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../common/table";
import type {ParkingSpots} from "../../api/reservations/dto/get-all-parking-spots.dto.ts";
import {Switch} from "../common/switch.tsx";
import {BatteryCharging} from "lucide-react";
import {memo} from "react";

type ParkingSpotTableProps = {
    parkingSpots: ParkingSpots[];
    currentPage: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onAvailibilityChange: (id: string, isAvailable: boolean) => void;
};

type ParkingSpotRowProps = {
    parkingSpot: ParkingSpots;
    onAvailibilityChange: (id: string, isAvailable: boolean) => void;
};

const ParkingSpotRow = memo(
    ({parkingSpot, onAvailibilityChange}: ParkingSpotRowProps) => (
        <TableRow key={parkingSpot.id}>
            <TableCell>{parkingSpot.label}</TableCell>
            <TableCell>{parkingSpot.isElectric ? "Oui" : "Non"}</TableCell>
            <TableCell>{parkingSpot.isAvailable ? "Non" : "Oui"}</TableCell>
            <TableCell className="flex gap-2">
                <Switch
                    checked={!parkingSpot.isAvailable}
                    onCheckedChange={() =>
                        onAvailibilityChange(
                            parkingSpot.id,
                            !parkingSpot.isAvailable
                        )
                    }
                />
            </TableCell>
        </TableRow>
    ),
    (prev, next) =>
        prev.parkingSpot.isAvailable === next.parkingSpot.isAvailable
);


export const ParkingSpotTable = ({
                                     parkingSpots,
                                     currentPage,
                                     pageSize,
                                     onPageChange,
                                     onAvailibilityChange
                                 }: ParkingSpotTableProps) => {
    const start = (currentPage - 1) * pageSize;
    const paginatedParkingSpots = parkingSpots.slice(start, start + pageSize);

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Emplacement</TableHead>
                        <TableHead>Place Electrique <BatteryCharging className="inline"/></TableHead>
                        <TableHead>En maintenance</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedParkingSpots.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">
                                Aucune réservation trouvée
                            </TableCell>
                        </TableRow>
                    ) : (
                        paginatedParkingSpots.map(parkingSpot => (
                            <ParkingSpotRow
                                key={parkingSpot.id}
                                parkingSpot={parkingSpot}
                                onAvailibilityChange={onAvailibilityChange}
                            />))
                    )}
                </TableBody>
            </Table>

            <Pagination
                currentPage={currentPage}
                totalCount={parkingSpots.length}
                pageSize={pageSize}
                onPageChange={onPageChange}
            />
        </>
    );
};
