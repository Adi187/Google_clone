import React, { createContext, useContext, useState } from "react";

const ResultContext = createContext();

const baseUrl = "https://google-search3.p.rapidapi.com/api/v1";

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("hello");

  const getResults = async (type) => {
    setIsLoading(true);

    const response = await fetch(`${baseUrl}${type}`, {
      method: "GET",
      headers: {
        "X-User-Agent": "desktop",
        "X-Proxy-Location": "IN",
        "X-RapidAPI-Host": "google-search3.p.rapidapi.com",
        "X-RapidAPI-Key": '1b2e761d7emshe188ecda31a897cp191356jsn3a5f65352bc3',
      },
    });
    const data = await response.json();

    if (type.includes("/image")) {
      setResults(data.image_results);
    } else if (type.includes("/news")) {
      setResults(data.entries);
    } else {
      setResults(data.results);
    }

    setIsLoading(false);
  };
  return (
    <ResultContext.Provider
      value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);