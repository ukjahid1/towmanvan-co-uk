"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useDrivingRequestMutation } from "@marketing/driving/lib/api";
import { LocationPickerDialog } from "@marketing/shared/components/LocationPickerDialog";
import { Button } from "@ui/components/button";
import { DateTimeInput } from "@ui/components/datetime-input";
import { DateTimePicker } from "@ui/components/datetime-picker";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@ui/components/form";
import { Input } from "@ui/components/input";
import {} from "@ui/components/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@ui/components/select";
import { Textarea } from "@ui/components/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const drivingFormSchema = z.object({
	fullName: z.string().min(1, "Full name is required"),
	email: z.string().email("Invalid email"),
	contactNumber: z.string().min(10, "Invalid phone number"),
	pickupLocation: z.object({
		lat: z.number(),
		lng: z.number(),
	}),
	preferredDateTime: z.preprocess(
		(val) => (typeof val === "string" ? new Date(val) : val),
		z.date(),
	),
	lessonTime: z.enum(["WEEKDAYS", "WEEKENDS", "EVENINGS", "ANYTIME"], {
		required_error: "Please select one",
	}),
	transmissionType: z.enum(["MANUAL", "AUTOMATIC"], {
		required_error: "Please select one",
	}),
	additionalNotes: z.string().optional(),
});

const drivingSchema = drivingFormSchema;

type DrivingFormValues = z.infer<typeof drivingSchema>;

export default function DrivingForm() {
	const form = useForm<DrivingFormValues>({
		resolver: zodResolver(drivingSchema),
		defaultValues: {
			fullName: "",
			email: "",
			contactNumber: "",
			additionalNotes: "",
			pickupLocation: undefined,
			preferredDateTime: new Date(),
		},
	});

	const { mutate, isPending } = useDrivingRequestMutation();

	const onSubmit = (data: DrivingFormValues) => {
		mutate(data, {
			onSuccess: () => {
				toast.success("Driving quote submitted!");
				form.reset(); // reset form on success
			},
			onError: () => {
				toast.error("Failed to submit driving quote");
				// console.error("Driving quote error:", error);
			},
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4 max-w-xl mx-auto"
			>
				{/* Full Name */}
				<FormField
					control={form.control}
					name="fullName"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									className="bg-primary/10 text-muted-foreground placeholder-fd-muted-foreground rounded-xl px-4 py-6 shadow-none border-none focus:ring-2 focus:ring-primary focus:outline-none "
									placeholder="Full Name"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Email */}
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									className="bg-primary/10 text-muted-foreground placeholder-fd-muted-foreground rounded-xl px-4 py-6 shadow-none border-none focus:ring-2 focus:ring-primary focus:outline-none "
									placeholder="Email"
									type="Email"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Mobile */}
				<FormField
					control={form.control}
					name="contactNumber"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									className="bg-primary/10 text-muted-foreground placeholder-fd-muted-foreground rounded-xl px-4 py-6 shadow-none border-none focus:ring-2 focus:ring-primary focus:outline-none "
									placeholder="Phone Number"
									type="tel"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Driving Type */}
				<FormField
					control={form.control}
					name="transmissionType"
					render={({ field }) => (
						<FormItem>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger className="bg-primary/10 text-muted-foreground placeholder-fd-muted-foreground rounded-xl px-4 py-6 shadow-none border-none focus:ring-2 focus:ring-primary focus:outline-none">
										<SelectValue placeholder="Transmission Type" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{[
										{ key: "Manual", value: "MANUAL" },
										{
											key: "Automatic",
											value: "AUTOMATIC",
										},
									].map((element) => (
										<SelectItem
											key={element.key}
											value={element.value}
										>
											{element.key}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Driving Type */}
				<FormField
					control={form.control}
					name="lessonTime"
					render={({ field }) => (
						<FormItem>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger className="bg-primary/10 text-muted-foreground placeholder-fd-muted-foreground rounded-xl px-4 py-6 shadow-none border-none focus:ring-2 focus:ring-primary focus:outline-none">
										<SelectValue placeholder="Preferred Lesson Times" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{[
										{ key: "Weekdays", value: "WEEKDAYS" },
										{
											key: "Weekends",
											value: "WEEKENDS",
										},
										{
											key: "Evening",
											value: "EVENINGS",
										},
										{
											key: "Anytime",
											value: "ANYTIME",
										},
									].map((element) => (
										<SelectItem
											key={element.key}
											value={element.value}
										>
											{element.key}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Vehicle Description */}
				<FormField
					control={form.control}
					name="additionalNotes"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea
									className="bg-primary/10 text-muted-foreground placeholder-fd-muted-foreground rounded-xl px-4 py-6 shadow-none border-none focus:ring-2 focus:ring-primary focus:outline-none "
									placeholder="Your Vehicle Description (Make, Model, Year, etc.)"
									rows={3}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Pickup Location */}
				<FormField
					control={form.control}
					name="pickupLocation"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<LocationPickerDialog
									value={field.value}
									onChange={field.onChange}
									label="Location"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Driving Date and Time */}
				<FormField
					control={form.control}
					name="preferredDateTime"
					render={({ field }) => (
						<FormItem className="flex flex-col ">
							<FormLabel className="text-start">
								Prefferd Date & Time
							</FormLabel>
							<FormControl>
								<DateTimePicker
									value={field.value}
									onChange={field.onChange}
									use12HourFormat
									timePicker={{ hour: true, minute: true }}
									renderTrigger={({
										open,
										value,
										setOpen,
									}) => (
										<DateTimeInput
											value={value}
											onChange={(x) =>
												!open && field.onChange(x)
											}
											format="dd/MM/yyyy hh:mm aa"
											disabled={open}
											onCalendarClick={() =>
												setOpen(!open)
											}
										/>
									)}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Submit Button */}
				<Button
					type="submit"
					variant="default"
					className="w-full h-auto bg-fd-primary text-fd-primary-foreground rounded-xl py-3 text-center hover:bg-fd-primary/90 focus:ring-2 focus:ring-fd-primary/50 focus:outline-none"
					disabled={isPending}
				>
					{isPending ? "Submitting..." : "Submit"}
				</Button>
			</form>
		</Form>
	);
}
