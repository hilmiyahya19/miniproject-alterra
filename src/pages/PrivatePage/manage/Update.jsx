import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

function Update() {
  const [content, setContent] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video: "",
    creator: ""
  });

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

  const handleUpdateClick = (selectedItem) => {
    setSelectedContent(selectedItem);
    setFormData(selectedItem);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);
        const { data, error } = await supabase.from("content").update(formData).eq('id', selectedContent.id);
        if (error) {
            throw error;
        }
        console.log("Content updated successfully:", data);
        // Reset the form after successful submission
        setFormData({
            title: "",
            description: "",
            video: "",
            creator: ""
        });
        setSelectedContent(null);
        // Reload the page
        window.location.reload();
        } catch (error) {
            console.error("Error updating content:", error.message);
        }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-4">
        {content.map((item) => (
          <div key={item.id} className="bg-white shadow-md rounded px-8 py-6">
            <p><span className="font-semibold">Creator</span> : {item.creator}</p>
            <p><span className="font-semibold">Title</span> : {item.title}</p>
            <p><span className="font-semibold">Description</span> : {item.description}</p>
            <p><span className="font-semibold">Video URL</span> : {item.video}</p>
            <div>
              <button onClick={() => handleUpdateClick(item)} className="bg-yellow-300 text-white py-2 px-4 rounded-md hover:bg-yellow-400 focus:outline-none focus:bg-yellow-400 mt-2">Update</button>
            </div>
          </div>
        ))}
      </div>
      {selectedContent && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Update Content</h2>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title</label>
              <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="border-gray-300 border rounded-md p-2 w-full" />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
              <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="border-gray-300 border rounded-md p-2 w-full h-32 resize-none"></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="video" className="block text-gray-700 font-semibold mb-2">Video URL</label>
              <input type="text" id="video" name="video" value={formData.video} onChange={handleChange} className="border-gray-300 border rounded-md p-2 w-full" />
            </div>
            <div className="mb-4">
              <label htmlFor="creator" className="block text-gray-700 font-semibold mb-2">Creator</label>
              <input type="text" id="creator" name="creator" value={formData.creator} onChange={handleChange} className="border-gray-300 border rounded-md p-2 w-full" />
            </div>
            <div className="text-center">
              <button type="submit" className="bg-yellow-300 text-white py-2 px-4 rounded-md hover:bg-yellow-400 focus:outline-none focus:bg-yellow-400">Update</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Update;
