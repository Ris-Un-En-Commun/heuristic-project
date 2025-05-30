import {addDays, format, getDay, isBefore} from 'date-fns';

export class ParkingCalendar {
    static workingDaysBetween(start: Date, end: Date): string[] {
        console.log(end);
        console.log(start);
        const days: string[] = [];
        let current = start;
        while (!isBefore(end, current)) {
            const dow = getDay(current);
            if (dow >= 1 && dow <= 5) {
                days.push(format(current, 'yyyy-MM-dd'));
            }
            current = addDays(current, 1);
        }
        return days;
    }
}