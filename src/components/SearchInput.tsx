import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
const DEBOUNCE_MS = 300;

export function SearchInput({
  value,
  onChange,
  placeholder = "Buscar...",
}: SearchInputProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="search-input"
    />
  );
}

export function useSearchFilter() {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch] = useDebounceValue(searchInput, DEBOUNCE_MS);
  return { searchInput, setSearchInput, debouncedSearch };
}
