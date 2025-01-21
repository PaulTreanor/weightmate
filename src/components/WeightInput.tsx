import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { convertToKg } from "../utils/unitConversions"

type WeightInputProps = {
    onAddWeight: (weight: number) => void
    unit: "kg" | "lbs" | "stone"
}

export default function WeightInput({ onAddWeight, unit }: WeightInputProps) {
    const [weight, setWeight] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const weightInKg = convertToKg(Number.parseFloat(weight), unit)
        onAddWeight(weightInKg)
        setWeight("")
    }

    return (
        <form onSubmit={handleSubmit} className="mb-8 flex items-center justify-center space-x-2">
            <label htmlFor="weight" className="text-lg font-medium">
                What is your weight today?
            </label>
            <Input
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-24"
                step="0.1"
                required
            />
            <Button type="submit">Add Weight</Button>
        </form>
    )
}
