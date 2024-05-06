import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

function Content() {
  const [content, setContent] = useState([]);

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

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-4">
        {content.map((item) => (
          <div key={item.id} className="bg-white shadow-md rounded px-8 py-6">
            <p className="text-indigo-700 text-lg font-semibold">Creator : {item.creator}</p>
            <p className="text-pink-700 text-lg font-semibold">Title : {item.title}</p>
            <p className="text-gray-600 text-md">Description : {item.description}</p>
            <div className="pt-2">
              <video className="h-full w-full rounded-lg" controls autoPlay>
                <source src={item.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Content;
