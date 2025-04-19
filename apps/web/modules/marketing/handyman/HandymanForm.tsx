"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHandymanRequestMutation } from "@marketing/handyman/lib/api";
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

export const handymanFormSchema = z.object({
	fullName: z.string().min(1, "Full name is required"),
	email: z.string().email("Invalid email"),
	contactNumber: z.string().min(10, "Invalid phone number"),
	handymanTaskType: z.enum(
		[
			"PLUMBING",
			"ELECTRICAL",
			"CARPENTRY",
			"PAINTING",
			"GARDENING",
			"CLEANING",
			"HOME_IMPROVEMENTS",
			"FURNITURE_ASSEMBLY",
			"OTHER",
		],
		{ required_error: "Please select one" },
	),
	handymanTaskDescription: z.string().min(1, "Description is required"),
	handymanLocation: z.object({
		lat: z.number(),
		lng: z.number(),
	}),
	handymanDateTime: z.preprocess(
		(val) => (typeof val === "string" ? new Date(val) : val),
		z.date(),
	),
	additionalNotes: z.string().optional(),
});

const handymanSchema = handymanFormSchema;

type HandymanFormValues = z.infer<typeof handymanSchema>;

export default function HandymanForm() {
	const form = useForm<HandymanFormValues>({
		resolver: zodResolver(handymanSchema),
		defaultValues: {
			fullName: "",
			contactNumber: "",
			email: "",
			handymanLocation: undefined,
			additionalNotes: "",
			handymanTaskDescription: "",
			handymanDateTime: new Date(),
		},
	});

	const { mutate, isPending } = useHandymanRequestMutation();

	const onSubmit = (data: HandymanFormValues) => {
		console.log(data);
		console.log(JSON.stringify(data, null, 2));

		mutate(data, {
			onSuccess: () => {
				toast.success("Handyman request submitted!");
				form.reset(); // reset form on success
			},
			onError: () => {
				toast.error("Failed to submit handyman request");
				// console.error("Handyman quote error:", error);
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

				{/* Task Type */}
				<FormField
					control={form.control}
					name="handymanTaskType"
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
										{ key: "Plumbing", value: "PLUMBING" },
										{
											key: "Electrical",
											value: "ELECTRICAL",
										},
										{
											key: "Carpentry",
											value: "CARPENTRY",
										},
										{
											key: "Painting",
											value: "PAINTING",
										},
										{
											key: "Gardening",
											value: "GARDENING",
										},
										{
											key: "Cleaning",
											value: "CLEANING",
										},
										{
											key: "Home Improvements",
											value: "HOME_IMPROVEMENTS",
										},
										{
											key: "Furniture Assembly",
											value: "FURNITURE_ASSEMBLY",
										},
										{
											key: "Other",
											value: "OTHER",
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

				{/* Task Description */}
				<FormField
					control={form.control}
					name="handymanTaskDescription"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea
									className="bg-primary/10 text-muted-foreground placeholder-fd-muted-foreground rounded-xl px-4 py-6 shadow-none border-none focus:ring-2 focus:ring-primary focus:outline-none "
									placeholder="Provide a brief description of the task you need assistance with"
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
					name="additionalNotes"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea
									className="bg-primary/10 text-muted-foreground placeholder-fd-muted-foreground rounded-xl px-4 py-6 shadow-none border-none focus:ring-2 focus:ring-primary focus:outline-none "
									placeholder="Additional Notes (Optional)"
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
					name="handymanLocation"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<LocationPickerDialog
									value={field.value}
									onChange={field.onChange}
									label="Your Address"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Preffered Date and Time */}
				<FormField
					control={form.control}
					name="handymanDateTime"
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
