const key = 'YOUR_API_KEY'; // Replace with your Azure API key
const endpoint = 'YOUR_ENDPOINT'; // Replace with your Azure endpoint
const location = 'YOUR_LOCATION'; // Replace with your Azure region

const sourceTextElement = document.getElementById('sourceText');
const targetLanguageElement = document.getElementById('targetLanguage');
const translateButton = document.getElementById('translateButton');
const translatedTextElement = document.getElementById('translatedText');

async function translateText(text, targetLanguage) {
    const url = `${endpoint}/translate?api-version=3.0&from=en&to=${targetLanguage}`;
    const headers = {
        'Ocp-Apim-Subscription-Key': key,
        'Ocp-Apim-Subscription-Region': location,
        'Content-Type': 'application/json'
    };
    const body = JSON.stringify([{ 'text': text }]);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data[0].translations[0].text;
    } catch (error) {
        console.error('Error:', error);
        translatedTextElement.value = `Error: ${error.message}`;
        return "";
    }
}

translateButton.addEventListener('click', async () => {
    const textToTranslate = sourceTextElement.value;
    const targetLanguageCode = targetLanguageElement.value;

    if (!textToTranslate) {
        translatedTextElement.value = 'Please enter text to translate.';
        return;
    }

    const translatedText = await translateText(textToTranslate, targetLanguageCode);
    translatedTextElement.value = translatedText;
});