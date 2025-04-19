"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LocationPickerDialog } from "@marketing/shared/components/LocationPickerDialog";
import { Button } from "@ui/components/button";
import { Calendar } from "@ui/components/calendar";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@ui/components/form";
import { Input } from "@ui/components/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@ui/components/popover";
import {} from "@ui/components/popover";
import { ScrollArea } from "@ui/components/scroll-area";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@ui/components/select";
import { Textarea } from "@ui/components/textarea";
import { cn } from "@ui/lib";
import axios from "axios";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

import { useForm } from "react-hook-form";

import { toast } from "sonner";
import { z } from "zod";

export const scrapFormSchema = z.object({
	fullName: z.string().min(1, "Full name is required"),
	email: z.string().email("Invalid email"),
	contactNumber: z.string().min(10, "Invalid phone number"),
	pickupLocation: z.object({
		lat: z.number(),
		lng: z.number(),
	}),
	additionalInstruction: z.string().optional(),
	vehicleMake: z.string().min(1, "Vehicle make is required"),
	vehicleModel: z.string().min(1, "Vehicle model is required"),
	vehicleYear: z.string().min(1, "Vehicle year is required"),
	vehicleColour: z.string().min(1, "Vehicle colour is required"),
	vehicleRegistration: z.string().min(1, "Vehicle registration is required"),
	vehicleCondition: z.enum(
		["EXCELLENT", "GOOD", "FAIR", "POOR", "DAMAGED", "NOT_SURE"],
		{ required_error: "Please select one" },
	),
	preferredDateTime: z.preprocess(
		(val) => (typeof val === "string" ? new Date(val) : val),
		z.date(),
	),
	actionType: z.enum(["SCRAP", "SELL"], {
		required_error: "Please select one",
	}),
});

const scrapSchema = scrapFormSchema;

type ScrapFormValues = z.infer<typeof scrapSchema>;

export default function ScrapForm() {
	const [isOpen, setIsOpen] = useState(false);
	const [time, setTime] = useState<string>("05:00");
	const [date, setDate] = useState<Date | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const form = useForm<ScrapFormValues>({
		resolver: zodResolver(scrapSchema),
		defaultValues: {
			fullName: "",
			email: "",
			contactNumber: "",
			pickupLocation: undefined,
			additionalInstruction: "",
			vehicleMake: "",
			vehicleModel: "",
			vehicleYear: "",
			vehicleColour: "",
			vehicleRegistration: "",
			preferredDateTime: new Date(),
		},
	});

	const postScrapRequest = async (data: ScrapFormValues) => {
		try {
			setIsLoading(true);
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/scrap`,
				data,
			);
			if (response.status === 200) {
				toast.success("Scrap and sell quote submitted!");
				form.reset(); // reset form on success
			} else {
				toast.error("Failed to submit scrap and sell quote");
			}
		} catch (error) {
			console.error("Error submitting form:", error);
			toast.error("Failed to submit scrap and sell quote");
		} finally {
			setIsLoading(false);
		}
	};

	const onSubmit = (data: ScrapFormValues) => {
		postScrapRequest(data);
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

				{/* Contact Number */}
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
				{/* Make */}
				<FormField
					control={form.control}
					name="vehicleMake"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									className="bg-primary/10 text-muted-foreground placeholder-fd-muted-foreground rounded-xl px-4 py-6 shadow-none border-none focus:ring-2 focus:ring-primary focus:outline-none "
									placeholder="Make"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* Model */}
				<FormField
					control={form.control}
					name="vehicleModel"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									className="bg-primary/10 text-muted-foreground placeholder-fd-muted-foreground rounded-xl px-4 py-6 shadow-none border-none focus:ring-2 focus:ring-primary focus:outline-none "
									placeholder="Model"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* Year */}
				<FormField
					control={form.control}
					name="vehicleYear"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									className="bg-primary/10 text-muted-foreground placeholder-fd-muted-foreground rounded-xl px-4 py-6 shadow-none border-none focus:ring-2 focus:ring-primary focus:outline-none "
									placeholder="Year"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* Colour */}
				<FormField
					control={form.control}
					name="vehicleColour"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									className="bg-primary/10 text-muted-foreground placeholder-fd-muted-foreground rounded-xl px-4 py-6 shadow-none border-none focus:ring-2 focus:ring-primary focus:outline-none "
									placeholder="Colour"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* Registration */}
				<FormField
					control={form.control}
					name="vehicleRegistration"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									className="bg-primary/10 text-muted-foreground placeholder-fd-muted-foreground rounded-xl px-4 py-6 shadow-none border-none focus:ring-2 focus:ring-primary focus:outline-none "
									placeholder="Registration"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Vehicle Condition */}
				<FormField
					control={form.control}
					name="vehicleCondition"
					render={({ field }) => (
						<FormItem>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger className="bg-primary/10 text-muted-foreground placeholder-fd-muted-foreground rounded-xl px-4 py-6 shadow-none border-none focus:ring-2 focus:ring-primary focus:outline-none">
										<SelectValue placeholder="Select Vehicle Condition" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{[
										{
											key: "Excellent",
											value: "EXCELLENT",
										},
										{
											key: "Good",
											value: "GOOD",
										},
										{
											key: "Fair",
											value: "FAIR",
										},
										{
											key: "Poor",
											value: "POOR",
										},
										{
											key: "Damaged",
											value: "DAMAGED",
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

				{/* Action Type */}
				<FormField
					control={form.control}
					name="actionType"
					render={({ field }) => (
						<FormItem>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger className="bg-primary/10 text-muted-foreground placeholder-fd-muted-foreground rounded-xl px-4 py-6 shadow-none border-none focus:ring-2 focus:ring-primary focus:outline-none">
										<SelectValue placeholder="Select One" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{[
										{ key: "Scrap", value: "SCRAP" },
										{ key: "Sell", value: "SELL" },
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

				{/* Additional Instructions */}
				<FormField
					control={form.control}
					name="additionalInstruction"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea
									className="bg-primary/10 text-muted-foreground placeholder-fd-muted-foreground rounded-xl px-4 py-6 shadow-none border-none focus:ring-2 focus:ring-primary focus:outline-none "
									placeholder="Additional Instructions"
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

				{/* Scrap Date and Time */}
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
