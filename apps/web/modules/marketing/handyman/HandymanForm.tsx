"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LocationPickerDialog } from "@marketing/shared/components/LocationPickerDialog";
import { Button } from "@ui/components/button";
import { Calendar } from "@ui/components/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@ui/components/popover";
import { ScrollArea } from "@ui/components/scroll-area";
import { cn } from "@ui/lib";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

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

import axios from "axios";
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
	preferredDateTime: z.preprocess(
		(val) => (typeof val === "string" ? new Date(val) : val),
		z.date(),
	),
	additionalNotes: z.string().optional(),
});

const handymanSchema = handymanFormSchema;

type HandymanFormValues = z.infer<typeof handymanSchema>;

export default function HandymanForm() {
	const [isOpen, setIsOpen] = useState(false);
	const [time, setTime] = useState<string>("05:00");
	const [date, setDate] = useState<Date | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const form = useForm<HandymanFormValues>({
		resolver: zodResolver(handymanSchema),
		defaultValues: {
			fullName: "",
			contactNumber: "",
			email: "",
			handymanLocation: undefined,
			additionalNotes: "",
			handymanTaskDescription: "",
		},
	});

	const postHandymanRequest = async (data: HandymanFormValues) => {
		try {
			setIsLoading(true);
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/quote`,
				data,
			);
			if (response.status === 200) {
				toast.success("Recovery quote submitted!");
				form.reset(); // reset form on success
			} else {
				toast.error("Failed to submit recovery quote");
			}
		} catch (error) {
			console.error("Error submitting form:", error);
			toast.error("Failed to submit recovery quote");
		} finally {
			setIsLoading(false);
		}
	};

	const onSubmit = (data: HandymanFormValues) => {
		postHandymanRequest(data);
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
				<div className="flex w-full gap-4">
					<FormField
						control={form.control}
						name="preferredDateTime"
						render={({ field }) => (
							<FormItem className="flex flex-col w-full">
								<FormLabel>Preferred Date</FormLabel>
								<Popover open={isOpen} onOpenChange={setIsOpen}>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={"outline"}
												className={cn(
													"w-full font-normal",
													!field.value &&
														"text-muted-foreground",
												)}
											>
												{field.value ? (
													`${format(field.value, "PPP")}, ${time}`
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent
										className="w-auto p-0"
										align="start"
									>
										<Calendar
											mode="single"
											captionLayout="dropdown"
											selected={date || field.value}
											onSelect={(selectedDate) => {
												const [hours, minutes] =
													time?.split(":") || [];
												selectedDate?.setHours(
													Number.parseInt(hours),
													Number.parseInt(minutes),
												);
												// biome-ignore lint/style/noNonNullAssertion: <explanation>
												setDate(selectedDate!);
												field.onChange(selectedDate);
											}}
											onDayClick={() => setIsOpen(false)}
											fromYear={2000}
											toYear={new Date().getFullYear()}
											// disabled={(date) =>
											//   Number(date) < Date.now() - 1000 * 60 * 60 * 24 ||
											//   Number(date) > Date.now() + 1000 * 60 * 60 * 24 * 30
											// }
											defaultMonth={field.value}
										/>
									</PopoverContent>
								</Popover>
								{/* <FormDescription>
									Set your date and time.
								</FormDescription> */}
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="preferredDateTime"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Time</FormLabel>
								<FormControl>
									<Select
										defaultValue={time || "00:00"}
										onValueChange={(e) => {
											setTime(e);
											if (date) {
												const [hours, minutes] =
													e.split(":");
												const newDate = new Date(
													date.getTime(),
												);
												newDate.setHours(
													Number.parseInt(hours),
													Number.parseInt(minutes),
												);
												setDate(newDate);
												field.onChange(newDate);
											}
										}}
									>
										<SelectTrigger className="font-normal focus:ring-0 w-[120px] focus:ring-offset-0">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<ScrollArea className="h-[15rem]">
												{Array.from({
													length: 96,
												}).map((_, i) => {
													const hour = Math.floor(
														i / 4,
													)
														.toString()
														.padStart(2, "0");
													const minute = (
														(i % 4) *
														15
													)
														.toString()
														.padStart(2, "0");
													return (
														<SelectItem
															key={i}
															value={`${hour}:${minute}`}
														>
															{hour}:{minute}
														</SelectItem>
													);
												})}
											</ScrollArea>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Submit Button */}
				<Button
					type="submit"
					variant="default"
					className="w-full h-auto bg-fd-primary text-fd-primary-foreground rounded-xl py-3 text-center hover:bg-fd-primary/90 focus:ring-2 focus:ring-fd-primary/50 focus:outline-none"
					disabled={isLoading}
				>
					{isLoading ? "Submitting..." : "Submit"}
				</Button>
			</form>
		</Form>
	);
}
