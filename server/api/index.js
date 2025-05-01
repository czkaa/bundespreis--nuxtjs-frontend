export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  try {
    const response = await fetch(`${config.public.apiBaseUrl}`);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching root data:', error);
    return {
      error: 'Failed to fetch root data',
      message: error.message,
    };
  }
});
