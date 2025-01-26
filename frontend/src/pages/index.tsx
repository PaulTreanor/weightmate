import React, { useState, useEffect } from "react"
import { getCurrentUser, signOut } from 'aws-amplify/auth'
import type { HeadFC, PageProps } from "gatsby"
import Header from "@/components/Header"
import WeightInput from "@/components/WeightInput"
import WeightChart from "@/components/WeightChart"
import DataHistoryViewer from "@/components/DataHistoryViewer"
import type { WeightEntry } from "@/types"
import { AuthModal } from "@/components/AuthModal"
import { ROOT_URL, WEIGHT_END_POINT } from "../utils/endpoint"

const IndexPage: React.FC<PageProps> = () => {
	const [weightData, setWeightData] = useState<WeightEntry[]>([])
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	const fetchWeightData = async () => {
		const response = await fetch(`${ROOT_URL}${WEIGHT_END_POINT}`)
		const data = await response.json()
		setWeightData(data.weightData)
	}

	const addWeight = async (weight: number) => {
		const newEntry: WeightEntry = {
			date: new Date().toISOString(),
			weight: weight,
		}
		setWeightData([...weightData, newEntry])
		const response = await fetch(`${ROOT_URL}${WEIGHT_END_POINT}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify([newEntry]),
		})
		const data = await response.json()
		console.log(data)
	  }

	const handleAuth = () => {
		setIsAuthenticated(true)
	}

	const handleLogout = async () => {
		try {
			await signOut()
			setIsAuthenticated(false)
		} catch (error) {
			console.error('Error signing out:', error)
		}
	}

	useEffect(() => {
		checkAuthStatus()
	}, [])

	useEffect(() => {
		fetchWeightData()
	}, [])

	const checkAuthStatus = async () => {
		try {
			const user = await getCurrentUser()
			setIsAuthenticated(true)
		} catch (error) {
			setIsAuthenticated(false)
		}
	}


	return (
		<div className="min-h-screen bg-gray-100">
		<Header isLoggedIn={isAuthenticated} handleLogout={handleLogout}/>
			<main className="container mx-auto px-4 py-8">
				
					<>	
					{!isAuthenticated &&
						<AuthModal
							handleAuth={handleAuth}
						/>
					}
					<WeightInput onAddWeight={addWeight}/>
					<WeightChart data={weightData}/>
					<DataHistoryViewer data={weightData} />
					</>

			</main>
	  </div>
	)
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
