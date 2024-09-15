import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WordDetails from './components/WordDetails';

function App() {
  const [wordData, setWordData] = useState(null);

  const fetchWordData = async (searchWord) => {
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`);
      const synonymsResponse = await axios.get(`https://api.datamuse.com/words?rel_syn=${searchWord}`);
      
      setWordData({
        ...response.data[0],
        synonyms: synonymsResponse.data.map(syn => syn.word)
      });
    } catch (error) {
      console.error('Error fetching word data:', error);
      setWordData(null);
    }
  };

  const clearWordData = () => {
    setWordData(null); // Clear word data
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center justify-center px-4 py-8">
      <header className="w-full max-w-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-6 px-8 rounded-lg shadow-lg mb-8 text-center">
        <h1 className="text-4xl font-extrabold mb-2">Dictionary App</h1>
        <p className="text-lg">Find meanings, synonyms, and more</p>
      </header>

      <main className="w-full max-w-2xl">
        <SearchBar onSearch={fetchWordData} onClear={clearWordData} />

        {wordData && (
          <WordDetails wordData={wordData} />
        )}
      </main>
    </div>
  );
}

export default App;
