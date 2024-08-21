import Image from "next/image";
import SectionTitle from "../elements/SectionTitle";

const SplashFeatures = () => {
  const ThemeFeatures = [
    {
      title: "Fast & Secure Delivery",
      icon: "/images/icons/service1.png",
      text: "Reliable and lightning-fast service with top-notch security measures for peace of mind.",
    },
    {
      title: "Money Back Guarantee",
      icon: "/images/icons/service2.png",
      text: "Our ironclad money-back guarantee ensures your satisfaction or a full refund, no questions asked.",
    },
    {
      title: "24 Hour Return Policy",
      icon: "/images/icons/service3.png",
      text: "Enjoy the convenience of our hassle-free 24-hour return policy for a worry-free shopping experience.",
    },
    {
      title: "Pro Quality Support",
      icon: "/images/icons/service10.png",
      text: "Experience premium, pro-level support catered to your needs, ensuring a seamless and successful experience",
    },
    {
      title: "Free Delivery <br/> <small>Condition applicable</small>",
      icon: "/images/icons/delivery-man.png",
      text: "Enjoy complimentary delivery with specified conditions for a convenient and budget-friendly shopping experience.",
    },
    {
      title: "Exclusive Membership",
      icon: "/images/preview/feature-icon-09.png",
      text: "Unlock a world of perks with our Exclusive Membership Benefits—enjoy priority access, exclusive discounts, and personalized offers tailored just for you.",
    },
    

  ];
  return (
    <div className="pv-feature-area" id="features">
      <div className="container">
        <div className="pv-feature-box">
          <SectionTitle
            pClass="section-title-center"
            subColor="highlighter-secondary"
            subtitle="Our Delivery System"
            subtitleIcon="fas fa-fire"
            title="We have Impressive <br/>
               Service and Delivery System"
          />
          <div className="row">
            {ThemeFeatures.map((data, index) => (
              <div className="col-lg-4 col-md-6 col-12" key={index}>
                <div className="pv-feature">
                  <div className="service-box">
                    <div className="icon">
                      <Image
                        src={data.icon}
                        height={48}
                        width={48}
                        alt="icon"
                      />
                    </div>
                    <div className="content">
                      <h3
                        className="title"
                        dangerouslySetInnerHTML={{ __html: data.title }}
                      ></h3>
                      <p>{data.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashFeatures;
