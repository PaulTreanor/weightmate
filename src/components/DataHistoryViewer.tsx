import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type DataHistoryViewerProps = {
	data: any
}

export default function DataHistoryViewer({ data }: DataHistoryViewerProps) {
    const [isOpen, setIsOpen] = useState(false)
    
    const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date)
	}

	return (
		<Card className="w-full max-w-[900px] mx-auto mb-8">
			<CardHeader>
				<CardTitle className="flex justify-between items-center">
					Data History
					<Button onClick={() => setIsOpen(!isOpen)}>{isOpen ? "Hide" : "Show"}</Button>
				</CardTitle>
			</CardHeader>
			{isOpen && (
				<CardContent>
					<div className="overflow-y-auto max-h-[calc(100vh-10rem)]">
						<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50 sticky top-0">
							<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Weight (kg)
							</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
						{[...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((entry: { date: string; weight: number }, index: number) => (
							<tr key={entry.date} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								{formatDate(entry.date)}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.weight}</td>
							</tr>
							))}
						</tbody>
						</table>
					</div>
				</CardContent>
			)}
		</Card>
	)
}