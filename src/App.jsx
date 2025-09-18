import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Masonry } from "@mui/lab";
import { BiSearch } from "react-icons/bi";

import axios from "axios";
function App() {
  const [images, setImages] = useState([]);
  const key = import.meta.env.VITE_PHOTO_API;
  const url = "https://api.unsplash.com/";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const photos = await axios.get(
          `${url}photos?page=1&per_page=20&client_id=${key}`
        );

        setImages(photos.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
    <div className="overflow-hidden">


      <div className="text-3xl gap-2 text-center p-3">
        <h1 className=" p-2 font-bold">Enter Image Title</h1>
        <div className="flex gap-2 items-center">
        <input onChange={() => console.log(e.target.value)}type="text" className="bg-red-400 rounded-md text-lg p-2 w-full" placeholder="Here" />
        <button onClick={() => console.log("click")}>
          <BiSearch/>
          </button>
        </div>
        
      </div>

      <Masonry columns={{xs:2, sm:2 , md:4, lg:4}} spacing={{xs:2, lg:2}} className="flex justify-evenly">
        {images.map((img,index) => (
          <div className="border" key={index}>
            <img src={img.urls.small} alt="" />
          </div>
        ))}
      </Masonry>
    </div>

      
    </>
  );
}

export default App;
