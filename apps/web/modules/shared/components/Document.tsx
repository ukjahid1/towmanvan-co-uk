import { AnalyticsScript } from "@analytics";
import { config } from "@repo/config";
import { ApiClientProvider } from "@shared/components/ApiClientProvider";
import { Toaster } from "@ui/components/toast";
import { cn } from "@ui/lib";
import { Provider as JotaiProvider } from "jotai";
import { ThemeProvider } from "next-themes";
// import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { PropsWithChildren } from "react";

// const sansFont = Poppins({
// 	subsets: ["latin"],
// 	weight: ["400", "500", "600", "700"],
// 	variable: "--font-sans",
// });

const geist = localFont({
	src: [
		{
			path: "./fonts/Geist-Regular.otf",
			weight: "400",
			style: "normal",
		},
		{
			path: "./fonts/Geist-Medium.otf",
			weight: "500",
			style: "normal",
		},
		{
			path: "./fonts/Geist-SemiBold.otf",
			weight: "600",
			style: "normal",
		},
		{
			path: "./fonts/Geist-Bold.otf",
			weight: "700",
			style: "normal",
		},
	],
	variable: "--font-geist",
});

const helvetica = localFont({
	src: [
		{
			path: "./fonts/HelveticaNeue-Heavy.otf",
			weight: "800",
			style: "normal",
		},
	],
	variable: "--font-helvetica",
});

export function Document({
	children,
	locale,
}: PropsWithChildren<{ locale: string }>) {
	return (
		<html lang={locale} suppressHydrationWarning>
			<body
				className={cn(
					"min-h-screen bg-background font-geist text-foreground antialiased",
					geist.variable,
					helvetica.variable,
				)}
			>
				<NuqsAdapter>
					<NextTopLoader color="var(--color-primary)" />
					<ThemeProvider
						attribute="class"
						disableTransitionOnChange
						enableSystem
						defaultTheme={config.ui.defaultTheme}
						themes={config.ui.enabledThemes}
					>
						<ApiClientProvider>
							<JotaiProvider>{children}</JotaiProvider>
						</ApiClientProvider>
					</ThemeProvider>
					<Toaster position="top-right" />
					<AnalyticsScript />
				</NuqsAdapter>
			</body>
		</html>
	);
}
