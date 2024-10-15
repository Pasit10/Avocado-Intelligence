import constant from './constant';

const fetchData = async (query) => {
    const url = `${constant.BACKEND_URL}/${query}`;
    let result = null;

    try {
        const response = await fetch(url);

        // Get the response text
        const text = await response.text();

        // Only attempt to parse if the text is non-empty
        if (text) {
            result = JSON.parse(text);
        } else {
            result = [];  // Handle empty response
        }
    } catch (error) {
        result = [];  // Default to empty array in case of an error
        console.error("Error fetching or parsing data:", error);
    }

    return result;
};

const fetchImg = async (query) => {
    const url = `${constant.BACKEND_URL}/${query}`;
    let result = null;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status_en}`);
        }
        const blob = response.blob();
        result = URL.createObjectURL(blob);
    } catch (error) {
        console.error(error);
    }

    return result;
}

const fetchPost = async (path, data) => {
    const url = `${constant.BACKEND_URL}/${path}`;
    const body = JSON.stringify(data);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body
        });

        const result = await response.json();
        console.log(result.code)
        if (!result.code) {
            return undefined;
        }
        return result;
    } catch (error) {
        console.error('Error making POST request:', error);
    }
};

const fetchDelete = async (path, param) => {
    const url = `${constant.BACKEND_URL}/${path}/${param}`;
    try {
        const response = await fetch(url, {
            method: 'DELETE',
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error making DELETE request:', error);
        throw error;
    }
}

export default { fetchData, fetchImg, fetchPost, fetchDelete };