'use client';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import SlickSlider from "../elements/SlickSlider";
import Section from "../elements/Section";
import { Category } from "@/data/ProductCategory";
import { slugify } from "@/utils";

const CategoryFurniture = () => {
  const pathname = usePathname();
  const split = pathname.split("/");
  const pageCategory = split[split.length - 1];
  


    const findCategory = Category.filter((data) => slugify(data.cate) === pageCategory);
  const furniture = findCategory[0] ? findCategory[0].subCate : null;
  

  return (
    <Section pClass="axil-categorie-area" sectionPadding="pt--30">
      <SlickSlider
        class="slick-layout-wrapper--15 categorie-product-two"
        slidesToShow={7}
        arrows={false}
        infinite={false}
        autoplay={true}
        responsive = {[
          {
            breakpoint: 1400,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 6,
            }
          },
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 5,
            }
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            }
          },
        ]}
      >
       {Array.isArray(furniture) &&
          furniture.map((data, index) => (
            <div className="categrie-product-2" key={index}>
              <Link href={`/products/category/${pageCategory}/${slugify(data?.name)}`}>
                <Image src={data?.thumb} height={24} width={24} alt={data?.name} />
                <h6 className="cat-title">{data?.name}</h6>
              </Link>
            </div>
          ))}
      </SlickSlider>
    </Section>
  );
};

export default CategoryFurniture;
