'use client';
import { useState, useEffect } from "react";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import Section from "@/components/elements/Section";
import ProductOne from "@/components/product/ProductOne";
import ProductsData from "@/data/Products";
import { slugify, unSlugify } from "@/utils";
import { UserAuth } from "@/context/AuthContext";

const CategoryProduct = ({ params }) => {
    const { Token } = UserAuth();
    const [prodData, setProdData]=useState([]);
    const [cateProduct, setCateProduct] = useState([]);
    const catParam = params.slug[params.slug.length-1];
    // const catParam = 'Electronics';

    useEffect(() => {
        const apiUrl = "https://qwikmart.pythonanywhere.com/products/";
    
        fetch(apiUrl, {
          headers: {
            Authorization: `Token ${Token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setProdData(data);
            // console.log(data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }, [Token]);
   
      useEffect(() => {
        let products = Object.values(prodData).filter((product) => {
            // Assuming `product.cate` is an object { Cate: ... }
            let category = Object.values(product.cate).filter(cat => slugify(cat) === catParam);
            return category?.length > 0;
        });
        setCateProduct(products);
    }, [prodData, catParam]);
    
    // console.log(prodData[0].cate.Cate);
    
    return (
        <>
        <Breadcrumb activeItem="Category" title={unSlugify(catParam)}/>
        <Section pClass="axil-shop-area" sectionPadding="axil-section-gapcommon">
            <div className="row row--15">
                {cateProduct.length > 0 ? cateProduct?.map((data) => (
                    <div className="col-xl-3 col-lg-4 col-sm-6" key={data.id}>
                        <ProductOne product={data}/>
                    </div>
                )): <h2 className="text-center">No Category Products Found</h2>}
            </div>
        </Section>
        </>
    );
}
 
export default CategoryProduct;