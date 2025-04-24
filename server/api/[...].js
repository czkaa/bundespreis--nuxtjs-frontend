// server/api/[...].js
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const url = getRequestURL(event);
  const path = url.pathname;

  // Get the path after /api/
  const apiPath = path.replace(/^\/api/, '');
  const targetUrl = `${config.public.backendUrl}${apiPath}`;

  console.log(`Proxying request from ${path} to ${targetUrl}`); // Add logging

  try {
    // Forward the request to the backend
    const response = await $fetch(targetUrl, {
      method: getMethod(event),
      headers: {
        ...getRequestHeaders(event),
        Authorization: `Bearer ${config.apiToken}`,
      },
    });

    console.log(`Received response from ${targetUrl}`); // Add logging
    return response;
  } catch (error) {
    console.error(`API error for ${apiPath}:`, error);

    // Return empty data instead of an error for 404s
    if (error.response?.status === 404) {
      return { footerPages: [] };
    }

    throw createError({
      statusCode: error.response?.status || 500,
      message: error.message,
    });
  }
});
