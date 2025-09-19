import { useEffect, useState } from "react";
import { Masonry } from "@mui/lab";
import { BiSearch } from "react-icons/bi";
import { Modal } from "@mui/material";
import axios from "axios";

function App() {
  const [userInput, setUserInput] = useState("");
  const [images, setImages] = useState([]);
  const key = import.meta.env.VITE_PHOTO_API;
  const url = "https://api.unsplash.com/";
  const [open, setOpen] = useState(false)
  const [newImage, setNewImage] = useState([])

  const handleOpen = (pic) => {
    setOpen(true);
    setNewImage(pic.urls.regular);
    console.log(newImage)
  }

  
  const searchHandler = async(input) => {
    try {
      const photos = await axios.get(
        `${url}/search/photos?query=${input}&page=1&per_page=20&client_id=${key}`
      );
      setImages(photos.data.results);
    } catch (error) {
      console.log(error);
    }
  };
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
          <form onSubmit={(e)=> {
            e.preventDefault();
            searchHandler(userInput)
          }}>
          <div className="flex gap-5 md:justify-center">
            <input
              onChange={(e) => setUserInput(e.target.value)}
              type="text"
              className="bg-red-400 rounded-md text-lg p-2 w-full md:w-[75%] lg:w-[60%]"
              placeholder="Here"
            />
            <button onClick={() => searchHandler(userInput)} className="cursor-pointer">
              <BiSearch />
            </button>
          </div>

          </form>
        </div>
        <Modal open={open} className="content-center" onClick={() =>setOpen(false)}>
          <div className="flex justify-center outline:none focus:outline-none">
            <img src={newImage} className="rounded-md w-[80%] md:w-[80%] lg:w-[30%]"  alt="" />
          </div>
        </Modal>
        <div className="p-3">

        <Masonry
          columns={{ xs: 2, sm: 3, md: 4, lg: 5 }}
          spacing={1}
          
        >
          
          {images.map((img, index) => (
              <img src={img.urls.small} key={index} onClick={() => handleOpen(img)} alt="" />
          ))}
        </Masonry>
        </div>
      </div>
    </>
  );
}

export default App;
