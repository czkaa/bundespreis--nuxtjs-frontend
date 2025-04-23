<template>
  <footer class="bg-secondary-800 text-white py-8">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-lg font-semibold mb-4">Charlotte Rohde</h3>
          <p class="text-secondary-300">{{ $t('footer.copyright', { year: new Date().getFullYear() }) }}</p>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">{{ $t('navigation.home') }}</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/" class="text-secondary-300 hover:text-white transition duration-200">
                {{ $t('navigation.home') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/preistragende" class="text-secondary-300 hover:text-white transition duration-200">
                {{ $t('navigation.preistragende') }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Legal</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/imprint" class="text-secondary-300 hover:text-white transition duration-200">
                {{ $t('footer.imprint') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/privacy" class="text-secondary-300 hover:text-white transition duration-200">
                {{ $t('footer.privacy') }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>