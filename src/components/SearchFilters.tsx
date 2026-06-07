interface Props {
  search: string;
  setSearch: (value: string) => void;
}

export default function SearchFilters({
  search,
  setSearch,
}: Props) {
  return (
    <input
      placeholder="Search links..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      className="border p-2 rounded"
    />
  );
}