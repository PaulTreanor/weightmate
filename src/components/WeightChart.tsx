import React, { useState } from 'react'
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { WeightEntry } from "../types"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { CardDescription } from "@/components/ui/card"

type WeightChartProps = {
	data: WeightEntry[]
}

type TimeRange = 'all' | '12m' | '3m'

export default function WeightChart({ data }: WeightChartProps) {
    const [timeRange, setTimeRange] = useState<TimeRange>('3m')

	const filteredData = data.filter(entry => {
		const entryDate = new Date(entry.date)
		const now = new Date()
		
		switch (timeRange) {
			case '12m':
				return entryDate >= new Date(now.setMonth(now.getMonth() - 12))
			case '3m':
				return entryDate >= new Date(now.setMonth(now.getMonth() - 3))
			default:
				return true
		}
	})
    const chartData = filteredData
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map((entry) => ({
            date: new Date(entry.date).getTime(),
            weight: entry.weight
        }))

	return (
		<Card className="w-full max-w-[900px] mx-auto mb-8">
			<CardHeader>
            <div className="flex items-center justify-between">
					<CardTitle>Weight Trend</CardTitle>
					<div className="flex gap-2">
						<button
							onClick={() => setTimeRange('all')}
							className={`px-3 py-1 rounded ${
								timeRange === 'all' 
									? 'bg-primary text-primary-foreground' 
									: 'bg-secondary'
							}`}
						>
							All Time
						</button>
						<button
							onClick={() => setTimeRange('12m')}
							className={`px-3 py-1 rounded ${
								timeRange === '12m' 
									? 'bg-primary text-primary-foreground' 
									: 'bg-secondary'
							}`}
						>
							12 Months
						</button>
						<button
							onClick={() => setTimeRange('3m')}
							className={`px-3 py-1 rounded ${
								timeRange === '3m' 
									? 'bg-primary text-primary-foreground' 
									: 'bg-secondary'
							}`}
						>
							3 Months
						</button>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<ChartContainer
					config={{
						weight: {
							label: `Weight (kg)`,
							color: "hsl(var(--chart-1))",
						},
					}}
					className="h-[200px] sm:h-[300px] md:h-[400px]"
				>
					<ResponsiveContainer width="100%" height="100%">
						<LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis 
								dataKey="date" 
								type="number"
								domain={['dataMin', 'dataMax']}
								scale="time"
								tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
							/>
							<YAxis
								domain={[(dataMin: number) => dataMin - 10, (dataMax: number) => dataMax + 10]}
							/>
							<ChartTooltip content={<ChartTooltipContent />} />
							<Line type="monotone" dataKey="weight" stroke="var(--color-weight)" name="Weight" />
						</LineChart>
					</ResponsiveContainer>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
