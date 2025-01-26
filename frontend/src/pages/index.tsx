import React, { useState, useEffect } from "react"
import { getCurrentUser, signOut } from 'aws-amplify/auth'
import type { HeadFC, PageProps } from "gatsby"
import Header from "@/components/Header"
import WeightInput from "@/components/WeightInput"
import WeightChart from "@/components/WeightChart"
import DataHistoryViewer from "@/components/DataHistoryViewer"
import type { WeightEntry } from "@/types"
import mockData from "../data/mockData"
import { AuthModal } from "@/components/AuthModal"

const IndexPage: React.FC<PageProps> = () => {
	const [weightData, setWeightData] = useState<WeightEntry[]>(mockData)
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	const addWeight = (weight: number) => {
		const newEntry: WeightEntry = {
			date: new Date().toISOString(),
			weight: weight,
		}
		setWeightData([...weightData, newEntry])
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
