// Fix for middleware export
// This should be placed in server/middleware/api-proxy.js

// Export the handler function directly
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const path = getRequestURL(event).pathname;

  // Only proxy API routes
  if (!path.startsWith('/api/')) {
    return;
  }

  // Strip /api prefix and proxy to the backend
  const targetPath = path.replace(/^\/api/, '');
  const targetUrl = `${config.public.backendUrl}${targetPath}`;

  // Forward headers and method
  const headers = getRequestHeaders(event);
  const method = getMethod(event);

  // Get request body for non-GET requests
  let body = null;
  if (method !== 'GET' && method !== 'HEAD') {
    body = await readBody(event);
  }

  // Add authorization header
  headers.Authorization = `Bearer ${config.apiToken}`;

  // Remove any existing origin headers that might cause issues
  delete headers.origin;
  delete headers.Origin;

  try {
    // Forward request to backend
    const response = await $fetch.raw(targetUrl, {
      method,
      headers,
      body,
      responseType: 'text', // Handle all response types
    });

    // Set response headers and status
    for (const [key, value] of Object.entries(response.headers)) {
      if (key !== 'content-encoding' && key !== 'content-length') {
        setResponseHeader(event, key, value);
      }
    }

    // Return the response
    return response._data;
  } catch (error) {
    console.error(`API proxy error for ${targetPath}:`, error);
    throw createError({
      statusCode: error.response?.status || 500,
      statusMessage: error.message,
    });
  }
});
