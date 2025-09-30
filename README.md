# 🛍️ FashionX E-Commerce Website

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-EF007C?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

---

A full-featured, modern fashion e-commerce web application built using the MERN stack. FashionX offers a seamless shopping experience for users while providing powerful admin management features for store administrators.

---

## 📌 Features

### 👥 Authentication & Authorization
- **User-based and Admin-based Login**
  - Secure login system with role-based access.
  - Admin has access to exclusive management dashboards and operations.

---

### 🛒 User Features

- **Product Browsing**
  - Browse products by categories: **Men’s**, **Women’s**, **Kids**.
  - Further filter products by **Topwear**, **Bottomwear**, and **Winterwear**.
  - Explore curated selections via the **Collections** page.
  - **Search Functionality** powered by **Fuse.js** for fuzzy, flexible searching.

- **Product Page**
  - View detailed product descriptions, images, and prices.
  - Option to **add items to cart** or **add to wishlist**.

- **Cart Management**
  - View all items added to your cart.
  - Increase, decrease, or remove quantities directly from the cart.
  - **Cart Persistence via `sessionStorage`**: Cart data for logged-in users persists through page refreshes during a session.

- **Wishlist**
  - Save products for later by adding them to the wishlist.
  - View and manage wishlist items separately.

- **Order Tracking**
  - Dedicated **Orders Page** where users can track the status of their orders in real-time.

- **Checkout Process**
  - Seamless checkout page that auto-fills personal details.
  - Card details form implemented with **proper validation**.
  - On completing payment:
    - Redirect to **Payment Success Page** or **Payment Failure Page**.
    - Both pages feature custom **animations using Framer Motion** for a delightful user experience.

- **Profile Management**
  - Users can update their **profile picture** and personal details from the **Profile Page**.

---

### 🛠️ Admin Features

- **Product Management**
  - View all existing products.
  - **Add new products** to the database with full details (title, category, description, price, image).

- **Order Tracking**
  - View all placed orders.
  - **Update order statuses** to track progress and notify users.

---

## 🧑‍💻 Technologies Used

| Technology        | Purpose                                                   |
|:-----------------:|:--------------------------------------------------------|
| **React.js**       | Frontend framework                                       |
| **React Router**   | Frontend routing & navigation                            |
| **Node.js**        | Backend runtime environment                              |
| **Express.js**     | Backend server framework                                 |
| **MongoDB**        | NoSQL database for storing data                          |
| **Mongoose**       | MongoDB ODM for Node.js                                  |
| **Fuse.js**        | Fuzzy search functionality                               |
| **Tailwind CSS**   | Styling and responsive design                            |
| **Framer Motion**  | Animations on payment success/failure pages              |
| **sessionStorage** | Cart data persistence during session                     |
| **Cloudinary** | Used For image storage and management for both profile pictures of users and for product images |

---

## 🚀 How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/aayushpatel205/fashionx-frontend.git
