import constant from './constant';

const fetchData = async (query) => {
    const url = `${constant.BACKEND_URL}/${query}`;
    let result = null;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status_en}`);
        }
        result = await response.json();
    } catch (error) {
        // mockup
        if (query === 'products') {
            result = [
                { "id": "00000001", "name": "Product A", "price": 100 },
                { "id": "00000002", "name": "Product B", "price": 150 },
                { "id": "00000003", "name": "Product C", "price": 200 },
                { "id": "00000004", "name": "Product D", "price": 250 },
                { "id": "00000005", "name": "Product E", "price": 300 },
                { "id": "00000006", "name": "Product F", "price": 350 },
                { "id": "00000007", "name": "Product G", "price": 400 },
                { "id": "00000008", "name": "Product H", "price": 450 },
                { "id": "00000009", "name": "Product I", "price": 500 },
                { "id": "00000010", "name": "Product J", "price": 550 }
            ];
        }
        else if (query === 'transactions') {
            result = [
                { "id": "00000001", "gender": "man", "age": 100, "ethnicity": "Thai" },
                { "id": "00000002", "gender": "woman", "age": 85, "ethnicity": "Asian" },
                { "id": "00000003", "gender": "man", "age": 42, "ethnicity": "Hispanic" },
                { "id": "00000004", "gender": "woman", "age": 29, "ethnicity": "Caucasian" },
                { "id": "00000005", "gender": "man", "age": 53, "ethnicity": "African" },
                { "id": "00000006", "gender": "woman", "age": 67, "ethnicity": "Middle Eastern" },
                { "id": "00000007", "gender": "man", "age": 38, "ethnicity": "Asian" },
                { "id": "00000008", "gender": "woman", "age": 45, "ethnicity": "Caucasian" },
                { "id": "00000009", "gender": "man", "age": 70, "ethnicity": "Hispanic" },
                { "id": "00000010", "gender": "woman", "age": 25, "ethnicity": "African" }
            ];
        }
        else {
            result = url + " " + error;
        }
    }

    return result;
};

export default { fetchData };