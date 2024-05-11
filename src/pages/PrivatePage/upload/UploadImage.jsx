import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL_2, import.meta.env.VITE_SUPABASE_KEY_2);

const CDNURL = `${import.meta.env.VITE_SUPABASE_URL_2}/storage/v1/object/public/images/`;

function UploadImage() {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(""); // memperbarui elemen input file dan membersihkan nilai file yang telah diupload

 async function getImages() {
    const { data, error } = await supabase
      .storage
      .from("images")
      .list("");

    if (error) {
      console.log(error);
      alert("Error grabbing file from Supabase");
    } else {
      if (data && data.length > 0) {
        // Filter hanya file gambar
        const filteredImages = data.filter(image => image.name.endsWith('.jpeg') || image.name.endsWith('.jpg') || image.name.endsWith('.png'));
        setImages(filteredImages);
      } else {
        setImages([]);
      }
    }
  }

  useEffect(() => {
    getImages();
  }, []);

  async function uploadFile(e) {
    setUploading(true);
    const imageFile = e.target.files[0];
    const { error } = await supabase.storage
      .from("images")
      .upload(uuidv4() + ".jpg", imageFile); // Mengubah ekstensi sesuai dengan format file yang diunggah
    if (error) {
      console.log(error);
      alert("Error uploading file to Supabase");
    } else {
      alert("Image uploaded successfully!");
      setFileInputKey(uuidv4()); 
      getImages(); // Mengambil ulang daftar gambar setelah unggah berhasil
    }
    setUploading(false);
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-4">Upload Image</h1>
      <input key={fileInputKey} type="file" className="file-input file-input-bordered w-full max-w-xs"
      accept="image/*" onChange={(e) => uploadFile(e)}/>
      {uploading && <p className="pt-4">Uploading...</p>}
      <div className="container mx-auto p-2 mt-6">
        {images.map((image, index) => (
          <div key={index} className="max-w-xl mx-auto mb-8 shadow-lg p-2 rounded-xl">
            <div className="text-lg font-semibold mb-2">Link URL Gambar :</div>
            <Link to={CDNURL + image.name} target="_blank" className="text-blue-500">{CDNURL + image.name}</Link>
            <img src={CDNURL + image.name} alt={image.name} className="block w-full mt-4 p-2" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UploadImage;
