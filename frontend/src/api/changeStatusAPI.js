async function changeStatusAPI(
  status,
  taskId,
  handleResponse,
  handleError,
  setLoading
) {
  setLoading(true);
  try {
    const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
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
      const errorMesage = jsonData.message || "Unknown error occured";
      throw new Error(errorMesage);
    }
    handleResponse(jsonData);
  } catch (error) {
    handleError(error.message);
  } finally {
    setLoading(false);
  }
}

export default changeStatusAPI;
