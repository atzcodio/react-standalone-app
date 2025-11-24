// Helper function to execute an API call node
const  ApiTask = async (apiData) => {
  const { endpoint, method, headers, params, timeout } = apiData;

  // Add params to URL for GET requests
  const url = method === "GET" && params ? `${endpoint}?${params}` : endpoint;

  const config = {
    method,
    timeout,
  };

  if (headers) {
    config.headers = JSON.parse(headers); // Add headers to config
  }

  if (method !== "GET" && method !== "HEAD" && params) {
    config.body = JSON.stringify(params); // Only add body if method allows it
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    console.log("API Call response:", data);
    return data;
  } catch (error) {
    console.error("API Call failed:", error);
  }
}

export default ApiTask;
