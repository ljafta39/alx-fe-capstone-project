import { Search } from "lucide-react";

/**
 * A search bar component that allows users to search for cities.
 * It displays a form with an input and a submit button.
 * When the form is submitted, it calls the `onSearch` function with the input's value.
 * It also displays the list of recent searches.
 * @param {function} onSearch - The function to call when the form is submitted
 * @param {string} placeholder - The placeholder text for the input
 * @param {string[]} recentSearches - The list of recent searches
 * @returns {ReactElement} The search bar component
 */
export const SearchBar = ({ onSearch, placeholder, recentSearches }) => {
  return (
    <div className="mb-8 space-y-4">
      <form onSubmit={(e) => {
        e.preventDefault();
        const city = e.target.city.value.trim();
        if (city) onSearch(city);
      }} className="w-full">
        <div className="relative">
          <input
            name="city"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder={placeholder}
            list="recent-searches"
          />
          <button
            type="submit"
            className="absolute right-2 top-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <Search size={20} />
          </button>
        </div>
      </form>

      {recentSearches.length > 0 && (
        
        <div className="flex gap-2 flex-wrap">
        <p className="text-gray-500 dark:text-white text-md">Recent searches:</p>
          {recentSearches.map((city) => (
            <button
              key={city}
              onClick={() => onSearch(city)}
              className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-white"
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
