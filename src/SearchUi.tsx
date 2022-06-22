import React from "react";
import { useEffect } from "react";
import axios from "axios";
import SearchResult from "./SearchResult";
import { useState } from "react";

const SEARCH_TYPES = {
  HEADLINE_SEARCH: "headline",
  HEADLINE_LEDE_SEARCH: "headlineLede",
};

const SearchUi = () => {
  const [searchTerms, setSearchTerms] = useState<Array<string>>([]);
  const [searchResults, setSearchResults] = useState<Array<any>>([]);
  const [searchBoxAndOrs, setSearchBoxAndOrs] = useState<Array<string>>([]);
  const [searchBoxSearchTypes, setSearchBoxSearchTypes] = useState<
    Array<string>
  >([SEARCH_TYPES.HEADLINE_SEARCH]);
  const [numberOfSearchBox, setNumberOfSearchBox] = useState(1);
  const [canPerformSearch, setCanPerformSearch] = useState(false);

  useEffect(() => {
    if (canPerformSearch) {
      axios
        .get(
          `https://bfa27fa749d341c8ad8cc092d323a3c5.us-central1.gcp.cloud.es.io:9243/pdf_metadata_v1/_search?q=${searchTerms[0]}`,
          {
            auth: {
              username: "sumit",
              password: "Time2022!",
            },
          }
        )
        .then((results) => {
          const { hits } = results.data.hits;
          setSearchResults(hits);
          setCanPerformSearch(false);
          // const tempZips = records.map((record: any) => {
          //   return { id: record.id, city: record.city, state: record.state };
          // });
          // setZips(tempZips);
        });
    }
  }, [canPerformSearch, searchTerms]);
  console.log(searchBoxSearchTypes);
  return (
    <div className="container">
      <div className="mt-2 searchbox-border">
        {[...Array(numberOfSearchBox).keys()].map((index: number) => {
          return (
            <div key={index}>
              <div className="selected-and-or">
                {searchBoxAndOrs[index - 1]}
              </div>
              <div className="row m-2">
                <div className="select-search-types col-3">
                  <select
                    key={index}
                    value={searchBoxSearchTypes[index] ?? ""}
                    onChange={(e) => {
                      let searchBoxSearchTypesCopy = [...searchBoxSearchTypes];
                      if (searchBoxSearchTypesCopy[index] !== undefined) {
                        searchBoxSearchTypesCopy[index] = e.target.value;
                      } else {
                        searchBoxSearchTypesCopy = [
                          ...searchBoxSearchTypesCopy,
                          e.target.value,
                        ];
                      }
                      setSearchBoxSearchTypes(searchBoxSearchTypesCopy);
                    }}
                    className="form-select"
                  >
                    <option
                      className="cursor-pointer"
                      value={SEARCH_TYPES.HEADLINE_SEARCH}
                    >
                      Headline search
                    </option>
                    <option value={SEARCH_TYPES.HEADLINE_LEDE_SEARCH}>
                      Headline and Lede search
                    </option>
                  </select>
                </div>

                <div className="col-7  rounded">
                  <input
                    key={index}
                    type="search"
                    className=" form-control rounded"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="search-addon"
                    value={searchTerms[index] ?? ""}
                    onChange={(e) => {
                      let searcTermsCopy = [...searchTerms];
                      if (searcTermsCopy[index] !== undefined) {
                        searcTermsCopy[index] = e.target.value;
                      } else {
                        searcTermsCopy = [...searcTermsCopy, e.target.value];
                      }
                      setSearchTerms(searcTermsCopy);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") setCanPerformSearch(true);
                    }}
                  />
                </div>

                <div className="col-2">
                  <button
                    type="button"
                    className="remove-button btn btn-outline-secondary"
                    onClick={() => {
                      if (numberOfSearchBox > 1) {
                        setNumberOfSearchBox(numberOfSearchBox - 1);
                        setSearchBoxAndOrs((oldArray) => [
                          ...oldArray.slice(0, oldArray.length - 1),
                        ]);
                        setSearchTerms((oldArray) => [
                          ...oldArray.slice(0, oldArray.length - 1),
                        ]);
                      }
                    }}
                    disabled={numberOfSearchBox === 1}
                  >
                    -
                  </button>
                  <button
                    type="button"
                    className="and-button btn btn-outline-secondary "
                    onClick={() => {
                      setNumberOfSearchBox(numberOfSearchBox + 1);
                      setSearchBoxAndOrs((oldArray) => [...oldArray, "AND"]);
                      setSearchBoxSearchTypes((oldArray) => [
                        ...oldArray,
                        SEARCH_TYPES.HEADLINE_SEARCH,
                      ]);
                    }}
                  >
                    AND
                  </button>
                  <button
                    type="button"
                    className="or-button btn btn-outline-secondary "
                    onClick={() => {
                      setNumberOfSearchBox(numberOfSearchBox + 1);
                      setSearchBoxAndOrs((searchBoxAndOrs) => [
                        ...searchBoxAndOrs,
                        "OR",
                      ]);
                      setSearchBoxSearchTypes((oldArray) => [
                        ...oldArray,
                        SEARCH_TYPES.HEADLINE_SEARCH,
                      ]);
                    }}
                  >
                    OR
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {searchResults.length > 0 &&
        searchResults.map((result) => {
          return <SearchResult result={result._source} key={result._id} />;
        })}
    </div>
  );
};

export default SearchUi;
