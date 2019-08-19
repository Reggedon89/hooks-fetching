import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

function SearchResults() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("react");

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      const result = await axios(
        "https://hn.algolia.com/api/v1/search?query=" + query
      );
      if (!ignore) setData(result.data);
    }

    fetchData();
    return () => {
      ignore = true;
    };
  }, [query]);

  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <ul>
        {data.hits.map(item => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<SearchResults />, rootElement);
