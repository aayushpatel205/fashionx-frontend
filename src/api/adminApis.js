import axiosInstance from "../../axiosInstance";

export const adminLogin = async (username, password) => {
  try {
    const response = await axiosInstance.post("/admin/login", { username, password });
  } catch (error) {
    throw error;
  }
};

export const addProduct = async (product) => {
  try {
    const response = await axiosInstance.post("/admin/add-product", product);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const adminLogout = async () => {
  try {
    const response = await axiosInstance.delete("/admin/logout");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getAllOrders = async () => {
  try {
    const response = await axiosInstance.get("/admin/get-all-orders");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const updateOrderStatus = async (order_id, status) => {
  try {
    const response = await axiosInstance.post("/admin/update/order-status", { order_id, status });
    return response.data;
  } catch (error) {
    throw error;
  }
}