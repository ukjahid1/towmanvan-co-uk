"use client";

import { Button } from "@ui/components/button";
import { LocateFixed, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

type Props = {
	location: { lat: number; lng: number } | null;
	onChange: (loc: { lat: number; lng: number }) => void;
};

const DEFAULT_POSITION = { lat: 51.5074, lng: -0.1278 };

export const MapPicker = ({ location, onChange }: Props) => {
	const mapRef = useRef<HTMLDivElement>(null);
	const mapInstanceRef = useRef<any>(null);
	const markerRef = useRef<any>(null);
	const [loadingLocation, setLoadingLocation] = useState(false);
	const [leaflet, setLeaflet] = useState<any>(null);

	useEffect(() => {
		(async () => {
			const L = await import("leaflet");
			setLeaflet(L);

			if (!mapRef.current) return;

			if (mapInstanceRef.current) {
				mapInstanceRef.current.remove();
				mapInstanceRef.current = null;
			}

			const map = L.map(mapRef.current).setView(
				[
					location?.lat ?? DEFAULT_POSITION.lat,
					location?.lng ?? DEFAULT_POSITION.lng,
				],
				13,
			);
			mapInstanceRef.current = map;

			L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
				attribution: "© OpenStreetMap contributors",
			}).addTo(map);

			if (location) {
				const marker = L.marker([location.lat, location.lng], {
					icon: createLucideMarker(L),
				}).addTo(map);
				renderLucideMarker(marker);
				markerRef.current = marker;
			}

			map.on("click", (e: any) => {
				const latlng = e.latlng;
				if (markerRef.current) {
					markerRef.current.setLatLng(latlng);
				} else {
					const marker = L.marker(latlng, {
						icon: createLucideMarker(L),
					}).addTo(map);
					renderLucideMarker(marker);
					markerRef.current = marker;
				}
				onChange({ lat: latlng.lat, lng: latlng.lng });
			});
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const createLucideMarker = (L: any) =>
		L.divIcon({
			className: "",
			html: '<div id="lucide-marker"></div>',
			iconSize: [32, 32],
			iconAnchor: [16, 32],
		});

	const renderLucideMarker = (marker: any) => {
		const iconEl = marker.getElement();
		if (iconEl) {
			const container = iconEl.querySelector("#lucide-marker");
			if (container) {
				const root = createRoot(container);
				root.render(
					<MapPin className="text-red-600 w-8 h-8 drop-shadow-md" />,
				);
			}
		}
	};

	const goToCurrentLocation = () => {
		if (!navigator.geolocation) {
			alert("Geolocation is not supported by your browser.");
			return;
		}

		setLoadingLocation(true);

		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;
				const latlng = { lat: latitude, lng: longitude };

				if (mapInstanceRef.current) {
					mapInstanceRef.current.setView(latlng, 15);
				}

				if (markerRef.current) {
					markerRef.current.setLatLng(latlng);
				} else if (leaflet) {
					const marker = leaflet
						.marker(latlng, {
							icon: createLucideMarker(leaflet),
						})
						.addTo(mapInstanceRef.current!);
					renderLucideMarker(marker);
					markerRef.current = marker;
				}

				onChange(latlng);
				setLoadingLocation(false);
			},
			(err) => {
				console.error("Failed to get current location", err);
				alert("Could not get current location.");
				setLoadingLocation(false);
			},
		);
	};

	return (
		<div className="relative h-full w-full rounded-md overflow-hidden">
			<div ref={mapRef} className="h-full w-full z-0" />

			<Button
				onClick={goToCurrentLocation}
				disabled={loadingLocation}
				className="absolute top-4 right-4 z-10 text-sm flex items-center gap-2 px-3 py-2 rounded-md shadow"
			>
				<LocateFixed className="w-4 h-4" />
				{loadingLocation ? "Locating..." : "Use Current Location"}
			</Button>
		</div>
	);
};

export default MapPicker;
