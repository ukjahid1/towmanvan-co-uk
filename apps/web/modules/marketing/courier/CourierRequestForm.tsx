"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCourierRequestMutation } from "@marketing/courier/lib/api";
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
export const courierFormSchema = z.object({
	fullName: z.string(),
	contactNumber: z.string(),
	email: z.string().email(),
	pickupLocation: z.object({
		lat: z.number(),
		lng: z.number(),
	}),

	dropoffLocation: z.object({
		lat: z.number(),
		lng: z.number(),
	}),
	packageDetails: z.string().min(1, "Description is required"),

	preferredDateTime: z.preprocess(
		(val) => (typeof val === "string" ? new Date(val) : val),
		z.date(),
	),
	deliverySpeed: z.enum(["SAME_DAY", "NEXT_DAY", "STANDARD"], {
		required_error: "Please select one",
	}),
	additionalInstructions: z.string().optional(),
});

export type CourierFormValues = z.infer<typeof courierFormSchema>;

const courierSchema = courierFormSchema;

export default function CourierForm() {
	const form = useForm<CourierFormValues>({
		resolver: zodResolver(courierSchema),
		defaultValues: {
			fullName: "",
			contactNumber: "",
			email: "",
			packageDetails: "",
			additionalInstructions: "",

			pickupLocation: undefined,
			dropoffLocation: undefined,
			preferredDateTime: new Date(),
		},
	});

	const { mutate, isPending } = useCourierRequestMutation();

	const onSubmit = (data: CourierFormValues) => {
		console.log(data);
		console.log(JSON.stringify(data, null, 2));

		mutate(data, {
			onSuccess: () => {
				toast.success("Courier request submitted!");
				form.reset(); // reset form on success
			},
			onError: () => {
				toast.error("Failed to submit courier request");
				// console.error("Courier quote error:", error);
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

				{/* ContactNumber */}
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

				{/* Delivery Speed */}
				<FormField
					control={form.control}
					name="deliverySpeed"
					render={({ field }) => (
						<FormItem>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger className="bg-primary/10 text-muted-foreground placeholder-fd-muted-foreground rounded-xl px-4 py-6 shadow-none border-none focus:ring-2 focus:ring-primary focus:outline-none">
										<SelectValue placeholder="Delivery Speed" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{[
										{ key: "Same Day", value: "SAME_DAY" },
										{ key: "Next Day", value: "NEXT_DAY" },
										{
											key: "Standard",
											value: "STANDARD",
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

				{/* Package Details */}
				<FormField
					control={form.control}
					name="packageDetails"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea
									className="bg-primary/10 text-muted-foreground placeholder-fd-muted-foreground rounded-xl px-4 py-6 shadow-none border-none focus:ring-2 focus:ring-primary focus:outline-none "
									placeholder="Your Items Description (What are you moving?)"
									rows={3}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Additional Instructions */}
				<FormField
					control={form.control}
					name="additionalInstructions"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea
									className="bg-primary/10 text-muted-foreground placeholder-fd-muted-foreground rounded-xl px-4 py-6 shadow-none border-none focus:ring-2 focus:ring-primary focus:outline-none "
									placeholder="Additional Instructions (Optional)"
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
									label="Select Pickup Location"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Drop-off Location */}

				<FormField
					control={form.control}
					name="dropoffLocation"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<LocationPickerDialog
									value={field.value}
									onChange={field.onChange}
									label="Select Drop-off Location"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Courier Date and Time */}
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
