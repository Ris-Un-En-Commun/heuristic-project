interface Props {
    parkingSpotLabel: string;
    parkingSpotIsElectric: boolean;
    date: string;
    checkedIn: boolean;
}


const ReservationsListElement = ({
                              parkingSpotLabel,
                              parkingSpotIsElectric,
                              date,
                              checkedIn,
                          }: Props) => {

    return (
        <div className="border p-4">
            <ul className="elements list content-center text-center list-reservations-list">
                Réservation de la place {parkingSpotLabel} le {date}
                <br/>
                Électrique: {parkingSpotIsElectric ? "Oui" : "Non"}
                <br/>
                CheckedIn: {checkedIn ? "Oui" : "Non"}
            </ul>
        </div>
    )
}

export default ReservationsListElement;