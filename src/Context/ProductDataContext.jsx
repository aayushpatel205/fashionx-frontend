import React, { useState } from "react";
import { useContext, createContext } from "react";

const ProductDataContext = createContext();

export const ProductDataContextProvider = ({ children }) => {
    const [userCartData, setUserCartData] = useState([]);
    const [totalCost , setTotalCost] = useState(0);
    return (
        <ProductDataContext.Provider value={{ userCartData, setUserCartData , totalCost , setTotalCost }}>
            {children}
        </ProductDataContext.Provider>
    );
};

export const useProductData = () => useContext(ProductDataContext);