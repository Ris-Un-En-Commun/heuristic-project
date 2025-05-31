import {useEffect, useState} from "react";
import {getDashboardStats} from "../../api/dashboard/api";
import type {DashboardStats, Period, PeriodOption} from "./types";
import {StatsCards} from "./StatsCards";
import {StatsCharts} from "./StatsCharts";
import {StatsSummaryAlert} from "./StatsSummaryAlert";
import {PeriodSelector} from "./PeriodSelector";
import {format, subDays} from "date-fns";
import {Card, CardContent} from "../common/card";
import {Loader2} from "lucide-react";
import toast from "react-hot-toast";
import {AxiosError} from "axios";

const Dashboard = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState<Period>('7days');

    const getPeriodOptions = (): PeriodOption[] => {
        const today = new Date();
        const formatDate = (date: Date) => format(date, 'yyyy-MM-dd');
        return [
            {key: 'today', label: "Aujourd'hui", startDate: formatDate(today), endDate: formatDate(today)},
            {
                key: '7days',
                label: 'Les 7 derniers jours',
                startDate: formatDate(subDays(today, 6)),
                endDate: formatDate(today)
            },
            {
                key: '30days',
                label: 'Les 30 derniers jours',
                startDate: formatDate(subDays(today, 29)),
                endDate: formatDate(today)
            },
            {
                key: '1year',
                label: 'Depuis 1 an',
                startDate: formatDate(subDays(today, 365)),
                endDate: formatDate(today)
            },
        ];
    };

    const periodOptions = getPeriodOptions();

    const fetchDashboardStats = async (startDate: string, endDate: string) => {
        setLoading(true);
        try {
            const response = await getDashboardStats(startDate, endDate);
            setStats(response.data);
        } catch (error) {
            if (error instanceof AxiosError && error.response?.status === 404) {
                toast.error('Aucune donnée disponible pour cette période.');
            } else {
                toast.error('Erreur lors du chargement des statistiques.');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const current = periodOptions.find(p => p.key === selectedPeriod);
        if (current) fetchDashboardStats(current.startDate, current.endDate).then();
    }, [selectedPeriod]);

    return (
        <div className="max-w-7xl mx-auto my-10 space-y-6">
            <h1 className="text-3xl font-bold text-center">Dashboard</h1>
            <PeriodSelector
                periodOptions={periodOptions}
                selectedPeriod={selectedPeriod}
                onChange={setSelectedPeriod}
            />
            {loading ? (
                <Card><CardContent className="flex justify-center py-12"><Loader2
                    className="animate-spin h-6 w-6"/></CardContent></Card>
            ) : stats ? (
                <>
                    <StatsCards stats={stats}/>
                    <StatsCharts stats={stats}/>
                    <StatsSummaryAlert stats={stats}/>
                </>
            ) : (
                <Card><CardContent className="text-center py-12 text-muted">Aucune donnée
                    disponible</CardContent></Card>
            )}
        </div>
    );
};

export default Dashboard;
