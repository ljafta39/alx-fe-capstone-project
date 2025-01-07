const SearchBar = ({ onSearch }) => {
    const [city, setCity] = React.useState('');
  
    const handleSearch = () => {
      if (city.trim()) onSearch(city);
    };
  
    return (
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Enter city name"
          className="p-2 border rounded "
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="p-2 bg-blue-500 text-white rounded" onClick={handleSearch}>
          Search
        </button>
      </div>
    );
  };
  
  export default SearchBar;
  