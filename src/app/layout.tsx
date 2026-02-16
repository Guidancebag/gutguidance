import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GutGuidance - AI-Powered Gut Health Optimization",
  description:
    "Turn vague digestive complaints into personalized, actionable protocols. AI finds hidden food-symptom correlations and generates custom elimination diets.",
  keywords: [
    "gut health",
    "microbiome",
    "digestive health",
    "food sensitivity",
    "elimination diet",
    "IBS",
    "FODMAP",
    "symptom tracker",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
