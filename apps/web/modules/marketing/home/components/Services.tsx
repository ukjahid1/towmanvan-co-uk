import { LocaleLink } from "@i18n/routing";
import Image from "next/image";
import React from "react";
export const Services = () => {
	const services = [
		{
			slug: "car-recovery",
			title: "Car Recovery Services",
			description:
				"Stuck on the road? Our trusted car recovery service is here 24/7 to get you moving again. Fast, reliable, and stress-free assistance when you need it most",
			link: "/services/car-recovery",
			imageUrl: "/images/car-recovery.png",
		},
		{
			slug: "man-and-van",
			title: "Man and Van Services",
			description:
				"Affordable and reliable Man and Van services for all your moving needs—local or long-distance, big or small. Let us handle the heavy lifting while you relax.",
			link: "/services/man-and-van",
			imageUrl: "/images/man-and-van.png",
		},
		{
			slug: "courier",
			title: "Courier Services",
			description:
				"Fast and dependable courier services for all your delivery needs. From documents to parcels, we ensure safe and timely delivery every time.",
			link: "/services/courier",
			imageUrl: "/images/courier.png",
		},
		{
			slug: "scrap-my-car",
			title: "Scrap My Car Services",
			description:
				"Hassle-free car scrapping services with instant quotes, free collection, and top cash offers. We make it easy to recycle your old vehicle responsibly.",
			link: "/services/scrap-my-car",
			imageUrl: "/images/scrap.png",
		},
		{
			slug: "driving-lessons",
			title: "Driving Lesson Services",
			description:
				"Learn to drive with confidence! Professional, patient, and friendly instructors offering tailored driving lessons to suit all levels—from beginners to advanced.",
			link: "/services/driving-lessons",
			imageUrl: "/images/driving-lessons.png",
		},
		{
			slug: "handyman",
			title: "Handyman Services",
			description:
				"Your go-to solution for all home repairs and maintenance. From small fixes to major renovations, our skilled handymen provide reliable and affordable services you can trust.",
			link: "/services/handyman",
			imageUrl: "/images/handyman.png",
		},
	];
	return (
		<section className="w-full scroll-my-20 pt-12 pb-4 lg:pt-16 bg-background">
			<div className="container max-w-6xl mx-auto">
				<h4 className="text-xl font-semibold tracking-tight text-blue-500 mb-2 px-2">
					Services
				</h4>
				<div className="flex flex-col lg:flex-row items-start justify-between px-2">
					<h2 className="pb-2 text-3xl font-semibold tracking-tight first:mt-0">
						24/7 Assistance to Get You Back on the Road
					</h2>
					<p className="text-muted-foreground max-w-lg">
						Our expert team is ready to reach your location quickly
						to help get you back on the road or to a safe location.
					</p>
				</div>
				<div className="grid grid-cols-12 my-4">
					{services.map((service) => (
						<div
							key={service.title}
							className="col-span-12 md:col-span-6 lg:col-span-4 p-4  bg-custom-card rounded-3xl shadow-md m-4 flex flex-col justify-between"
						>
							<div>
								<Image
									src={service.imageUrl}
									alt={service.title}
									height={100}
									width={100}
									className="rounded-full"
								/>
								<h3 className="text-xl font-semibold tracking-tight my-2">
									{service.title}
								</h3>
								<p className="text-muted-foreground">
									{service.description}
								</p>
							</div>
							<LocaleLink href={service.link}>
								<div className="py-2 px-4 hover:bg-primary hover:text-primary-foreground duration-200 my-2 w-min text-nowrap rounded-full bg-background">
									Get Quote
								</div>
							</LocaleLink>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
