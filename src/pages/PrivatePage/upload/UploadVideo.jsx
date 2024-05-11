import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL_2, import.meta.env.VITE_SUPABASE_KEY_2);

const CDNURL = `${import.meta.env.VITE_SUPABASE_URL_2}/storage/v1/object/public/videos/`;

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
        <div className="flex flex-col items-center mt-10">
        <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
        <input key={fileInputKey} type="file" className="file-input file-input-bordered w-full max-w-xs"
        accept="video/mp4" onChange={(e) => uploadFile(e)}/>
        {uploading && <p className="pt-4">Uploading...</p>}
        <div className="container mx-auto p-2 mt-6">
          {videos.map((video, index) => (
            <div key={index} className="max-w-xl mx-auto mb-8 shadow-lg p-2 rounded-xl">
                <div className="text-lg font-semibold mb-2">Link URL Video :</div>
                <Link to={CDNURL + video.name} target="_blank" className="text-blue-500">{CDNURL + video.name}</Link>
                <video controls width="100%" className="block w-full mt-4 p-2">
                    <source src={CDNURL + video.name} type="video/mp4" />  
                </video>
            </div>
          ))}
        </div>
      </div>
    );
}

export default UploadVideo;
