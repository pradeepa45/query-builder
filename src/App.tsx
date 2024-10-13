import React from "react";

import Header from "./components/common/Header";
import Sidebar from "./components/common/Sidebar";
import SearchBar from "./components/SearchBar";
import list from "./constants/nav";
import RuleModal from "./components/RuleModal";
import Pagination from "./components/Pagination";
import { useRuleGroups } from "./hooks/useRuleGroups";
import queryDisplay from "./components/Modal/QueryDisplay";
import { RuleGroup } from "./types";
import { IconButton } from "@mui/material";
import { HiOutlineArrowsExpand } from "react-icons/hi";
import { MdDelete } from "react-icons/md";

function App() {
  const {
    rules,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
    handleDelete,
  } = useRuleGroups(10);
  const [current, setCurrent] = React.useState<RuleGroup | null>();
  const [mode, setMode] = React.useState<"view" | "delete">("view");

  const handleClick = (mode: "view" | "delete", rule: RuleGroup) => {
    setMode(mode);
    setCurrent(rule);
  };

  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const handlePreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="App">
      <Header list={list} />
      <section className="mx-20 flex justify-center gap-4">
        <Sidebar />
        <main className="grow pt-10">
          <SearchBar />
          {error ? (
            <p>{error}</p>
          ) : (
            <div className="flex flex-col gap-4">
              {rules?.map((rule) => (
              <div
                key={rule.id}
                className="bg-white bg-opacity-5 border px-4 py-2 border-outline font-mono text-sm flex gap-2 justify-between items-center"
              >
                <div>{queryDisplay(rule)}</div>
                <div className="flex justify-between items-center">
                  <IconButton onClick={() => handleClick("view", rule)}>
                    <HiOutlineArrowsExpand color="white" />
                  </IconButton>
                  <IconButton onClick={() => handleClick("delete", rule)}>
                    <MdDelete color="red" />
                  </IconButton>
                </div>
              </div>
            ))}
            </div>
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onNext={handleNextPage}
            onPrevious={handlePreviousPage}
          />
        </main>
      </section>
      {current && (
        <RuleModal
          mode={mode}
          current={current}
          onClose={() => setCurrent(null)}
          onDelete={() => {handleDelete(current!.id);setCurrent(null)}}
        />
      )}
    </div>
  );
}

export default App;
