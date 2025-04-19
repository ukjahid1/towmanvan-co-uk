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
import { ScrollArea } from "@ui/components/scroll-area";
// import {} from "@ui/components/popover";
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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const recoveryFormSchema = z
	.object({
		fullName: z.string().min(1, "Full name is required"),
		email: z.string().email("Invalid email"),
		mobile: z.string().min(10, "Invalid phone number"),
		vehicleDescription: z.string().optional(),

		pickupLocation: z.object({
			lat: z.number(),
			lng: z.number(),
		}),

		dropoffLocation: z
			.object({
				lat: z.number(),
				lng: z.number(),
			})
			.optional(),

		recoveryDateTime: z.preprocess(
			(val) => (typeof val === "string" ? new Date(val) : val),
			z.date(),
		),

		recoveryType: z.enum(
			[
				"ACCIDENT",
				"A_TO_B_TRANSPORTATION",
				"EMERGENCY_BREAKDOWN",
				"FLAT_TIRE",
				"JUMP_START",
				"OTHERS",
			],
			{ required_error: "Please select one" },
		),

		vehicleCondition: z.enum(["WHEEL_ROLLER", "NON_ROLLER"], {
			required_error: "Please select one",
		}),
	})
	.refine(
		(data) =>
			data.recoveryType === "JUMP_START" ||
			data.dropoffLocation !== undefined,
		{
			message: "Drop-off location is required for this recovery type.",
			path: ["dropoffLocation"], // where the error will appear
		},
	);

type RecoveryFormValues = z.infer<typeof recoveryFormSchema>;

export default function RecoveryForm() {
	const [isOpen, setIsOpen] = useState(false);
	const [time, setTime] = useState<string>("05:00");
	const [date, setDate] = useState<Date | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<RecoveryFormValues>({
		resolver: zodResolver(recoveryFormSchema),
		defaultValues: {
			fullName: "",
			email: "",
			mobile: "",
			vehicleDescription: "",
			pickupLocation: undefined,
			dropoffLocation: undefined,
			recoveryDateTime: new Date(),
		},
	});

	const postRecoveryQuote = async (data: RecoveryFormValues) => {
		try {
			setIsLoading(true);
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL ?? "https://www.towmanvan.com/api"}/quote`,
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

	const onSubmit = (data: RecoveryFormValues) => {
		postRecoveryQuote(data);
	};

	const recoveryType = useWatch({
		control: form.control,
		name: "recoveryType",
	});

	useEffect(() => {
		if (recoveryType === "JUMP_START") {
			form.setValue("dropoffLocation", { lat: 0, lng: 0 }); // or `null` if supported
		}
	}, [recoveryType, form]);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4 max-w-xl mx-auto bg-primary/10 p-6 rounded-2xl shadow-md"
			>
				{/* Full Name */}
				<FormField
					control={form.control}
					name="fullName"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									className="bg-background text-muted-foreground placeholder-fd-muted-foreground rounded-xl px-4 py-6 shadow-none border-none focus:ring-2 focus:ring-primary focus:outline-none "
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
									className="bg-background text-muted-foreground placeholder-fd-muted-foreground rounded-xl px-4 py-6 shadow-none border-none focus:ring-2 focus:ring-primary focus:outline-none "
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
					name="mobile"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									className="bg-background text-muted-foreground placeholder-fd-muted-foreground rounded-xl px-4 py-6 shadow-none border-none focus:ring-2 focus:ring-primary focus:outline-none "
									placeholder="Phone Number"
									type="tel"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Recovery Type */}
				<FormField
					control={form.control}
					name="recoveryType"
					render={({ field }) => (
						<FormItem>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger className="bg-background text-muted-foreground placeholder-fd-muted-foreground rounded-xl px-4 py-6 shadow-none border-none focus:ring-2 focus:ring-primary focus:outline-none">
										<SelectValue placeholder="Select Recovery Type" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{[
										{ key: "Accident", value: "ACCIDENT" },
										{
											key: "A to B Transportation",
											value: "A_TO_B_TRANSPORTATION",
										},
										{
											key: "Emergency Breakdown",
											value: "EMERGENCY_BREAKDOWN",
										},
										{
											key: "Flat Tire",
											value: "FLAT_TIRE",
										},
										{
											key: "Jump Start",
											value: "JUMP_START",
										},
										{ key: "Others", value: "OTHERS" },
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
									<SelectTrigger className="bg-background text-muted-foreground placeholder-fd-muted-foreground rounded-xl px-4 py-6 shadow-none border-none focus:ring-2 focus:ring-primary focus:outline-none">
										<SelectValue placeholder="Select Vehicle Condition" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="WHEEL_ROLLER">
										Wheel Roller
									</SelectItem>
									<SelectItem value="NON_ROLLER">
										Non-roller
									</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Vehicle Description */}
				<FormField
					control={form.control}
					name="vehicleDescription"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea
									className="bg-background text-muted-foreground placeholder-fd-muted-foreground rounded-xl px-4 py-6 shadow-none border-none focus:ring-2 focus:ring-primary focus:outline-none "
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
									label="Select Pickup Location"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Drop-off Location */}
				{recoveryType !== "JUMP_START" && (
					<FormField
						control={form.control}
						name="dropoffLocation"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<LocationPickerDialog
										value={field.value ?? null}
										onChange={field.onChange}
										label="Select Drop-off Location"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				{/* Recovery Date and Time */}
				<div className="flex w-full gap-4">
					<FormField
						control={form.control}
						name="recoveryDateTime"
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
											fromYear={new Date().getFullYear()}
											toYear={
												new Date().getFullYear() + 5
											}
											disabled={(date) =>
												Number(date) <
													Date.now() -
														1000 * 60 * 60 * 24 ||
												Number(date) >
													Date.now() +
														1000 * 60 * 60 * 24 * 30
											}
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
						name="recoveryDateTime"
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
										<SelectContent
											position="popper"
											align="center"
										>
											<ScrollArea className="h-40">
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
					{isLoading ? "Submitting..." : "Request Instant Quote"}
				</Button>
			</form>
		</Form>
	);
}
