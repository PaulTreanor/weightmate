import React, { useState } from "react"
import type { HeadFC, PageProps } from "gatsby"
import Header from "@/components/Header"
import WeightInput from "@/components/WeightInput"
import WeightChart from "@/components/WeightChart"
import JsonViewer from "@/components/JsonViewer"
import type { WeightEntry } from "@/types"
import mockData from "../data/mockData"

const IndexPage: React.FC<PageProps> = () => {
	const [unit, setUnit] = useState<"kg" | "lbs" | "stone">("kg")
	const [weightData, setWeightData] = useState<WeightEntry[]>(mockData)

	const addWeight = (weight: number) => {
		const newEntry: WeightEntry = {
			date: new Date().toISOString(),
			weight: weight,
		}
		setWeightData([...weightData, newEntry])
	  }
	return (
		<div className="min-h-screen bg-gray-100">
		<Header unit={unit} setUnit={setUnit} />
			<main className="container mx-auto px-4 py-8">
				<WeightInput onAddWeight={addWeight} unit={unit} />
				<WeightChart data={weightData} unit={unit} />
				<JsonViewer data={weightData} />
			</main>
	  </div>
	)
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
