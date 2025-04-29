export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const lang = query.lang || 'de'
  const config = useRuntimeConfig();
  const apiUrl = config.public.apiUrl;
  
  try {
    const response = await fetch(`${apiUrl}/${lang}`);
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching data from external API',
      data: {
        message: error instanceof Error ? error.message : 'Unknown error'
      }
    });
  }
})