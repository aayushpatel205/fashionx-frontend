import React from "react";
import aboutImg from "../src/assets/frontend_assets/about_img.png"

const AboutUsPage = () => {
  return (
    <div className="mt-12 flex flex-col items-center gap-8">
      <div className="flex gap-2">
        <p className="text-gray-500 text-2xl">ABOUT</p>
        <p className="font-semibold text-2xl">US</p>
        <div className="ml-2 w-10 h-[2px] bg-gray-700 mt-4"></div>
      </div>

      <div className="w-[100%] px-14 flex justify-around items-center">
        <img
          src={aboutImg}
          className="w-[35%] h-[500px]"
        />

        <div className="w-[40%]">
          <p className="flex flex-col gap-5 text-gray-500">
            <p className="font-semibold text-2xl text-gray-700">Who We Are</p>
            <p>
              FashionX was born out of a passion for innovation and a desire to
              revolutionize the way people shop online. Our journey began with a
              simple idea: to provide a platform where customers can easily
              discover, explore, and purchase a wide range of products from the
              comfort of their homes. Since our inception, we've worked
              tirelessly to curate a diverse selection of high-quality products
              that cater to every taste and preference. From fashion and beauty
              to electronics and home essentials, we offer an extensive
              collection sourced from trusted brands and suppliers.
            </p>

            <p className="font-semibold text-2xl text-gray-700">Our Mission </p>

            <p>
              Our mission at FashionX is to empower customers with choice,
              convenience, and confidence. We're dedicated to providing a
              seamless shopping experience that exceeds expectations, from
              browsing and ordering to delivery and beyond.
            </p>
          </p>
        </div>
      </div>

      <div className="mt-10 w-[100%] px-36 flex-col flex gap-7">
        <div className="flex gap-2">
          <p className="text-gray-500 text-2xl">WHY</p>
          <p className="font-semibold text-2xl">CHOOSE</p>
          <p className="font-semibold text-2xl">US</p>
          <div className="ml-2 w-10 h-[2px] bg-gray-700 mt-4"></div>
        </div>

        <div className="w-[100%] border border-gray-300 flex h-[250px]">
          <div className="w-[32%] border-r border-gray-300 p-10 flex-col flex justify-center items-center">
            <div className="flex flex-col gap-4">
              <p className="font-semibold text-gray-700">QUALITY ASSURANCE</p>
              <p className="text-gray-500">
                We meticulously select and vet each product to ensure it meets
                our stringent quality standards.
              </p>
            </div>
          </div>

          <div className="w-[32%] border-r border-gray-300 p-10 flex-col flex justify-center items-center">
            <div className="flex flex-col gap-4">
              <p className="font-semibold text-gray-700">CONVENIENCE</p>
              <p className="text-gray-500">
                With our user-friendly interface and hassle-free ordering
                process, shopping has never been easier.
              </p>
            </div>
          </div>

          <div className="w-[32%] border-gray-300 p-10 flex-col flex justify-center items-center">
            <div className="flex flex-col gap-4">
              <p className="font-semibold text-gray-700">EXCEPTIONAL CUSTOMER SERVICE</p>
              <p className="text-gray-500">
                With our user-friendly interface and hassle-free ordering
                process, shopping has never been easier.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
