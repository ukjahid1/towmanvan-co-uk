"use client";

import { MapPicker } from "@marketing/shared/components/MapPicker";
import { reverseGeocode } from "@marketing/shared/lib/ReverseGeocode";
import { Button } from "@ui/components/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@ui/components/dialog";
import { useState } from "react";

type Props = {
	label: string;
	value: { lat: number; lng: number } | null;
	onChange: (value: { lat: number; lng: number }) => void;
};

export const LocationPickerDialog = ({ label, value, onChange }: Props) => {
	const [tempLocation, setTempLocation] = useState(value);
	const [open, setOpen] = useState(false);
	const [placeName, setPlaceName] = useState<string | null>(null);

	const handleLocationChange = async (loc: { lat: number; lng: number }) => {
		onChange(loc);
		try {
			const name = await reverseGeocode(loc.lat, loc.lng);
			setPlaceName(name);
		} catch {
			setPlaceName(null);
		}
		setOpen(false);
	};

	const handleConfirm = () => {
		if (tempLocation) {
			onChange(tempLocation);
			handleLocationChange(tempLocation);
		}
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild className="w-full text-start">
				<Button
					variant="ghost"
					className="h-auto w-full bg-primary/10 text-muted-foreground placeholder-fd-muted-foreground rounded-xl px-4 py-3 shadow-none border-none focus:ring-2 focus:ring-fd-primary focus:outline-none"
				>
					{placeName ||
						(value
							? `📍 ${value.lat.toFixed(4)}, ${value.lng.toFixed(4)}`
							: label)}
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-3xl">
				<DialogHeader>
					<DialogTitle>Pick a location</DialogTitle>
					<DialogDescription>
						Please click on the map to point to a location.
					</DialogDescription>
				</DialogHeader>

				<div className="h-[400px] w-full rounded-md overflow-hidden">
					<MapPicker
						location={tempLocation}
						onChange={(loc) => setTempLocation(loc)}
					/>
				</div>

				<DialogFooter className="mt-4">
					<Button variant="ghost" onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button onClick={handleConfirm}>Confirm</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
