import AppButton from "@ui/components/app-button";
import Image from "next/image";
import React from "react";

const page = () => {
	return (
		<main className="w-full min-h-screen">
			<div className="container mx-auto flex flex-col lg:flex-row items-center justify-between p-8">
				<div className="flex-1 lg:ml-20 space-y-8">
					<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl max-w-2xl leading-normal my-10 text-center lg:text-start lg:my-0">
						Experience Convenience at Your Fingertips
					</h1>
					<p className="text-muted-foreground text-md text-wrap text-center lg:text-start">
						Stay connected and access our services anytime, anywhere
						with our mobile app! Whether you&apos;re booking a
						service, tracking updates, or managing your account, our
						app makes everything seamless and hassle-free.
					</p>
					<p className="text-xl text-wrap text-center lg:text-start">
						<i>
							Get started today! Download the app on your
							preferred platform
						</i>
					</p>
					<div className="flex items-center justify-center lg:justify-start gap-4">
						<AppButton
							platform="apple"
							link="https://www.apple.com/app-store/"
						/>
						<AppButton
							platform="google"
							link="https://play.google.com/store"
						/>
					</div>
					<h4 className="text-xl font-semibold tracking-tight text-muted-foreground text-center lg:text-start">
						Your favorite services, just a tap away. Download now!
					</h4>
				</div>
				<div className="flex-1">
					<Image
						height={700}
						width={700}
						src="/images/iphone.jpg"
						alt="Phone"
						className="rounded-lg"
					/>
				</div>
			</div>
		</main>
	);
};

export default page;
