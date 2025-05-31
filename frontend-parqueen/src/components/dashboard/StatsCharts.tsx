import {ChartCard} from "./ChartCard";
import type {DashboardStats} from "./types";

export const StatsCharts = ({stats}: { stats: DashboardStats }) => {
    const getOverviewData = () => [
        {name: 'Réservations totales', value: stats.totalReservations},
        {name: 'Réservations aujourd\'hui', value: stats.todayReservations},
        {name: 'Utilisateurs actifs', value: stats.totalUsers},
    ];

    const getOccupancyData = () => [
        {name: 'Taux d\'occupation', value: stats.averageOccupancyRate, color: '#3b82f6'},
        {name: 'Places libres', value: 100 - stats.averageOccupancyRate, color: '#e5e7eb'}
    ];

    const getUsageData = () => [
        {name: 'Réservations utilisées', value: 100 - stats.unusedReservationRate, color: '#10b981'},
        {name: 'Non utilisées', value: stats.unusedReservationRate, color: '#ef4444'}
    ];

    const getSpotTypesData = () => [
        {name: 'Places électriques', value: stats.electricSpotsRate, color: '#fbbf24'},
        {name: 'Places standards', value: 100 - stats.electricSpotsRate, color: '#6b7280'}
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard
                title="Vue d'ensemble"
                description="Aperçu des réservations et utilisateurs"
                data={getOverviewData()}
                type="bar"
            />

            <ChartCard
                title="Taux d'occupation"
                description="Utilisation globale du parking"
                data={getOccupancyData()}
                type="pie"
            />

            <ChartCard
                title="Utilisation des réservations"
                description="Taux de présence vs absences"
                data={getUsageData()}
                type="pie"
            />

            <ChartCard
                title="Types de places"
                description="Électriques vs standards"
                data={getSpotTypesData()}
                type="pie"
            />
        </div>
    );
};
