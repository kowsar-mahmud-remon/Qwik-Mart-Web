import SectionTitle from "../elements/SectionTitle";

const NewsLetter = (props) => {
  const background = {
    background: 'url("/images/bg/images_7.jpg")',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div className="axil-newsletter-area axil-section-gap pt--0 mt-5 ">
      <div className="container">
        <div className={`etrade-newsletter-wrapper `} style={background}>
          <div className="newsletter-content">
            <SectionTitle
              pClass="pr--0"
              title="Get weekly update"
              subtitle="Newsletter"
              subtitleIcon="fas fa-envelope-open"
              subColor="highlighter-primary2"
            />
            <div className="input-group newsletter-form">
              <div className="position-relative newsletter-inner mb--15">
                <input placeholder="example@gmail.com" type="text" />
              </div>
              <button type="submit" className="axil-btn mb--15">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
