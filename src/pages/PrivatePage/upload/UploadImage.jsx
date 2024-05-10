import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { Card, Container, Heading, VStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const supabase = createClient("https://lbhlhyseyqpnhwjmhugh.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiaGxoeXNleXFwbmh3am1odWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxNzQ5OTMsImV4cCI6MjAzMDc1MDk5M30.0LDbAFDSPlSZT6SSxgbrsvtU0IIGJZscZMlyZznbpwg");

const CDNURL = "https://lbhlhyseyqpnhwjmhugh.supabase.co/storage/v1/object/public/images/";

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
    <VStack spacing={4} alignItems="center" mt={10}>
      <Heading size="xl">Upload Image</Heading>
      <input key={fileInputKey} type="file" className="file-input file-input-bordered w-full max-w-xs"
      accept="image/*" onChange={(e) => uploadFile(e)}/>
      {uploading && <Text>Uploading...</Text>}
       {/* Tampilkan link URL dari gambar */}
      <Container maxW="xl" centerContent mb={10}>
        {images.map((image, index) => (
        <Card key={index} p={5} maxW="xl" boxShadow="lg">
          <Text mb={2}><span className="font-semibold text-lg">Link URL Gambar : </span>
              <Link to={CDNURL + image.name} target="_blank">{CDNURL + image.name}</Link>
          </Text>
          <img src={CDNURL + image.name} alt={image.name} style={{ maxWidth: "100%" }} /> {/* Menampilkan gambar */}
        </Card>
        ))}
      </Container>
    </VStack>
  );
}

export default UploadImage;
