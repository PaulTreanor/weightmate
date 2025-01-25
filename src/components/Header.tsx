import React from "react"
import { Button } from "@/components/ui/button"
  
export default function Header({ handleLogout }: { handleLogout: () => void }) {
    return (
        <header className="bg-white shadow">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-center">WeightTrack.app</h1>
                <Button variant="outline" onClick={handleLogout}>Log out</Button>
            </div>
        </header>
    )
}
  