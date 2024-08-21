import { useState } from "react";

const ProductColorAttribute = (props) => {
  // console.log(props);

  const [colorImage, setColorImage] = useState("");

  const colorImageHandler = (color) => {
    setColorImage(color);
    props.getAttribute(color);
  };

  return (
    <div className="color-variant-wrapper">
      <ul className="color-variant">
        {Array.isArray(props.attributeColor.colorAttribute) &&
          props.attributeColor.colorAttribute.map((data, index) => (
            <li
              className={`${data.color} ${
                colorImage.color === data.color ? "active" : ""
              }`}
              key={index}
              onClick={() => colorImageHandler(data)}
            >
              <span>
                <span className="color" />
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProductColorAttribute;