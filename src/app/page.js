import FooterTwo from "@/components/footer/FooterTwo";
import NewsLetter from "@/components/newsletter/NewsLetter";
import SplashFooter from "@/components/splash/SpalshFooter";
import SplashBanner from "@/components/splash/SplashBanner";
import SplashCta from "@/components/splash/SplashCta";
import SplashFeatures from "@/components/splash/SplashFeatures";
import SplashHeader from "@/components/splash/SplashHeader";
import SplashHomeDemo from "@/components/splash/SplashHomeDemo";
import SplashInnerDemo from "@/components/splash/SplashInnerDemo";
import TestimonialOne from "@/components/testimonial/TestimonialOne";
import WhyChoose from "@/components/why-choose/WhyChoose";


export const metadata = {
  title: 'Qwik Mart',
  description: 'Qwik Mart E-Commerce',
}

const HomeOne = () => {
  return ( 
    <>
	<SplashHeader />
	<main className="main-wrapper pv-main-wrapper">
		<SplashBanner />
		<SplashHomeDemo />
		{/* <SplashInnerDemo /> */}
		<SplashFeatures />
		<TestimonialOne />
		<WhyChoose/>
		<NewsLetter/>
		<SplashCta />
	</main>
	{/* <SplashFooter /> */}
	<FooterTwo />
    </>
   );
}
 
export default HomeOne;
