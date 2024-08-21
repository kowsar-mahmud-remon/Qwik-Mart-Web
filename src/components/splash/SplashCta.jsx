import Image from "next/image";
import Link from "next/link";

const SplashCta = () => {
    return (
      <div className="pv-call-to-action pb-5 ">
        <div className="container">
          <div className="pv-action-box">
            <div className="section-title-wrapper">
              <span className="title-highlighter highlighter-primary">
                <i className="fas fa-fire" /> Are You Ready
              </span>
              <h2 className="title">Let’s Start Your Shopping Today!</h2>
              <Link
             
                href="/shop"
                className="axil-btn btn-bg-primary"
              >
                <i className="fal fa-shopping-cart" /> Buy Now
              </Link>
            </div>
            <div className="pv-action-thumbnail">
                <Image 
                // style={{ marginTop: '-300px' }}
                src="/images/preview/ctafull.png"
                width={1230}
                height={540}
                alt="Cta Mockup"
                />
            </div>
          </div>
        </div>
      </div>
    );
}
 
export default SplashCta;