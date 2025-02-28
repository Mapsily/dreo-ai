import { Search } from "lucide-react";

const SearchBar = ({ onSubmit, placeholder }) => {
  return (
    <form
      action={onSubmit}
      className="w-fit bg-gray-200 flex items-center gap-3 px-3 py-2 rounded-md"
    >
      <Search className="text-gray-600" size={18} />
      <input
        className="bg-transparent outline-none placeholder:text-sm"
        placeholder={placeholder}
      />
    </form>
  );
};

export default SearchBar;
