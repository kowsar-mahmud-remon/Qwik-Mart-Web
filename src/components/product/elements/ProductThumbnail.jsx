import Link from "next/link";
import Image from "next/image";
import ProductDiscountLabel from "./ProductDiscountLabel";
import ActionButtons from "./ActionButtons";

const ProductThumbnail = (props) => {
  // console.log(props);
  return (
    <div className="thumbnail ">
      <Link href={`/products/${props.productThumb.id}`}>
        {/* <img
          src={
            props.attributeImg
              ? props.attributeImg
              : props.productThumb.thumbnail
          }
          // width={500}
          // height={500}
          className="product-img"
        /> */}
        {props.productThumb.hoverThumbnail && props.isHoverThumbnail ? (
          <div className="product-img-div">
            <Image
            src={props.productThumb.hoverThumbnail}
            width={300}
            height={200}
            // className="hover-img h-[300px] w-[300px]"
            className="product-img"
            alt="product-image"
          />
          </div>
        ) : (
          ""
        )}
      </Link>
      {props.productThumb.salePrice && props.discountLabel && (
        <ProductDiscountLabel discount={props.productThumb} />
      )}
      {props.hoverItems && (
        <div>
          <ActionButtons
            productAction={props.productThumb}
            wishlistBtn={props.wishlistBtn}
            cartBtn={props.cartBtn}
            quickViewBtn={props.quickViewBtn}
          />
        </div>
      )}
    </div>
  );
};

export default ProductThumbnail;

//  className = "product-hover-action";
