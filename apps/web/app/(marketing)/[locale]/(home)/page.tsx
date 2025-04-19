import { FaqSection } from "@marketing/home/components/FaqSection";
import { Features } from "@marketing/home/components/Features";
import { Services } from "@marketing/home/components/Services";
import { Hero } from "@marketing/home/components/Hero";
import { RemovalSection } from "@marketing/home/components/RemovalSection";
import { ScrapAndSellSection } from "@marketing/home/components/ScrapAndSellSection";
import { HandymanSection } from "@marketing/home/components/HandymanSection";
import { CourierSection } from "@marketing/home/components/CourierSection";
import { DrivingSection } from "@marketing/home/components/DrivingSection";
// import { Newsletter } from "@marketing/home/components/Newsletter";
import { PricingSection } from "@marketing/home/components/PricingSection";
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
			<CourierSection />
			<ScrapAndSellSection />
			<HandymanSection />
			<RemovalSection />
			<DrivingSection />
			<Features />
			<PricingSection />
			<FaqSection />
			{/* <Newsletter /> */}
		</>
	);
}
