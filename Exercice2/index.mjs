import fetch from 'node-fetch';


async function fetchWithRetry(url, options, retries = 3, delay = 1000) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${url}: ${error.message}`);
        if (retries > 0) {
            console.log(`Retrying... (${retries} retries left)`);
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchWithRetry(url, options, retries - 1, delay);
        } else {
            throw new Error(`Failed to fetch ${url} after ${retries + 1} attempts.`);
        }
    }
}
const url = 'https://jsonplaceholder.typicode.com/posts/1';
const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

fetchWithRetry(url, options)
    .then(data => console.log('Data:', data))
    .catch(error => console.error('Error:', error));
