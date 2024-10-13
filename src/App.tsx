import React from "react";
import { IconButton } from "@mui/material";
import { HiOutlineArrowsExpand } from "react-icons/hi";
import { MdDelete } from "react-icons/md";

import Header from "./components/common/Header";
import SearchBar from "./components/SearchBar";
import list from "./constants/nav";
import RuleModal from "./components/RuleModal";
import Pagination from "./components/Pagination";
import { useRuleGroups } from "./hooks/useRuleGroups";
import queryDisplay from "./components/Modal/QueryDisplay";
import { RuleGroup } from "./types";
import Sidebar from "./components/Sidebar";

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
    <>
      <Header list={list} />
      <section className="lg:mx-20 flex justify-center gap-4 flex-col mx-4 lg:flex-row">
        <Sidebar />
        <main className="grow md:pt-10 pt-4">
          <SearchBar />
          {error ? (
            <p>{error}</p>
          ) : (
            <div className="flex flex-col gap-4">
              {rules?.map((rule) => (
                <div
                  key={rule.id}
                  className="bg-slate border px-4 py-1 border-outline flex gap-2 justify-between items-center"
                >
                  <p
                    className="md:line-clamp-1 line-clamp-2 text-ellipsis w-full leading-5 font-mono text-sm"
                    title={queryDisplay(rule)}
                  >
                    {queryDisplay(rule)}
                  </p>
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
          onDelete={() => {
            handleDelete(current!.id);
            setCurrent(null);
          }}
        />
      )}
    </>
  );
}

export default App;
