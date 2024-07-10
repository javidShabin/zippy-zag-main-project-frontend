import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";

export default function EditProfile() {
  const [userData, setUserData] = useState(null); // Store the user's current data
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // Fetch the user's current profile data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance({
          method: "GET",
          url: "/user/user-profile",
        });
        setUserData(response.data.data);
        setValue("name", response.data.data.name);
        setValue("email", response.data.data.email);
        setValue("phone", response.data.data.phone);
      } catch (error) {
        toast.error("Failed to load user data");
      }
    };
    fetchUserData();
  }, [setValue]);

  // Handle form submission for profile update
  const onSubmit = async (formData) => {
    try {
      const updateData = new FormData();
      updateData.append("name", formData.name);
      updateData.append("email", formData.email);
      updateData.append("phone", formData.phone);

      // Append the image file only if a file is selected
      if (formData.image?.length > 0) {
        updateData.append("image", formData.image[0]);
      }

      // Send the updated profile data to the backend
      await axiosInstance({
        method: "PUT",
        url: "/user/update-profile",
        data: updateData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Update Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-[87vh]">
      {userData && (
        <div className="flex flex-col items-center mb-6">
          <img
            src={userData.image || "/default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-700">Edit Profile</h2>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg flex flex-col"
      >
        <label className="mb-1 font-medium text-gray-700">Name</label>
        <input
          className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          type="text"
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}

        <label className="mb-1 font-medium text-gray-700">Email</label>
        <input
          className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}

        <label className="mb-1 font-medium text-gray-700">Phone</label>
        <input
          className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          type="tel"
          placeholder="Phone"
          {...register("phone", { required: "Phone number is required" })}
        />
        {errors.phone && (
          <span className="text-red-500">{errors.phone.message}</span>
        )}

        <label className="mb-1 font-medium text-gray-700">Profile Image</label>
        <input
          type="file"
          className="mb-4"
          {...register("image")}
          accept="image/*"
        />

        <input
          type="submit"
          value="Update Profile"
          className="bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 cursor-pointer w-full transition duration-300"
        />
      </form>
    </div>
  );
}
