import {setupAxiosClient, type UserRole} from "../../api/authentication/setupAxiosClient.ts";
import {checkIn, fetchCurrentUncheckedReservation} from "../../api/reservations/api.ts";
import {useEffect, useState} from "react";
import {Button} from "../common/button.tsx";

interface Props {
    role: UserRole;
}

const CheckInButton = ({role}: Props) => {
    let [hasCurrentReservation, setHasCurrentReservation] = useState(false);

    let currentUncheckedReservation: any, setCurrentUncheckedReservation: any;
    [currentUncheckedReservation, setCurrentUncheckedReservation] = useState(null);

    let parkingSpotLabel: any, setParkingSpotLabel: any;
    [parkingSpotLabel, setParkingSpotLabel] = useState('');

    useEffect(() => {
        setupAxiosClient(role);
        fetchCurrentUncheckedReservation().then(function (value)
        {
            setCurrentUncheckedReservation(value.data);
            setParkingSpotLabel(value.data?.parkingSpot.label);
            setHasCurrentReservation(true);
        }).catch(function (error) {
            if (error.response?.status === 404) {
                setCurrentUncheckedReservation(null);
                setHasCurrentReservation(false);
            } else {
                console.error('Unexpected error:', error);
            }
        });
    }, [role]);

    const handleCheckIn = async () => {
        if (currentUncheckedReservation?.id) {
            await checkIn(currentUncheckedReservation.id)
            setHasCurrentReservation(false)
        }
    }

    if (!hasCurrentReservation) {
        return null;
    }

    return (
        <Button className="text-white bg-blue-700 cursor-pointer"  onClick={handleCheckIn}>{parkingSpotLabel}: Check-in à faire</Button>
    )
}

export default CheckInButton;