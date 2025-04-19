export async function reverseGeocode(
	lat: number,
	lng: number,
): Promise<string> {
	const res = await fetch(
		`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
		{
			headers: {
				"User-Agent": "TowManVan/1.0 (no-reply@towmanvan.com)",
			},
		},
	);

	if (!res.ok) {
		throw new Error("Failed to reverse geocode location");
	}

	const data = await res.json();
	return data.display_name || "Unknown location";
}
