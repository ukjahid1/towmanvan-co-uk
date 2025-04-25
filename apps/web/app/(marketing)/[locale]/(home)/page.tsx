import { CourierSection } from "@marketing/home/components/CourierSection";
import { DrivingSection } from "@marketing/home/components/DrivingSection";
import { FaqSection } from "@marketing/home/components/FaqSection";
import { HandymanSection } from "@marketing/home/components/HandymanSection";
import { Hero } from "@marketing/home/components/Hero";
import { RemovalSection } from "@marketing/home/components/RemovalSection";
import { ScrapAndSellSection } from "@marketing/home/components/ScrapAndSellSection";
import { Services } from "@marketing/home/components/Services";
import { setRequestLocale } from "next-intl/server";

export default async function Home({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);

	return (
		<>
			<Hero />
			<Services />
			<RemovalSection />
			<CourierSection />
			<ScrapAndSellSection />
			<DrivingSection />
			<HandymanSection />
			{/* <Features />
			<PricingSection /> */}
			<FaqSection />
			{/* <Newsletter /> */}
		</>
	);
}
