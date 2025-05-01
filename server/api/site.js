export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const slug = event.context.params?.slug || '';
  const url = slug
    ? `${config.public.apiBaseUrl}/${slug}`
    : `${config.public.apiBaseUrl}/site`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching site data:', error);
    return {
      error: 'Failed to fetch site data',
      message: error.message,
    };
  }
});
