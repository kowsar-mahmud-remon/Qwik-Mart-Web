"use client";
import Image from "next/image";
import CountUp from "react-countup";
import TrackVisibility from "react-on-screen";

const SplashBanner = () => {
  const bannerData = {
    title: "Experience QwikMart Elevate Your Shopping Journey Today",
    subtitle: "Qwik Mart",
    subtitleIcon: "fas fa-fire",
    mainMockup: "/images/preview/bg-mockup.png",
    mainBg: "/images/preview/banner-bg.png",
  };
  const demoEelement = [
    {
      title: "Demo Website",
      number: "05",
    },
    {
      title: "Inner Page",
      number: "25",
    },
    {
      title: "Elements",
      number: "30",
    },
  ];
  const toolsUse = [
    "/images/preview/next.png",
    "/images/preview/react.png",
    "/images/preview/npm.png",
    "/images/preview/scss.png",
    "/images/preview/bootstrap.png",
  ];

  return (
    <div
      className="pv-banner-wrapper"
      style={{ backgroundImage: `url(${bannerData.mainBg})` }}
    >
      <div className="pv-banner-area">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-xl-4 col-lg-5">
              <div className="banner-content">
                <div className="inner">
                  <div className="section-title-wrapper">
                    <span className="title-highlighter highlighter-secondary">
                      <i className={bannerData.subtitleIcon} />{" "}
                      {bannerData.subtitle}
                    </span>
                    <h1 className="title">{bannerData.title}</h1>
                  </div>
                </div>
                
                {/* <div className="theme-powerd">
                  <label>Powered By</label>
                  <ul className="icon-list">
                    {toolsUse.map((data, index) => (
                      <li key={index}>
                        <Image src={data} width={25} height={28} alt="Tools" />
                      </li>
                    ))}
                  </ul>
                </div> */}
              </div>
            </div>
            <div className="col-xl-8 col-lg-7">
              <div className="banner-thumbnail">
                <Image
                  src={bannerData.mainMockup}
                  width={750}
                  height={600}
                  className="ps-5 ms-5"
                  alt="Mockup"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashBanner;
