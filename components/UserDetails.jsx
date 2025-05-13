import React, { useEffect, useState } from "react";
import { useUserData } from "../src/Context/UserDataContext";
import { getUserDetails, userUpdate } from "../src/api/userApis";

const UserDetails = () => {
  const { userData, setUserData } = useUserData();
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const category = "personal";
        const response = await getUserDetails(userData?.data.id ,category);
        setUserDetails({
          firstName: response?.data.user.firstName,
          lastName: response?.data.user.lastName,
          street: response?.data.user.address.street,
          city: response?.data.user.address.city,
          state: response?.data.user.address.state,
          zipcode: response?.data.user.address.zipcode,
          country: response?.data.user.address.country,
          phoneNumber: response?.data.user.phoneNumber,
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getData();
  }, [userData]);


  return loading ? (
    <div className="flex h-screen mt-5 ml-5">
      <div className="w-16 h-16 border-4 border-black rounded-full border-t-transparent animate-spin"></div>
    </div>
  ) : (
    <div className="flex flex-col gap-5 w-[85%]">
      <div className="flex justify-between">
        <input
          value={userDetails.firstName}
          onChange={(e) =>
            setUserDetails({ ...userDetails, firstName: e.target.value })
          }
          className="w-[48%] border-1 border-gray-200 h-10 px-2 outline-none"
          placeholder="First Name"
        />
        <input
          value={userDetails.lastName}
          onChange={(e) =>
            setUserDetails({ ...userDetails, lastName: e.target.value })
          }
          className="w-[48%] border-1 border-gray-200 h-10 px-2 outline-none"
          placeholder="Last Name"
        />
      </div>
      <input
        value={userData.data.email}
        onChange={(e) =>
          setUserData({
            ...userData,
            data: { ...userData.data, email: e.target.value },
          })
        }
        className="w-[100%] border-1 border-gray-200 h-10 px-2 outline-none"
        placeholder="Email Address"
      />
      <input
        value={userDetails.street}
        onChange={(e) =>
          setUserDetails({ ...userDetails, street: e.target.value })
        }
        className="w-[100%] border-1 border-gray-200 h-10 px-2 outline-none"
        placeholder="Street"
      />

      <div className="flex justify-between">
        <input
          value={userDetails.city}
          onChange={(e) =>
            setUserDetails({ ...userDetails, city: e.target.value })
          }
          className="w-[48%] border-1 border-gray-200 h-10 px-2 outline-none"
          placeholder="City"
        />
        <input
          value={userDetails.state}
          onChange={(e) =>
            setUserDetails({ ...userDetails, state: e.target.value })
          }
          className="w-[48%] border-1 border-gray-200 h-10 px-2 outline-none"
          placeholder="State"
        />
      </div>

      <div className="flex justify-between">
        <input
          value={userDetails.zipcode}
          onChange={(e) =>
            setUserDetails({ ...userDetails, zipcode: e.target.value })
          }
          className="w-[48%] border-1 border-gray-200 h-10 px-2 outline-none"
          placeholder="Zip Code"
        />
        <input
          value={userDetails.country}
          onChange={(e) =>
            setUserDetails({ ...userDetails, country: e.target.value })
          }
          className="w-[48%] border-1 border-gray-200 h-10 px-2 outline-none"
          placeholder="Country"
        />
      </div>
      <input
        value={userDetails.phoneNumber}
        onChange={(e) =>
          setUserDetails({ ...userDetails, phoneNumber: e.target.value })
        }
        className="w-[100%] border-1 border-gray-200 h-10 px-2 outline-none"
        placeholder="Phone"
      />
      <button
        onClick={async () => {
          try {
            const id = userData.data.id;
            const response = await userUpdate({ ...userDetails, id });
            console.log(response);
          } catch (error) {
            console.log(error);
          }
        }}
        className="w-[30%] uppercase bg-black h-10 text-white text-sm hover:opacity-85 cursor-pointer"
      >
        update details
      </button>
    </div>
  );
};

export default UserDetails;
