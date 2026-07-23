import BackgroundGrid from "@/components/portfolio/BackgroundGrid";
import Contact from "@/components/portfolio/Contact";
import CustomCursor from "@/components/portfolio/CustomCursor";
import Footer from "@/components/portfolio/Footer";
import Hero from "@/components/portfolio/Hero";
import Nav from "@/components/portfolio/Nav";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";

export default function Home() {
  return <div id="top" className="relative min-h-screen bg-[#050505] text-white"><BackgroundGrid/><CustomCursor/><Nav/><main className="relative"><Hero/><PortfolioGrid/><Contact/></main><Footer/></div>;
}
