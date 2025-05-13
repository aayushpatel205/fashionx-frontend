import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product?._id}`}>
      <div className="flex flex-col gap-2.5" onClick={() => {}}>
        <div className="h-56 w-48">
          <img
            src={product?.imgUrl}
            className="h-[100%] w-[100%] object-fill"
          />
        </div>
        <div className="w-52 flex flex-col gap-1">
          <p className="text-gray-700 text-sm">{product?.productName}</p>
          <p className="text-gray-700 font-medium">${product?.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
