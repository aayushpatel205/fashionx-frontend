import React, { useEffect, useState } from "react";
import hero_img from "../src/assets/frontend_assets/hero_img.png";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../src/api/userApis";
import { Link } from "react-router-dom";
import { useUserData } from "../src/Context/UserDataContext";
import exchangeIcon from "../src/assets/frontend_assets/exchange_icon.png";
import qualityIcon from "../src/assets/frontend_assets/quality_icon.png";
import supportIcon from "../src/assets/frontend_assets/support_img.png";
import latestArrivals from "../src/assets/admin_assets/Latest_arrivals.svg";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const { userData } = useUserData();
  const [latestProducts, setLatestProducts] = useState([]);
  const getData = async () => {
    try {
      const response = await getAllProducts("asc");
      const length = response?.data.length;
      setLatestProducts(response.data.slice(length - 5, length));
      setLoading(false);
    } catch (error) {
      console.log("error: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-10 w-[100%] no-scrollbar">
      <div className="border-gray-400 border h-[500px] w-[80%] flex ">
        <div className="w-[50%] h-[100%] flex flex-col justify-center items-center gap-4">
          <div className="flex items-center gap-2 text-gray-700">
            <div className="w-20 text-2xl h-[1px] bg-gray-700"></div>
            <span className="font-extralight">OUR BESTSELLERS</span>
          </div>

          <img src={latestArrivals} className="h-14" />

          <div className="flex items-center gap-2 text-gray-700 font-medium">
            <span className="font-extralight">SHOP NOW</span>
            <div className="w-20 text-2xl h-[1px] bg-gray-700"></div>
          </div>
        </div>
        <div className="w-[50%] h-[100%] bg-pink-200">
          <img src={hero_img} className="w-[100%] h-[100%]" />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-2 mt-7">
        <div className="flex gap-2 text-2xl items-center">
          <p className="text-gray-500">LATEST</p>
          <p className="font-semibold">COLLECTIONS</p>
          <div className="w-8 h-[1px] bg-gray-700"></div>
        </div>

        <p className="text-gray-500">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam
          exercitationem eaque quae eius totam est rerum sint.
        </p>
      </div>

      <div className="w-[80%] flex gap-6 flex-wrap justify-center">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="w-16 h-16 border-4 border-black rounded-full border-t-transparent animate-spin"></div>
          </div>
        ) : (
          latestProducts?.map((element) => {
            return <ProductCard product={element} key={element._id} />;
          })
        )}
      </div>

      <div className="mt-28 flex w-[70%] justify-between">
        <div className="flex flex-col gap-4 items-center">
          <img src={exchangeIcon} className="w-10 h-10" />
          <div className="flex flex-col items-center">
            {" "}
            <p className="font-semibold text-gray-700">Easy Exchange Policy</p>
            <p className="text-gray-500">
              We Offer hassle free exchange policy.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <img src={qualityIcon} className="w-10 h-10" />
          <div className="flex flex-col items-center">
            {" "}
            <p className="font-semibold text-gray-700">7 Days Return Policy</p>
            <p className="text-gray-500">
              We provide 7 days free return policy.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <img src={supportIcon} className="w-10 h-10" />
          <div className="flex flex-col items-center">
            {" "}
            <p className="font-semibold text-gray-700">Best Customer Support</p>
            <p className="text-gray-500">We provide 24/7 Customer support.</p>
          </div>
        </div>
      </div>

      {!userData?.isVerified && (
        <div className="mt-28 flex flex-col items-center gap-4">
          <p className="text-3xl font-medium text-gray-800">
            Subscribe Now & get 20% off
          </p>
          <p className="text-gray-500">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus, repellat aliquid odio cumque!
          </p>

          <div className="flex w-[90%] justify-center mt-4">
            <input
              type="email"
              className="w-[50%] h-12 pl-4 pr-2 border-2 border-t-gray-300 border-b-gray-300 border-l-gray-300 text-sm outline-none"
              placeholder="Enter your email id"
            />
            <Link className="w-[20%]" to="/sign-up">
              <button className="w-[100%] bg-black h-12 text-white text-sm hover:opacity-85 cursor-pointer">
                SUBSCRIBE
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
