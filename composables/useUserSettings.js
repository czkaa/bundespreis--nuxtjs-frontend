export const useUserSettings = () => {
  const disableAnimations = useState('disableAnimations', () => false);

  const setDisableAnimations = (value) => {
    disableAnimations.value = value;
    // Optionally persist to localStorage
    if (process.client) {
      localStorage.setItem('disableAnimations', value);
    }
  };

  // Load from localStorage on client
  if (process.client && disableAnimations.value === false) {
    const stored = localStorage.getItem('disableAnimations');
    if (stored !== null) {
      disableAnimations.value = stored === 'true';
    }
  }

  return {
    disableAnimations,
    setDisableAnimations,
  };
};
