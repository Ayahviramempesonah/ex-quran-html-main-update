// async function getData() {
//     const url = "https://equran.id/api/v2/surat/1";
//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(`Response status: ${response.status}`);
//       }
  
//       const json = await response.json();
//       console.log(json);
//     } catch (error) {
//       console.error(error.message);
//     }
//   }
  

document.getElementById('fetchButton').addEventListener('click', () => {
    fetch('https://equran.id/api/v2/surat/1')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        displaySurat(data.data);
      })
      .catch(error => {
        console.error('Fetch error:', error);
        document.getElementById('result').innerHTML = '<p>Error fetching data. Please try again later.</p>';
      });
  });
  
  function displaySurat(surat) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
      <h2>${surat.namaLatin} (${surat.nama})</h2>
      <p><strong>Arti:</strong> ${surat.arti}</p>
      <p><strong>Jumlah Ayat:</strong> ${surat.jumlahAyat}</p>
      <p><strong>Tempat Turun:</strong> ${surat.tempatTurun}</p>
      <p>${surat.deskripsi}</p>
      <h3>Ayat:</h3>
      ${surat.ayat
        .map(
          ayat => `
          <div class="ayat">
            <span>${ayat.nomorAyat}. </span>
            <div class="teks-arab">${ayat.teksArab}</div>
            <p>${ayat.teksIndonesia}</p>
            <audio controls>
              <source src="${ayat.audio['01']}" type="audio/mpeg">
              Your browser does not support the audio element.
            </audio>
          </div>
        `
        )
        .join('')}
    `;
  }
  