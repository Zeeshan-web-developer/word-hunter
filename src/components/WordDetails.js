import React from 'react';

function WordDetails({ wordData }) {
  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-lg w-full max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">{wordData.word}</h2>
      <h3 className="text-2xl font-semibold mb-2">Definitions</h3>
      {wordData.meanings.map((meaning, idx) => (
        <div key={idx} className="mb-4">
          <h4 className="text-xl font-semibold">{meaning.partOfSpeech}</h4>
          <ul className="list-disc ml-5 mt-2">
            {meaning.definitions.map((def, i) => (
              <li key={i} className="text-gray-700 mb-2">{def.definition}</li>
            ))}
          </ul>
        </div>
      ))}
      {wordData.synonyms && wordData.synonyms.length > 0 && (
        <div className="mt-4">
          <h3 className="text-2xl font-semibold">Synonyms</h3>
          <ul className="list-disc ml-5 mt-2">
            {wordData.synonyms.map((synonym, idx) => (
              <li key={idx} className="text-gray-700 mb-2">{synonym}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default WordDetails;
