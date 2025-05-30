import {Popover, PopoverContent, PopoverTrigger} from "../ui/popover.tsx";
import {Button} from "../ui/button.tsx";
import {BatteryCharging, CalendarIcon, Loader2} from "lucide-react";
import {cn} from "../../lib/utils.ts";
import {Calendar} from "../ui/calendar.tsx";
import {format} from "date-fns"
import type {DateRange} from "react-day-picker";
import {useState} from "react";
import {addDays} from "date-fns/addDays";
import {Switch} from "../ui/switch.tsx";
import {AxiosError} from "axios";
import toast from "react-hot-toast";
import {isAParkingSpotAvailable} from "../../api/parking-spots/api.ts";
import {bookParkingSpot} from "../../api/reservations/api.ts";

const ReserveParkingSpot = () => {
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(), to: new Date(),
    })
    const [checkLoading, setCheckLoading] = useState(false)
    const [bookSpotLoading, setBookSpotLoading] = useState(false)
    const [isElectric, setIsElectric] = useState<boolean>(false);
    const minimulDate = new Date();
    const maximulDate = addDays(minimulDate, 30);

    const checkIfAvailable = async () => {
        if (!date) return;
        setCheckLoading(true);
        try {
            await isAParkingSpotAvailable(date, isElectric)
            toast.success('Place de parking disponible pour la période sélectionnée.')
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.status === 404) {
                toast.error('Aucune place de parking disponible correspondant à vos critères.')
            } else {
                console.error("Unexpected error:", e);
                toast.error('Une erreur est survenue lors de la vérification de la disponibilité.')
            }
        } finally {
            setCheckLoading(false);
        }
    }
    const bookSpot = async () => {
        if (!date) return;
        setBookSpotLoading(true);
        try {
            await bookParkingSpot(date, isElectric)
            toast.success('Place de parking réservée pour la période sélectionnée.')
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.status === 404) {
                toast.error('Aucune place de parking disponible correspondant à vos critères.')
            } else {
                console.error("Unexpected error:", e);
                toast.error('Une erreur est survenue lors de la vérification de la disponibilité.')
            }
        } finally {
            setBookSpotLoading(false);
        }
    }

    return (<div>
        <h1 className="text-center text-2xl font-bold mt-4">Réserver une place</h1>
        <div className="grid gap-y-3">
            <div className="flex flex-col items-center">
                <label htmlFor="date" className="text-lg">Plage de réservation :</label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            id="date"
                            variant={"outline"}
                            className={cn("w-[300px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                            <CalendarIcon/>
                            {date?.from ? (date.to ? (<>
                                {format(date.from, "LLL dd, y")} -{" "}
                                {format(date.to, "LLL dd, y")}
                            </>) : (format(date.from, "LLL dd, y"))) : (<span>Pick a date</span>)}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            fromDate={minimulDate}
                            toDate={maximulDate}
                            initialFocus
                            mode="range"
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex flex-col items-center">
                <label htmlFor="time" className="text-lg flex items-center align-middle gap-x-2"><BatteryCharging
                    className="inline"/> Chargeur de voiture
                    électrique<Switch checked={isElectric}
                                      onCheckedChange={() => setIsElectric(!isElectric)}></Switch></label>

            </div>
            <div className="flex flex-col items-center ">
                <Button onClick={checkIfAvailable} type="button" disabled={date == undefined || checkLoading}
                        className="w-fit mt-4 cursor-pointer"
                        variant={"default"}> <CalendarIcon
                    className="inline mr-2"/>Vérifier
                    la
                    disponibilité
                    {checkLoading && <Loader2 className="animate-spin"/>}</Button>
                <button disabled={date == undefined || bookSpotLoading} onClick={bookSpot}
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-3 cursor-pointer">Réserver
                    {bookSpotLoading && <Loader2 className="animate-spin"/>}
                </button>
            </div>
        </div>
    </div>);
};

export default ReserveParkingSpot;