import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import FooterTwo from "@/components/footer/FooterTwo";
import HeaderFive from "@/components/header/HeaderFive";
import NewsLetter from "@/components/newsletter/NewsLetter";
import ServiceTwo from "@/components/services/ServiceTwo";
import ShopNoSidebar from "./ShopNoSidebar";
import ShopWithSidebar from "./ShopWithSidebar";

const Shop = () => {
    const isNoSidebarLayout = false;
    return ( 
        <>
        <HeaderFive headerCampaign />
        <Breadcrumb activeItem="Shop" title="Explore All Products" />
        <main className="main-wrapper">
        {isNoSidebarLayout ? <ShopNoSidebar /> : <ShopWithSidebar />}
        <NewsLetter />
        <ServiceTwo />
      </main>
        <FooterTwo />
        </>
    );
}
 
export default Shop;