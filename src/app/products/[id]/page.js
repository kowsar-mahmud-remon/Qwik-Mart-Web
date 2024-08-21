"use client";
import ProductsData from "@/data/Products";
import ProductOne from "@/components/product/ProductOne";
import { slugify } from "@/utils";
import SlickSlider from "@/components/elements/SlickSlider";
import SingleLayouThree from "./SingleLayouThree";
import Section from "@/components/elements/Section";
import SectionTitle from "@/components/elements/SectionTitle";
import SingleLayouSeven from "./SingleLayouSeven";
import SingleLayoutOne from "./SingleLayoutOne";
import SingleLayoutTwo from "./SingleLayoutTwo";
import SingleLayoutFour from "./SingleLayoutFour";
import { useEffect, useState } from "react";
import { UserAuth } from "@/context/AuthContext";
import SingleLayout from "./SingleLayout";

const ProductDetails = ({ params }) => {
  const { Token } = UserAuth();

  //?
  const [singleProduct, setSingleProduct] = useState([]);
  const [relatedProduct, setRelatedProduct] = useState([]);
  //?

  //? fetch data with single data
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `https://qwikmart.pythonanywhere.com/products/${params.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Token ${Token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setSingleProduct(data);

        // Fetch related products based on the product category
        const relatedResponse = await fetch(
          `https://qwikmart.pythonanywhere.com/products?category=${data.pCate}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Token ${Token}`,
            },
          }
        );

        if (!relatedResponse.ok) {
          throw new Error(`HTTP error! Status: ${relatedResponse.status}`);
        }

        const relatedData = await relatedResponse.json();
        setRelatedProduct(relatedData);
      } catch (error) {
        console.error("Error fetching product details:", error.message);
      }
    };

    fetchProductDetails();
  }, [params.id, Token]);

  const ProductSingleLayout = () => {
    if (!singleProduct) {
      return null; // You can add a loading state or handle accordingly
    }

    switch (singleProduct.pCate) {
      case "NFT":
        return <SingleLayout singleData={singleProduct} />;
      case "Electronics":
        return <SingleLayout singleData={singleProduct} />;
      case "Fashion":
        return <SingleLayout singleData={singleProduct} />;
      case "Furniture":
        return <SingleLayout singleData={singleProduct} />;
      default:
        return <SingleLayout singleData={singleProduct} />;
    }
  };

  // const findProduct = ProductsData.filter(
  //   (product) => slugify(product.id) === slugify(params.id)
  // );
  // const singleProduct = findProduct[0];
  // const productCategory = singleProduct.pCate;
  // const relatedProduct = ProductsData.filter(
  //   (product) => slugify(product.pCate) === slugify(productCategory)
  // );

  // const ProductSingleLayout = () => {
  //   switch (singleProduct.pCate) {
  //     case "NFT":
  //       return <SingleLayouSeven singleData={singleProduct} />;
  //       break;
  //     case "Electronics":
  //       return <SingleLayouThree singleData={singleProduct} />;
  //       break;
  //     case "Fashion":
  //       return <SingleLayoutOne singleData={singleProduct} />;
  //       break;
  //     case "Furniture":
  //       return <SingleLayoutFour singleData={singleProduct} />;
  //       break;
  //     default:
  //       return <SingleLayoutTwo singleData={singleProduct} />;
  //       break;
  //   }
  // };

  return (
    <>
      <ProductSingleLayout />
      <Section pClass="pb--50 pb_sm--30">
        <SectionTitle
          title="Viewed Items"
          subtitle="Your Recently"
          subtitleIcon="far fa-shopping-basket"
          subColor="highlighter-primary"
        />
        <SlickSlider
          class="recent-product-activation slick-layout-wrapper--15 axil-slick-arrow arrow-top-slide"
          slidesToShow={4}
          infinite={false}
          responsive={[
            {
              breakpoint: 1400,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              },
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 575,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ]}
        >
          {relatedProduct?.slice(0, 10).map((data) => (
            <ProductOne product={data} key={data.id} />
          ))}
        </SlickSlider>
      </Section>
    </>
  );
};

export default ProductDetails;

export async function generateStaticParams() {
  const products = ProductsData;

  return products.map((post) => ({
    id: slugify(post.id),
  }));
}
