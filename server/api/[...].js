// server/api/[...].js
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const url = getRequestURL(event);
  const path = url.pathname;

  // Skip service worker requests - these should be handled by Nuxt
  if (path.includes('sw.js')) {
    return;
  }

  // Get the path after /api/
  const apiPath = path.replace(/^\/api/, '');
  const targetUrl = `${config.public.backendUrl}${apiPath}`;

  // Forward method, headers, and body
  const method = getMethod(event);
  const headers = getRequestHeaders(event);

  // Add authorization
  headers.Authorization = `Bearer ${config.apiToken}`;

  try {
    // Forward the request to the backend
    return await $fetch(targetUrl, {
      method,
      headers,
    });
  } catch (error) {
    // For 404 errors, return empty data instead of throwing an error
    if (error.response?.status === 404) {
      return { footerPages: [] };
    }

    console.error(`API error for ${apiPath}:`, error);
    throw createError({
      statusCode: error.response?.status || 500,
      message: error.message,
    });
  }
});
