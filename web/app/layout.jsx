import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Samson Funeral & Cemetery Services | Cavite Memorial Care",
  description:
    "Samson Funeral & Cemetery Services provides dignified funeral care, memorial services, and cemetery solutions across Cavite. Contact us for compassionate support and pre-need plans.",
  keywords: [
    "Samson Funeral",
    "Cemetery Services",
    "Memorial Care",
    "Funeral Services Cavite",
    "Pre-need Plans",
    "Memorial Park",
  ],
  openGraph: {
    title: "Samson Funeral & Cemetery Services",
    description:
      "Compassionate memorial care, funeral services, and cemetery solutions across Cavite.",
    type: "website",
    locale: "en_PH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samson Funeral & Cemetery Services",
    description:
      "Compassionate memorial care, funeral services, and cemetery solutions across Cavite.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <body>
        {children}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
