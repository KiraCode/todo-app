async function fetchTasksAPI(handleResponse, handleError, options = {}) {
  try {
    const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
    const endPoint = "/api/v2/tasks";

    const url = new URL(endPoint, baseUrl);
    if (options.sortOptions) {
      // http://localhost:5000/api/v2/tasks?sort_by=date_added&sort_type=ase
      url.searchParams.append("sort_by", options.sortOptions);
      url.searchParams.append("sort_type", "asc");
    }

    // http://localhost:5000/api/v2/tasks?status=["open"]
    if (options.selectedStatus?.length) {
      const stringifiedArray = JSON.stringify(options.selectedStatus);
      url.searchParams.append("status", stringifiedArray);
    }

    // http://localhost:5000/api/v2/tasks?label=["React","assignemnt"]
    if (options.selectedLabels?.length) {
      const stringifiedArray = JSON.stringify(option.selectedLabels);
      url.searchParams.append("labels", stringifiedArray);
    }

    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      console.error("error response", errorText);
      throw new Error(`HTTP Error ${response.status}: ${errorText}`);
    }

    const jsonData = await response.json();
    console.log(jsonData);
    handleResponse(jsonData);
  } catch (error) {
    handleError(error.message);
  }
}

export default fetchTasksAPI;
