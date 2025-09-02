async function searchWord() {
  const word = document.getElementById("wordInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!word) {
    resultDiv.innerHTML = "<p>Please enter a word!</p>";
    return;
  }

  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!res.ok) throw new Error("Word not found");

    const data = await res.json();
    const definition = data[0].meanings[0].definitions[0].definition;
    const partOfSpeech = data[0].meanings[0].partOfSpeech;

    resultDiv.innerHTML = `
      <h3>${word}</h3>
      <p><strong>Part of Speech:</strong> ${partOfSpeech}</p>
      <p><strong>Definition:</strong> ${definition}</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = "<p>❌ Word not found!</p>";
  }
}
