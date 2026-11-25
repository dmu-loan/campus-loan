export function SearchBox({ query, setQuery }) {
  return (
    <label>
      검색
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="이름, 학번, 물품 등"
      />
    </label>
  );
}
