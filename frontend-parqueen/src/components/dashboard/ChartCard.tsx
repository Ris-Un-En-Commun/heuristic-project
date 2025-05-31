import {Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../common/card";

type ChartType = 'bar' | 'pie';

interface ChartCardProps {
    title: string;
    description: string;
    data: { name: string; value: number; color?: string }[];
    type: ChartType;
}

export const ChartCard = ({title, description, data, type}: ChartCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    {type === 'bar' ? (
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80}/>
                            <YAxis/>
                            <Tooltip/>
                            <Bar dataKey="value" fill="#3b82f6"/>
                        </BarChart>
                    ) : (
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%" cy="50%"
                                innerRadius={60} outerRadius={120}
                                dataKey="value"
                                label={({name, value}) => `${name}: ${value}%`}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color || '#8884d8'}/>
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`${value}%`, '']}/>
                        </PieChart>
                    )}
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};
