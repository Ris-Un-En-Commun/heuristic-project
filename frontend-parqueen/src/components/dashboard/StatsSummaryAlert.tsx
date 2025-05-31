import {Alert, AlertDescription} from "../common/alert";
import {AlertCircle} from "lucide-react";
import type {DashboardStats} from "./types";

export const StatsSummaryAlert = ({stats}: { stats: DashboardStats }) => (
    <Alert>
        <AlertCircle className="h-4 w-4"/>
        <AlertDescription>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <div><strong>Nombre total de places :</strong> {stats.totalSpots}</div>
                <div><strong>Réservations non utilisées :</strong> {stats.unusedReservationRate}%</div>
                <div><strong>Places électriques disponibles
                    :</strong> {Math.round(stats.totalSpots * stats.electricSpotsRate / 100)}</div>
            </div>
        </AlertDescription>
    </Alert>
);
