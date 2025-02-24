import localFont from "next/font/local";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'

const roboto = localFont({
  src: "./fonts/roboto-v32-latin-regular.woff2",
  variable: "--font-sans",
  weight: "400",
  display: "swap",
});

const playfair = localFont({
  src: "./fonts/playfair-display-v37-latin-600.woff2",
  variable: "--font-serif",
  weight: "600",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${roboto.variable} ${playfair.variable} antialiased`}>
         <GoogleAnalytics gaId="G-7NVDC46MSG" />
         <meta name="google-site-verification" content="SQZ5qtXfEeDLpxHWjDt1Dklyuftq2PY1OtTdp4uJYVY" />
        {children}
      </body>
    </html>
  );
}
