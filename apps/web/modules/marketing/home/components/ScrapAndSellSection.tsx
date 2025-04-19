import ScrapForm from "@marketing/scrap/ScrapSellForm";
import React from "react";

export const ScrapAndSellSection = () => {
	return (
		<section id="scrap-and-sell" className="my-16 w-full scroll-my-20">
			<div className="container mx-auto bg-primary/10 p-4 rounded-3xl grid grid-cols-12 max-w-7xl">
				<div className="col-span-12 m-4 flex flex-col items-start justify-between">
					<h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-blue-500 mb-2 px-2">
						Scrap or Sell
					</h4>
					<div>
						<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-2">
							Scrap & Sell My Car
						</h1>
						<p className="text-muted-foreground max-w-2xl">
							The combined page will allow users to either scrap
							or sell their vehicles.
						</p>
					</div>
				</div>
				<div className="col-span-12 md:col-span-5 lg:col-span-4 bg-background p-4 md:p-6 lg:p-8 rounded-xl md:m-4 h-min">
					<ScrapForm />
				</div>
				<div className="col-span-12 md:col-span-7 lg:col-span-8 m-4 flex flex-col items-start justify-between lg:ml-20">
					<div className="my-4">
						<div className="flex items-start justify-start my-4">
							<div className="h-16 w-16 bg-primary/15 rounded-full grid place-content-center m-2">
								<p className="text-xl">01</p>
							</div>
							<div className="mx-2">
								<h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
									Transparent Quotes{" "}
								</h2>
								<p className="text-muted-foreground max-w-2xl">
									Our pricing is fair and transparent,
									ensuring you get the best value for your car
									without hidden costs.
								</p>
							</div>
						</div>
						<div className="flex items-start justify-start my-4">
							<div className="h-16 w-16 bg-primary/15 rounded-full grid place-content-center m-2">
								<p className="text-xl">02</p>
							</div>
							<div className="mx-2">
								<h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
									Environmentally Responsible
								</h2>
								<p className="text-muted-foreground max-w-2xl">
									We partner with trusted recycling facilities
									to ensure cars are scrapped in an
									eco-friendly manner.
								</p>
							</div>
						</div>
						<div className="flex items-start justify-start my-4">
							<div className="h-16 w-16 bg-primary/15 rounded-full grid place-content-center m-2">
								<p className="text-xl">03</p>
							</div>
							<div className="mx-2">
								<h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
									Convenient Process
								</h2>
								<p className="text-muted-foreground max-w-2xl">
									From quote to collection and payment, we
									handle it all so you can sell or scrap your
									car without hassle.
								</p>
							</div>
						</div>
						<div className="flex items-start justify-start my-4">
							<div className="h-16 w-16 bg-primary/15 rounded-full grid place-content-center m-2">
								<p className="text-xl">04</p>
							</div>
							<div className="mx-2">
								<h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
									Licensed & Insured
								</h2>
								<p className="text-muted-foreground max-w-2xl">
									We&apos;re fully licensed, bonded, and
									insured, so you can trust that you&apos;re
									working with a reliable, professional
									service.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
