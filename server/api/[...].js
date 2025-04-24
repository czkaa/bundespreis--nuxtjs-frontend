export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const url = getRequestURL(event);
  const path = url.pathname;

  // Get the path after /api/
  const apiPath = path.replace(/^\/api/, '');
  const targetUrl = `${config.public.backendUrl}${apiPath}`;

  // Forward method, headers, and body
  const method = getMethod(event);
  const headers = getRequestHeaders(event);

  // Add authorization
  headers.Authorization = `Bearer ${config.apiToken}`;

  // Get body for non-GET requests
  let body = null;
  if (method !== 'GET' && method !== 'HEAD') {
    body = await readBody(event);
  }

  try {
    // Forward the request to the backend
    return await $fetch(targetUrl, {
      method,
      headers,
      body,
    });
  } catch (error) {
    console.error(`API error for ${apiPath}:`, error);
    throw createError({
      statusCode: error.response?.status || 500,
      message: error.message,
    });
  }
});
