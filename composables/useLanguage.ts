export const useLanguage = () => {
  const currentLang = useState('lang', () => 'de')
  
  const toggleLanguage = () => {
    currentLang.value = currentLang.value === 'de' ? 'en' : 'de'
  }
  
  return {
    currentLang,
    toggleLanguage
  }
}