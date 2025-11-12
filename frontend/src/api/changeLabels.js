async function changeStatusAPI(
  status,
  taskId,
  handleResponse,
  handleError,
  setLoading
) {
  setLoading(true);
  try {
    const baseUrl = import.meta.emv.VITE_APP_API_BASE_URL;
    const endPoint = `/api/v2/task/${taskId}/status`;
    const url = new URL(endPoint, baseUrl);
    const requestBody = JSON.stringify({ status });

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });

    const jsonData = await response.json();
    if (!response.ok) {
      const errorMessage = jsonData.message || "Unknown error occurred";
      throw new Error(errorMessage);
    }
    handleResponse(jsonData);
  } catch (error) {
    handleError(error);
  } finally {
    setLoading(false);
  }
}

export default changeStatusAPI;
