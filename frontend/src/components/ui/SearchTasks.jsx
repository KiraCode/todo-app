import React, { useCallback, useEffect, useRef, useState } from "react";
import Search from "../../assets/search.svg";

const SearchTasks = ({
  placeholder,
  tasks,
  setFilteredTask,
  searchQuery,
  setSearchQuery,
}) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // 1. set a timeout to update the actual searchQuery state
    const handler = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 300);
    // 2. return a cleanup function
    clearInterval(handler);
  }, [inputValue, setSearchQuery]);

  useEffect(() => {
    // perform search logic and filter based on search query
    const filteredTask = tasks.filter((task) => {
      const case1 = task.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const case2 = task.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return case1 || case2;
    });
    setFilteredTask(filteredTask);
  }, [searchQuery, setFilteredTask, tasks]);

  return (
    <div className="search-box-container">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
      />
      <img src={Search} alt="Search icon" />
    </div>
  );
};

export default SearchTasks;

//   debounce search input change
//   const handleSearchInputChange = useCallback(
//     (event) => {
//       const query = event.target.value;

//       //   clear the previous time
//       clearTimeout(timerIdRef.current);

//       // set a new tieout and update the ref
//       timerIdRef.current = setTimeout(() => {
//         setSearchQuery(query);
//       }, 300);
//     },
//     [setSearchQuery]
//   );
