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
		<Card>
			<CardHeader>
				<CardTitle className="flex justify-between items-center">
					Data History
					<Button onClick={() => setIsOpen(!isOpen)}>{isOpen ? "Hide" : "Show"}</Button>
				</CardTitle>
			</CardHeader>
			{isOpen && (
				<CardContent>
					<ul className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96">
						{data.map((entry: { date: string; weight: number }, index: number) => (
							<li key={index} className="mb-2">
								{formatDate(entry.date)}: {entry.weight} kg
							</li>
						))}
					</ul>
				</CardContent>
			)}
		</Card>
	)
}