import axiosInstance from "../../axiosInstance";

export const getAllProducts = async (sort) => {
  try {
    const response = await axiosInstance.get("/user/get-all-products", {
      params: {
        sort,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`/user/get-by-id`, {
      params: {
        id,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductByCategory = async (category, subCategory, sort) => {
  try {
    const response = await axiosInstance.get(`/user/get-by-category`, {
      params: {
        category,
        subCategory,
        sort,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const userSignUp = async (name, email, password) => {
  try {
    const response = await axiosInstance.post("/user/sign-up", {
      name,
      email,
      password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const userLogin = async (email, password) => {
  try {
    console.log("Here is email: ", email, "password: ", password);
    const response = await axiosInstance.post("/user/login", {
      email,
      password,
    });
    return response;
  } catch (error) {
    console.log("error is encountered !!");
    throw error;
  }
};

export const userLogout = async () => {
  try {
    const response = await axiosInstance.delete("/user/login");
    return response;
  } catch (error) {
    throw error;
  }
};

export const userUpdate = async (userDetails) => {
  try {
    const response = await axiosInstance.patch(
      "/user/update/personal-details",
      userDetails
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUserDetails = async (id, category) => {
  try {
    let params;
    if (category === "personal") {
      params = { id, personal: true };
    }

    if (category === "wishlist") {
      params = { id, wishlist: true };
    }

    if (category === "profile-picture") {
      params = { id, profilePicture: true };
    }
    const response = await axiosInstance.get("/user/details", {
      params: params,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getProductBySearch = async (search) => {
  try {
    const response = await axiosInstance.get("/user/get-by-search", {
      params: {
        search,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const userUpdateDetails = async (userDetails) => {
  console.log(userDetails);
  try {
    const response = await axiosInstance.patch(
      "/user/update/details",
      userDetails
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteFromWishlist = async (user_id, product_id) => {
  const body = { user_id, product_id };
  try {
    const response = await axiosInstance.delete(
      "/user/update/delete-wishlist",
      {
        data: body,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateProfilePicture = async (
  user_id,
  profilePicture
) => {
  const body = { user_id, profilePicture };
  try {
    const response = await axiosInstance.patch(
      "/user/update/profile-picture",
      body
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const addToOrder = async (userData, order) => {
  const body = { userData, order };
  try {
    const response = await axiosInstance.post(
      "/user/add-to-order",
      body
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUserOrders = async (user_id) => {
  console.log("user_id: ", user_id);  
  try {
    const response = await axiosInstance.get("/user/get-user-orders", {
      params: {
        user_id
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
