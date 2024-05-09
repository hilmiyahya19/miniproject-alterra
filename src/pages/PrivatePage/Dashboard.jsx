import { Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
// import Hero from "../../components/Hero/Hero";

function Dashboard() {
  return (
    <>
      {/* <Hero /> */}
      <div className="container mx-auto py-10 px-4 mt-10 mb-10 shadow-lg bg-slate-100 rounded-lg">
        <Text className="font-semibold text-2xl text-center mb-6">
          Manage your content here
        </Text>
        <Flex justifyContent="center">
          <div>
            <Link to="/manage/create">
              <Button colorScheme="blue">click here</Button>
            </Link>
          </div>
        </Flex>
      </div>
      <div className="container mx-auto py-10 px-4 mt-10 mb-10 shadow-lg bg-slate-100 rounded-lg">
        <Text className="font-semibold text-2xl text-center mb-6">
          Upload your video or image files locally here
        </Text>
        <Flex justifyContent="center" gap={8}>
          <div>
            <Text className="text-lg mb-2 text-center">Upload Video</Text>
            <Link to="/upload-video">
              <Button colorScheme="blue">Upload Video</Button>
            </Link>
          </div>
          <div>
            <Text className="text-lg mb-2 text-center">Upload Image</Text>
            <Link to="/upload-image">
              <Button colorScheme="blue">Upload Image</Button>
            </Link>
          </div>
        </Flex>
      </div>
    </>
  );
}

export default Dashboard;
