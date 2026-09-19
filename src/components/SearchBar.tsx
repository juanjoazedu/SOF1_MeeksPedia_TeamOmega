interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search character..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};