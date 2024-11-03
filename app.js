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
    const result = additives.find(additive => additive.name.toLowerCase().includes(query));
    document.getElementById('result').innerHTML = result
        ? `${result.eNumber}: ${result.name}`
        : 'Additive not found.';
}
