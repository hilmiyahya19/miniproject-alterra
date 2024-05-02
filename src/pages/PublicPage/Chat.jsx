import { useEffect, useState } from 'react';

function App() {
  const [ respond, setRespond ] = useState();
  const [ prompt, setPrompt ] = useState('');

  useEffect(() => {
  }, []);

  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
  const handleSubmit = async (e) => {
    //menyambungkan ke Open ai dan memasukkan prompt
    e.preventDefault();
    const promptAwal =
      'kamu adalah CineBot, CineBot adalah asisten pribadi user(pemberi pertanyaan) dalam dunia film!, user Cukup memberi tahu kamu  genre, negara asal, atau judul film yang user sukai, dan kamu akan memberikan rekomendasi yang sesuai dengan preferensi user';
    // ini adalah cara setting open ai
    const APIBody = {
      model: 'gpt-4',
      messages: [
        {
          role: 'user',
          content: `${promptAwal} + berikan list rekomendasi film sesuai pertanyaan dari user, cari referensi nya dari Internet Movie Database (IMDb) + pertanyaan dari user${prompt}`
        }
      ]
    };

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + API_KEY
        },
        body: JSON.stringify(APIBody)
      });

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await response.json();
      console.log(data);
      setRespond(data.choices[0].message.content);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-md p-4 bg-white rounded-lg shadow-lg mt-5 mb-5">
      <h1 className="text-3xl font-bold mb-4 text-center">CineBot</h1>
      <p className="text-xl font-bold mb-4 text-center">Your Personal Movie Recommender</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="prompt" className="block mb-2 text-center pb-3">CineBot adalah asisten pribadi anda dalam dunia film! Cukup beri tahu saya genre, negara asal, atau judul film yang anda sukai, dan saya akan memberikan rekomendasi yang sesuai dengan preferensi anda</label>
        <textarea 
          id="prompt" 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)} 
          className="border border-gray-300 rounded-md p-2 w-full mb-4 outline-none focus:border-blue-500"
          rows="4"
        />
        <button 
          type="submit" 
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Kirim ke CineBot
        </button>
      </form>
      <div className="mt-4">
        {respond && (
          <div className="bg-gray-100 rounded-md p-4">
            <h2 className="font-bold mb-2">Jawaban dari CineBot:</h2>
            <p>{respond}</p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default App;