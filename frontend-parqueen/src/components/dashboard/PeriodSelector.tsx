import {Button} from "../common/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../common/card";
import {Calendar} from "lucide-react";
import type {Period, PeriodOption} from "./types";

interface Props {
    periodOptions: PeriodOption[];
    selectedPeriod: Period;
    onChange: (period: Period) => void;
}

export const PeriodSelector = ({periodOptions, selectedPeriod, onChange}: Props) => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5"/>
                Période d'analyse
            </CardTitle>
            <CardDescription>
                Sélectionnez la période pour laquelle vous souhaitez voir les statistiques
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-wrap gap-2">
                {periodOptions.map((option) => (
                    <Button
                        key={option.key}
                        variant={selectedPeriod === option.key ? "default" : "outline"}
                        onClick={() => onChange(option.key)}
                    >
                        {option.label}
                    </Button>
                ))}
            </div>
        </CardContent>
    </Card>
);
