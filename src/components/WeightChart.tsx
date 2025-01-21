import React from 'react'
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { WeightEntry } from "../types"
import { convertFromKg } from "../utils/unitConversions"

type WeightChartProps = {
	data: WeightEntry[]
	unit: "kg" | "lbs" | "stone"
}

export default function WeightChart({ data, unit }: WeightChartProps) {
	const chartData = data.map((entry) => ({
		date: new Date(entry.date).toLocaleDateString(),
		weight: Number(convertFromKg(entry.weight, unit).toFixed(1)),
	}))

	return (
		<Card className="w-full mb-8">
			<CardHeader>
				<CardTitle>Weight Trend</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartContainer
					config={{
						weight: {
							label: `Weight (${unit})`,
							color: "hsl(var(--chart-1))",
						},
					}}
					className="h-[300px]"
				>
					<ResponsiveContainer width="100%" height="100%">
						<LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="date" />
							<YAxis />
							<ChartTooltip content={<ChartTooltipContent />} />
							<Line type="monotone" dataKey="weight" stroke="var(--color-weight)" name="Weight" />
						</LineChart>
					</ResponsiveContainer>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
