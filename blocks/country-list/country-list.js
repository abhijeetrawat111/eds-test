export default async function decorate(block) {
  // 1. Get the link element typed into the block in da.live
  const link = block.querySelector('a');
  const path = link ? link.getAttribute('href') : '/countries.json';

  try {
    // 2. Fetch the spreadsheet JSON data
    const response = await fetch(path);
    if (!response.ok) return;

    const json = await response.json();
    const rows = json.data;

    // 3. Create a wrapper container for visualization
    const container = document.createElement('div');
    container.className = 'country-grid';

    // 4. Build elements for each row in the JSON
    rows.forEach((row) => {
      const card = document.createElement('div');
      card.className = 'country-card';
      card.innerHTML = `
        <h3>${row.Country}</h3>
        <p><strong>Capital:</strong> ${row.Capital}</p>
        <p><strong>Continent:</strong> ${row.Continent}</p>
        <span class="badge">${row.Abbreviation}</span>
      `;
      container.appendChild(card);
    });

    // 5. Clear out the original raw link and append the rendered HTML
    block.textContent = '';
    block.appendChild(container);

  } catch (error) {
    console.error('Error rendering block:', error);
  }
}
