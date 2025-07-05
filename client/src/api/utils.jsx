import axios from "axios"

export const imageUplod = async imagedata=>{


    const imageFormData = new FormData() 

    imageFormData.append('image',imagedata) 

    try {
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
      imageFormData
    );

    const imagURL = res.data?.data.display_url 
    
    
    return imagURL
    
    
    
    
// Uploaded image response
  } catch (error) {
    console.error("Image upload failed:", error);
  }



};

