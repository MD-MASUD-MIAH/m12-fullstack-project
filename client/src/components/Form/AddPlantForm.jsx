// import axios from "axios";

import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { imageUplod } from "../../api/utils";
import useAuth from "../../hooks/useAuth";

const AddPlantForm = () => {
  const navigate = useNavigate();

  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    // Get the actual file
    setIsUploading(true);

    try {
      const imageFile = data.image[0];

      const image = await imageUplod(imageFile);
      const plant = {
        ...data,
        price:parseFloat(data.price),
        quantity:parseInt(data.quantity),
        image,
        seller: {
          name: 
          user.displayName,
          email: user.email,
          imageUrl: user?.photoURL,
        },
      };

      await axios
        .post(`${import.meta.env.VITE_API_URL}/add-plant`, plant)
        .then((res) => {
          if (res.data.insertedId) {
            toast.success("Plant Data Added Successfully, Yeee!");
            reset();
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log("error mama", err);
    } finally {
      setIsUploading(false);
    }
    // Append the file, not just its name
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    console.log(image);
    try {
      // image url response from imgbb
      const imageUrl = await imageUplod(image);
      console.log(imageUrl);
      setUploadedImage(imageUrl);
    } catch (err) {
      setImageUploadError("Image Upload Failed");
      console.log(err);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="name"
                {...register("name")}
                id="name"
                type="text"
                placeholder="Plant Name"
                required
              />
            </div>
            {/* Category */}
            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-600 ">
                Category
              </label>
              <select
                required
                {...register("category")}
                className="w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="category"
              >
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Succulent">Succulent</option>
                <option value="Flowering">Flowering</option>
              </select>
            </div>
            {/* Description */}
            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>

              <textarea
                id="description"
                placeholder="Write plant description here..."
                className="block rounded-md focus:lime-300 w-full h-32 px-4 py-3 text-gray-800  border border-lime-300 bg-white focus:outline-lime-500 "
                name="description"
                {...register("description")}
              ></textarea>
            </div>
          </div>
          <div className="space-y-6 flex flex-col">
            {/* Price & Quantity */}
            <div className="flex justify-between gap-2">
              {/* Price */}
              <div className="space-y-1 text-sm">
                <label htmlFor="price" className="block text-gray-600 ">
                  Price
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  name="price"
                  id="price"
                  type="number"
                  placeholder="Price per unit"
                  required
                  {...register("price")}
                />
              </div>

              {/* Quantity */}
              <div className="space-y-1 text-sm">
                <label htmlFor="quantity" className="block text-gray-600">
                  Quantity
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  name="quantity"
                  id="quantity"
                  type="number"
                  placeholder="Available quantity"
                  required
                  {...register("quantity")}
                />
              </div>
            </div>
            {/* Image */}
            <div className=" p-4  w-full  m-auto rounded-lg flex-grow">
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex items-center gap-5 w-max mx-auto text-center">
                  <label>
                    <input
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      {...register("image", {
                        onChange: (e) => handleImageUpload(e),
                      })}
                      hidden
                    />
                    <div className="bg-lime-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-500">
                      Upload
                    </div>
                  </label>
                  {uploadedImage && (
                    <div className="w-full">
                      <img
                        className="w-[100px]"
                        src={uploadedImage}
                        alt="plant image"
                      />
                    </div>
                  )}
                  {imageUploadError && <p>{imageUploadError}</p>}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500 "
            >
              {isUploading ? "  Saving..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPlantForm;
