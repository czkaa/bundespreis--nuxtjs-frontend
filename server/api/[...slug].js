export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const slug = event.context.params.slug;
  const url = `${config.public.apiBaseUrl}/${slug}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data for /${slug}:`, error);
    return {
      error: `Failed to fetch data for /${slug}`,
      message: error.message,
    };
  }
});
