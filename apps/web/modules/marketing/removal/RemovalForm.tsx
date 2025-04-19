"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRemovalFormMutation } from "@marketing/removal/lib/api";
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

export const removalFormSchema = z.object({
	fullName: z.string().min(1, "Full name is required"),
	email: z.string().email("Invalid email"),
	contactNumber: z.string().min(10, "Invalid phone number"),
	itamsDescription: z.string().min(1, "Description is required"),

	pickupLocation: z.object({
		lat: z.number(),
		lng: z.number(),
	}),

	dropoffLocation: z.object({
		lat: z.number(),
		lng: z.number(),
	}),

	preferredDateTime: z.preprocess(
		(val) => (typeof val === "string" ? new Date(val) : val),
		z.date(),
	),

	assistance: z.enum(["NONE", "DRIVER", "DRIVER_PLUS_ONE"], {
		required_error: "Please select one",
	}),

	vehicleSize: z.enum(
		[
			"SMALL_VAN",
			"MEDIUM_VAN",
			"LONG_WHEELBASE_VAN",
			"LUTON_VAN",
			"NOT_SURE",
		],
		{ required_error: "Please select one" },
	),
});

const removalSchema = removalFormSchema;

type RemovalFormValues = z.infer<typeof removalSchema>;

export default function RemovalForm() {
	const form = useForm<RemovalFormValues>({
		resolver: zodResolver(removalSchema),
		defaultValues: {
			fullName: "",
			email: "",
			contactNumber: "",
			itamsDescription: "",
			pickupLocation: undefined,
			dropoffLocation: undefined,
			preferredDateTime: new Date(),
		},
	});

	const { mutate, isPending } = useRemovalFormMutation();

	const onSubmit = (data: RemovalFormValues) => {
		console.log(data);
		console.log(JSON.stringify(data, null, 2));

		mutate(data, {
			onSuccess: () => {
				toast.success("Removal request submitted!");
				form.reset(); // reset form on success
			},
			onError: () => {
				toast.error("Failed to submit removal request");
				// console.error("Removal quote error:", error);
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

				{/* ContaccontactNumber */}
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

				{/* Vehicle Size */}
				<FormField
					control={form.control}
					name="vehicleSize"
					render={({ field }) => (
						<FormItem>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger className="bg-primary/10 text-muted-foreground placeholder-fd-muted-foreground rounded-xl px-4 py-6 shadow-none border-none focus:ring-2 focus:ring-primary focus:outline-none">
										<SelectValue placeholder="Select Vehicle Size" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{[
										{
											key: "Small Van",
											value: "SMALL_VAN",
										},
										{
											key: "Medium Van",
											value: "MEDIUM_VAN",
										},
										{
											key: "Long Wheelbase van",
											value: "LONG_WHEELBASE_VAN",
										},
										{
											key: "Luton Van",
											value: "LUTON_VAN",
										},
										{ key: "Not Sure", value: "NOT_SURE" },
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

				{/* Assistance Type */}
				<FormField
					control={form.control}
					name="assistance"
					render={({ field }) => (
						<FormItem>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger className="bg-primary/10 text-muted-foreground placeholder-fd-muted-foreground rounded-xl px-4 py-6 shadow-none border-none focus:ring-2 focus:ring-primary focus:outline-none">
										<SelectValue placeholder="Select Required Assistance" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{[
										{ key: "None", value: "NONE" },
										{ key: "Driver", value: "DRIVER" },
										{
											key: "Driver + One",
											value: "DRIVER_PLUS_ONE",
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

				{/* Items Description */}
				<FormField
					control={form.control}
					name="itamsDescription"
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

				{/* Removal Date and Time */}
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
