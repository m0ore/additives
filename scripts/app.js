async function loadAdditives() {
    const response = await fetch('./additives.csv');
    const data = await response.text();
    return data.split('\n').map(line => {
        const [eNumber, name] = line.split(',');
        return { eNumber, name };
    });
}

async function searchAdditive() {
    const query = document.getElementById('search').value.toLowerCase();
    const additives = await loadAdditives();

    // Set up Fuse.js with appropriate options
    const fuse = new Fuse(additives, {
        keys: ['name', 'eNumber'],
        threshold: 0.3  // Adjust for more or less strict matching
    });

    const results = fuse.search(query);

    // Display results or a no match message
    const resultDiv = document.getElementById('result');
    if (results.length > 0) {
        resultDiv.innerHTML = results.map(result => `${result.item.eNumber}: ${result.item.name}`).join('<br>');
    } else {
        resultDiv.innerHTML = 'No additive found.';
    }
}
