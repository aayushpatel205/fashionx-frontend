import { useState, useRef } from "react";
import UserDetails from "../components/UserDetails";
import UserWishlist from "../components/UserWishlist";
import MyOrderPage from "./MyOrderPage";
import { uploadImage } from "../uploadImageFunction";
import { useUserData } from "../src/Context/UserDataContext";
import { updateProfilePicture } from "../src/api/userApis";
import prifleImg from "../src/assets/admin_assets/profile-candidate.png";

const ProfilePage = () => {
  const { userData, setUserData } = useUserData();
  console.log(userData);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef(null); // Ref for hidden file input

  const handleImageChange = (e) => {
    console.log("Hiiiii");
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file)); // for preview
    }
    console.log("imgPreviews: ", imagePreview);
  };

  const uploadProfilePicture = async () => {
    if (!selectedFile) {
      return;
    }
    try {
      const response = await uploadImage(selectedFile, "profile");
      const response2 = await updateProfilePicture(userData?.data.id, response);
      setUserData({ ...userData, profilePicture: response });
      isLoading(false);
      console.log("Upload response:", response2);
    } catch (error) {
      console.error("Error uploading image:", error);
      isLoading(false);
    }
  };

  const removeImage = () => {
    try {
      const response = updateProfilePicture(userData?.data.id, "");
      setUserData({ ...userData, profilePicture: "" });
      setImagePreview(null);
      setSelectedFile(null);
      setIsLoading(false);
    } catch (error) {
      console.error("Error removing image:", error);
      setIsLoading(false);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click(); // trigger hidden input click
  };

  return (
    <div className="h-[100%] w-full flex flex-col gap-5 items-center">
      <div className="flex flex-col items-center justify-center mt-12 gap-5">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />

        <div
          className="h-32 w-32 rounded-full overflow-hidden cursor-pointer border-4 border-gray-300 flex justify-center items-center"
          onClick={handleImageClick}
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              className="h-full w-full object-cover"
              alt="Profile Preview"
            />
          ) : !userData?.profilePicture ? (
            <img
              src="../src/assets/admin_assets/profile-candidate.png"
              className="h-20 w-20 object-cover"
              alt="Default Profile"
            />
          ) : userData?.profilePicture ? (
            <img
              src={userData?.profilePicture}
              className="h-full w-full object-cover"
              alt="Profile"
            />
          ) : (
            <div>
              <div className="w-12 h-12 border-4 border-black rounded-full border-t-transparent animate-spin"></div>
            </div>
          )}
        </div>

        <p className="text-center text-4xl font-medium">{userData?.data.name}</p>
      </div>

      <div className="w-full flex gap-5 justify-center">
        <button
          className="w-[15%] mt-5 bg-black h-12 text-white text-sm hover:opacity-85 cursor-pointer uppercase"
          onClick={uploadProfilePicture}
        >
          upload image
        </button>

        <button
          className="w-[15%] mt-5 bg-red-600 h-12 text-white text-sm hover:opacity-85 cursor-pointer uppercase"
          onClick={removeImage}
        >
          remove image
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
