async function getLabelsAPI(handleResponse, handleError){
    try {
        const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
        const endPoint = '/api/v2/labels';
        const url = new URL(endPoint, baseUrl);

        const response = await fetch(url);
        const jsonData = await response.json();

        if(!response.ok){
            const errorMessage = jsonData.message || "Unknown error occurred";
            throw new Error(errorMessage)
        }
        handleResponse(jsonData)
    } catch (error) {
        handleError(error.message)   
    }
}

export default getLabelsAPI;