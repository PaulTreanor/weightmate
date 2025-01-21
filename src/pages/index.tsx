import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const IndexPage: React.FC<PageProps> = () => {
  return (
	<div>
	  <h1>Hello World</h1>
	  <p>This is a test</p>
	  <Button>Click me</Button>
	  <Input placeholder="Type something..." />
	</div>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
