import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { Card, Container, Heading, VStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL_2, import.meta.env.VITE_SUPABASE_KEY_2);

const CDNURL = `${import.meta.env.VITE_SUPABASE_URL_2}/storage/v1/object/public/images/`;

function UploadVideo() {
    const [videos, setVideos] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [fileInputKey, setFileInputKey] = useState(""); // memperbarui elemen input file dan membersihkan nilai file yang telah diupload

    async function getVideos() {
        const { data, error } = await supabase
            .storage
            .from("videos")
            .list("");

        if (error) {
            console.log(error);
            alert("Error grabbing file from Supabase");
        } else {
            if (data && data.length > 0) {
                // Filter hanya file video
                const filteredVideos = data.filter(video => video.name.endsWith('.mp4'));
                setVideos(filteredVideos);
            } else {
                setVideos([]);
            }
        }
    }

    useEffect(() => {
        getVideos();
    }, []);

    async function uploadFile(e) {
        setUploading(true);
        const videoFile = e.target.files[0];
        const { error } = await supabase.storage
            .from("videos")
            .upload(uuidv4() + ".mp4", videoFile);
        if (error) {
            console.log(error);
            alert("Error uploading file to Supabase");
        } else {
            alert("Video uploaded successfully!");
            setFileInputKey(uuidv4()); 
            getVideos(); // Mengambil ulang daftar video setelah unggah berhasil
        }
        setUploading(false);
    }

    return (
        <VStack spacing={4} alignItems="center" mt={10}>
            <Heading size="xl">Upload Video</Heading>
            <input key={fileInputKey} type="file" className="file-input file-input-bordered w-full max-w-xs"
            accept="video/mp4" onChange={(e) => uploadFile(e)}/>
            {uploading && <Text>Uploading...</Text>}
            {/* Tampilkan link URL dari video */}
            <Container maxW="xl" centerContent mb={10}>
                {videos.map((video, index) => (
                <Card key={index} p={4} maxW="xl" boxShadow="lg">
                    <Text mb={2}><span className="font-semibold text-lg">Link URL Gambar : </span>
                        <Link to={CDNURL + video.name} target="_blank" rel="noopener noreferrer">{CDNURL + video.name}
                        </Link>
                    </Text>
                    <video controls width="100%">
                      <source src={CDNURL + video.name} type="video/mp4" />  {/* Menampilkan video */}
                    </video>
                </Card>
                ))}
            </Container>
        </VStack>
    );
}

export default UploadVideo;
