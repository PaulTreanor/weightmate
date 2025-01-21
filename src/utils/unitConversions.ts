export function convertToKg(weight: number, unit: "kg" | "lbs" | "stone"): number {
	switch (unit) {
		case "kg":
			return weight
		case "lbs":
			return weight / 2.20462
		case "stone":
			return weight * 6.35029
	}
}

export function convertFromKg(weight: number, unit: "kg" | "lbs" | "stone"): number {
	switch (unit) {
		case "kg":
			return weight
		case "lbs":
			return weight * 2.20462
		case "stone":
			return weight / 6.35029
	}
}