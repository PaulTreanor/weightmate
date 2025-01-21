import React from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type HeaderProps = {
    unit: "kg" | "lbs" | "stone"
    setUnit: (unit: "kg" | "lbs" | "stone") => void
}
  
export default function Header({ unit, setUnit }: HeaderProps) {
    return (
        <header className="bg-white shadow">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Select value={unit} onValueChange={(value: "kg" | "lbs" | "stone") => setUnit(value)}>
                    <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="lbs">lbs</SelectItem>
                        <SelectItem value="stone">stone</SelectItem>
                    </SelectContent>
                </Select>
                <h1 className="text-3xl font-bold text-center">WeightTrack.app</h1>
                <Button variant="outline">Log out</Button>
            </div>
        </header>
    )
}
  