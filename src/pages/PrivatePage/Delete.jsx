import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Modal from "../../components/ui/Modal/Modal";

function Delete() {
  const [content, setContent] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getContent();
  }, []);

  async function getContent() {
    try {
      const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);
      const { data, error } = await supabase.from("content").select('*');
      if (error) {
        throw error;
      }
      setContent(data);
    } catch (error) {
      console.error("Error fetching content:", error.message);
    }
  }

  const handleDeleteClick = (selectedItem) => {
    setSelectedContent(selectedItem);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);
      const { data, error } = await supabase.from("content").delete().eq('id', selectedContent.id);
      if (error) {
        throw error;
      }
      console.log("Content deleted successfully:", data);
      // After successful deletion, reload the content
      getContent();
      // Close the modal
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting content:", error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-4">
        {content.map((item) => (
          <div key={item.id} className="bg-white shadow-md rounded px-8 py-6">
            <p>Creator : {item.creator}</p>
            <p>Title : {item.title}</p>
            <p>Description : {item.description}</p>
            <p>Video URL : {item.video}</p>
            <div>
              <button onClick={() => handleDeleteClick(item)} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 mt-2">Delete</button>
            </div>
          </div>
        ))}
      </div>
      <Modal show={showModal}>
        <div className="text-center">
          <p className="text-lg font-semibold mb-4">Are you sure you want to delete this content?</p>
          <div className="flex justify-center">
            <button onClick={handleConfirmDelete} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 mr-4">Delete</button>
            <button onClick={() => setShowModal(false)} className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Delete;
