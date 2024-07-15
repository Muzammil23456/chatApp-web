import React from "react";

function Search() {
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search"
          className="focus-visible:outline-none w-full font-medium rounded-full p-3 text-sm text-muted-foreground dark:bg-gray-800   bg-[#F5F6FA] "
        />
      </div>
    </>
  );
}

export default Search;
