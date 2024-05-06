import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

function Create() {
  const [formData, setFormData] = useState({
    creator:"",
    title: "",
    description: "",
    video: ""
  });

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
      const { data, error } = await supabase.from("content").insert([formData]);
      if (error) {
        throw error;
      }
      console.log("Content added successfully:", data);
      // Reset the form after successful submission
      setFormData({
        creator:"",
        title: "",
        description: "",
        video: ""
      });
    } catch (error) {
      console.error("Error adding content:", error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="creator" className="block text-gray-700 font-semibold mb-2">Creator</label>
          <input type="text" id="creator" name="creator" value={formData.creator} onChange={handleChange} className="border-gray-300 border rounded-md p-2 w-full" />
        </div>
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
        <div className="text-center">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Create;
