import {useEffect, useState} from "react";
import {getAllReservations, getUserReservations} from "../../api/reservations/api.ts";
import {setupAxiosClient, type UserRole} from "../../api/authentication/setupAxiosClient.ts";
import type {Reservation} from "../../api/reservations/dto/get-all-reservations.dto.ts";
import ReservationsListElement from "./reservation_list_element.tsx";

interface Props {
    role: UserRole;
}

const ReservationsList = ({role}: Props) => {
    const [reservations, setReservationsState] = useState<Array<Reservation>>([]);

    useEffect(() => {
        setupAxiosClient(role);
        getUserReservations().then(value => {
            setReservationsState(value.data);
        }).catch(_ => setReservationsState([]))
    }, [role]);


    if (reservations.length === 0) {
        return null;
    } else {
        // @ts-ignore
        const reservationComponents: ReservationsListElement[] = reservations.map(reservation => {
            return <li key={reservation.id}>
                <ReservationsListElement
                    date={reservation.date}
                    checkedIn={reservation.checkedIn}
                    parkingSpotLabel={reservation.parkingSpot.label}
                    parkingSpotIsElectric={reservation.parkingSpot.isElectric}
                />
            </li>
        });

        return (<ul className="list-reservations-list">{reservationComponents}</ul>);
    }

};

export default ReservationsList;