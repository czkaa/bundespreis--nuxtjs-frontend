// getData.js
export default function getData() {
  const apiToken = useRuntimeConfig().apiToken;
  const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl;

  const authHeader = {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
  };

  const getPageData = async (slug) => {
    const data = await $fetch(apiBaseUrl + slug, authHeader);
    if (typeof data === 'string') {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error('Failed to parse JSON:', e);
        return data;
      }
    }

    return data;
  };

  return {
    getPageData,
  };
}
