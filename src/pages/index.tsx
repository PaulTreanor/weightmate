import React, { useState } from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Header from "@/components/Header"

const IndexPage: React.FC<PageProps> = () => {
	const [unit, setUnit] = useState<"kg" | "lbs" | "stone">("kg")
	return (
		<div>
			<Header unit={unit} setUnit={setUnit} />
			<p>This is a test</p>
			<Button>Click me</Button>
			<Input placeholder="Type something..." />
		</div>
	)
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
