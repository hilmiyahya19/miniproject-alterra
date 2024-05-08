import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { Card, Container, Heading, VStack, Input, Text } from "@chakra-ui/react";

const supabase = createClient("https://lbhlhyseyqpnhwjmhugh.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiaGxoeXNleXFwbmh3am1odWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxNzQ5OTMsImV4cCI6MjAzMDc1MDk5M30.0LDbAFDSPlSZT6SSxgbrsvtU0IIGJZscZMlyZznbpwg");

const CDNURL = "https://lbhlhyseyqpnhwjmhugh.supabase.co/storage/v1/object/public/videos/";

function CreateVideo() {
    const [videos, setVideos] = useState([]);
    const [uploading, setUploading] = useState(false);

    async function getVideos() {
        const { data, error } = await supabase
            .storage
            .from("videos")
            .list("");

        if (error) {
            console.log(error);
            alert("Error grabbing file from Supabase");
        } else {
            setVideos(data || []);
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
            getVideos();
        }
        setUploading(false);
    }

    return (
        <VStack spacing={4} alignItems="center" pt={10}>
            <Heading size="xl">Upload Video</Heading>
            <Input type="file" accept="video/mp4" onChange={(e) => uploadFile(e)} />
            {uploading && <Text>Uploading...</Text>}
            <Container maxW="xl" centerContent>
                {videos.map((video, index) => (
                    <Card key={index} p={4} maxW="xl" boxShadow="lg">
                        <video controls width="100%">
                            <source src={CDNURL + video.name} type="video/mp4" />
                        </video>
                    </Card>
                ))}
            </Container>
        </VStack>
    );
}

export default CreateVideo;
