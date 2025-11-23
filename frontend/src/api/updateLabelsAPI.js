async function updateLabelsAPI(labels, taskId, handleResponse, handleError) {
  try {
    const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
    const endPoint = `/api/v2/task/${taskId}/labels`;

    const url = new URL(endPoint, baseUrl);
    const requestBody = JSON.stringify({ labels });

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });

    const jsonData = await response.json();
    if (!response.ok) {
      const errorMessage = jsonData.message || "Uknown error occured";
      throw new Error(errorMessage);
    }
    handleResponse(jsonData);
  } catch (error) {
    handleError(error.message);
  }
}

export default updateLabelsAPI;
