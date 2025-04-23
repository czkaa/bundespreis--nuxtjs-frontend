<template>
  <!-- This is an empty element, as all SEO-related tags are added to head -->
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  url: {
    type: String,
    default: ''
  }
});

const { locale } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const config = useRuntimeConfig();

// Get the base URL from the configuration
const baseUrl = config.i18n?.baseUrl || 'https://charlotterohde.de';

// Compute the canonical URL
const canonicalUrl = computed(() => {
  if (props.url) return props.url;
  const path = route.path === `/${locale.value}` ? '' : route.path.replace(`/${locale.value}`, '');
  return `${baseUrl}${localePath(path)}`;
});

// Set up meta for current page
useHead({
  title: props.title,
  meta: [
    {
      name: 'description',
      content: props.description
    },
    // Open Graph
    {
      property: 'og:title',
      content: props.title
    },
    {
      property: 'og:description',
      content: props.description
    },
    {
      property: 'og:image',
      content: props.image || `${baseUrl}/og-image.jpg`
    },
    {
      property: 'og:url',
      content: canonicalUrl.value
    },
    {
      property: 'og:type',
      content: 'website'
    },
    // Twitter Card
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: props.title
    },
    {
      name: 'twitter:description',
      content: props.description
    },
    {
      name: 'twitter:image',
      content: props.image || `${baseUrl}/og-image.jpg`
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: canonicalUrl.value
    }
  ]
});
</script>