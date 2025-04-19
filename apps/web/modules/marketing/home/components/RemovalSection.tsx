import RemovalForm from "@marketing/removal/RemovalForm";
import React from "react";

export const RemovalSection = () => {
	return (
		<section id="man-and-van" className="my-16 w-full scroll-my-20">
			<div className="container mx-auto bg-primary/10 p-4 rounded-3xl grid grid-cols-12 max-w-7xl">
				<div className="col-span-12 md:col-span-7 lg:col-span-8 m-4 flex flex-col items-start justify-between">
					<h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-blue-500 mb-2 px-2">
						Man & Van / Removal Service
					</h4>
					<div>
						<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-2">
							Need help from a removal?{" "}
							<span className="text-blue-500">We got you!</span>
						</h1>
						<p className="text-muted-foreground max-w-xl">
							Whether it's a simple repair or a complex project,
							our removal service is here to help. We connect you
							with qualified professionals who can handle any task
							with ease.
						</p>
					</div>
					<div className="my-4">
						<div className="flex items-start justify-start my-4">
							<div className="h-16 w-16 bg-primary/15 rounded-full grid place-content-center m-2">
								<p className="text-xl">01</p>
							</div>
							<div className="mx-2">
								<h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
									Easy to Use Platform
								</h2>
								<p className="text-muted-foreground max-w-xl">
									Our platform is designed for ease of use,
									making it simple to find and book removal
									services in your area.
								</p>
							</div>
						</div>
						<div className="flex items-start justify-start my-4">
							<div className="h-16 w-16 bg-primary/15 rounded-full grid place-content-center m-2">
								<p className="text-xl">02</p>
							</div>
							<div className="mx-2">
								<h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
									Verified Listings & Sellers{" "}
								</h2>
								<p className="text-muted-foreground max-w-xl">
									We ensure that all listings are verified and
									sellers are trustworthy, so you can book
									with confidence.
								</p>
							</div>
						</div>
						<div className="flex items-start justify-start my-4">
							<div className="h-16 w-16 bg-primary/15 rounded-full grid place-content-center m-2">
								<p className="text-xl">03</p>
							</div>
							<div className="mx-2">
								<h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
									Simple & Secure Process{" "}
								</h2>
								<p className="text-muted-foreground max-w-xl">
									From listing to payment, our process is
									designed to be fast, simple, and secure for
									both everyone.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="col-span-12 md:col-span-5 lg:col-span-4 bg-background p-4 md:p-6 lg:p-8 rounded-xl md:m-4 h-min">
					<RemovalForm />
				</div>
			</div>
		</section>
	);
};
