import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { SearchBox } from "../components/SearchBox";
import { matchesQuery } from "../components/matchesQuery";
import { RequestList } from "./RequestList";
import { requestDetail } from "./requestDetail";

export function RequestsPage() {
  const { data, setDetail } = useOutletContext();
  const [query, setQuery] = useState("");
  const matches = (r) => matchesQuery(r, query);
  return (
    <>
      <SearchBox query={query} setQuery={setQuery} />
      <RequestList
        list={data.requests.filter(matches)}
        open={(r) => setDetail(requestDetail(r, data.units))}
      />
    </>
  );
}
