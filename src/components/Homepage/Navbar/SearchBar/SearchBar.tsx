/* 
1. Captures User's Search Query 
2. Remember past searches for convenience 
3. Suggest Possible matches in real time as the user types 
4. persist the recent search between browser sessions using browser local storage 
*/

"use client";

import React, { useMemo, useState } from "react";
import { suggestions } from "@/lib/search/mocksuggestions";
import SearchResult from "./SearchResult"; // Suggestion Dropdown UI
import { Button } from "@/components/ui/button";

// Key for read/write in the localStorage

const RECENT_KEY = "recent-searches";

const SearchBar = () => {
  // What the user is typing capture it
  const [query, setQuery] = useState("");
  //Recent search reactive state - initial ( lazy func. ) ensure the expensive operation of reading from LocalStorage only happens when the component is first mounted not on every render
  const [recents, setRecents] = useState<string[]>(() => {
    if (typeof window === "undefined") return []; // on SSR - window doesnt exist so it just returns an empty array to prevent code from throwing an array error on server.

    try {
      //Read array from the localStorage or start empty
      return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]"); // parse the string from localStorage to js array, if localStorage empty it just return an empty array
    } catch {
      return []; // if someone did manual changes in localStorage , catch block will throw the empty string instead of throwing full error and stopping code

      console.log("Error Occured while fetching recents from the localStorage");
    }
  });

  // Static suggestions with the use of the useMemo so we dont compute with every keystroke
  const staticSuggestions = useMemo(() => {
    if (!query) return []; // nothing types so no result
    // case sensitive filtering for suggestion
    return suggestions.filter((s) =>
      s.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  //   Add search to the recents and setItem in the localStorage as well

  const addRecent = (term: string) => {
    //Safeguard  for SSR
    if (typeof window === "undefined") return [];

    //Keep the new recent first ( recent 4 )
    const next = [term, ...recents.filter((r) => r !== term)].slice(0, 3); // Remove duplicates
    setRecents(next);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  };



  return (
    <div className="px-[8px] bg-white py-3 relative border-b-[0.5px] border-[#aeadad] mb-2">

      {/* INPUT BOX  */}
   
      <input
        type="text"
        placeholder="Type Something :/"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full    py-2  focus:outline-none "
        onKeyDown={(e)=> { 
            if (e.key === "Enter" && query.trim()){ 
                addRecent(query.trim()); 
                setQuery("")// clears input 
            }
        }}
      />

      

      {/* Recent pills */}
      {!query && recents.length > 0 && (
        <div>
          {recents.map((r) => (
            <Button
              variant={"outline"}
              key={r}
              onClick={() => {
                setQuery(r); //put text into input
                addRecent(r); //bump recent list
              }}
              className="rounded-full border-[0.5px] mr-2 mt-4 px-3 border-[#aeadad]"
            >
              {r}
            </Button>
          ))}
        </div>
      )}

      {/* Suggestion dropdown  */}
      {query && (
        <SearchResult
          items={staticSuggestions}
          onSelect={(term) => {
            addRecent(term);
            setQuery(term);
          }}
        />
      )}
    </div>
  );
};

export default SearchBar;
