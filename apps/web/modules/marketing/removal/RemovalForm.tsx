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
	const [isOpen, setIsOpen] = useState(false);
	const [time, setTime] = useState<string>("05:00");
	const [date, setDate] = useState<Date | null>(null);
	const [isLoading, setIsLoading] = useState(false);
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

	const postRemovalData = async (data: RemovalFormValues) => {
		try {
			setIsLoading(true);
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/removal`,
				data,
			);
			if (response.status === 200) {
				toast.success("Man and van / removal quote submitted!");
				form.reset(); // reset form on success
			} else {
				toast.error("Failed to submit man and van / removal quote");
			}
		} catch (error) {
			console.error("Error submitting form:", error);
			toast.error("Failed to submit man and van / removal quote");
		} finally {
			setIsLoading(false);
		}
	};

	const onSubmit = (data: RemovalFormValues) => {
		postRemovalData(data);
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
