import {Card, CardContent, CardHeader, CardTitle} from "../common/card";
import {Badge} from "../common/badge";
import {BatteryCharging, Car, TrendingUp, Users} from "lucide-react";
import type {DashboardStats} from "./types";

export const StatsCards = ({stats}: { stats: DashboardStats }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
            <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle className="text-sm font-medium">Réservations totales</CardTitle>
                <Car className="h-4 w-4"/>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-blue-600">{stats.totalReservations}</div>
                <Badge variant="secondary" className="mt-2">{stats.todayReservations} aujourd'hui</Badge>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle className="text-sm font-medium">Utilisateurs actifs</CardTitle>
                <Users className="h-4 w-4"/>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.totalUsers}</div>
                <p className="text-xs text-muted-foreground mt-2">Utilisateurs uniques</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle className="text-sm font-medium">Taux d'occupation</CardTitle>
                <TrendingUp className="h-4 w-4"/>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-orange-600">{stats.averageOccupancyRate}%</div>
                <Badge
                    variant={
                        stats.averageOccupancyRate > 80
                            ? "destructive"
                            : stats.averageOccupancyRate > 50
                                ? "default"
                                : "secondary"
                    }
                    className="mt-2"
                >
                    {stats.averageOccupancyRate > 80 ? "Très occupé" : stats.averageOccupancyRate > 50 ? "Modéré" : "Faible"}
                </Badge>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle className="text-sm font-medium">Places électriques</CardTitle>
                <BatteryCharging className="h-4 w-4"/>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{stats.electricSpotsRate}%</div>
                <p className="text-xs text-muted-foreground mt-2">du parking total</p>
            </CardContent>
        </Card>
    </div>
);
