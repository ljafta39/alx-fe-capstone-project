const ThemeToggle = () => {
    const [darkMode, setDarkMode] = React.useState(false);
  
    React.useEffect(() => {
      document.documentElement.classList.toggle('dark', darkMode);
    }, [darkMode]);
  
    return (
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    );
  };
  
  export default ThemeToggle;
  