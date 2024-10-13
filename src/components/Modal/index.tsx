import React from "react";
import { MdClose } from "react-icons/md";

import { RuleGroup } from "../../types";
import { pushRuleGroup } from "../../api/ruleGroup";
import queryDisplay from "./QueryDisplay";
import AddNewQuery from "./AddNewQuery";
import BuildQuery from "./QueryBuilder";
import { ModalContent, Modal as BaseModal } from "./styles";

interface ModalProps {
  open: boolean;
  handleClose: () => void;
}

export default function Modal({ open, handleClose }: ModalProps) {
  const [ruleGroup, setGroup] = React.useState<RuleGroup>();
  const [currentScreen, setCurrent] = React.useState(0);
  const [query, setQuery] = React.useState<string>();
  const [error, setError] = React.useState({
    status: false,
    message: "",
  });

  React.useEffect(() => {
    if (open) {
      const fetchNewRuleGroup = async () => {
        try {
          const { data } = await pushRuleGroup({
            children: [],
            conjunction: "and",
            not: false,
          });
          if (data) {
            const newGroup = data[0] as unknown as RuleGroup;
            setGroup(newGroup);
          }
        } catch (err) {
          console.error("Failed to create rule group", err);
          setError({ status: true, message: "Failed to create rule group" });
        }
      };

      fetchNewRuleGroup();
    }
  }, [open]);

  React.useEffect(() => {
    setQuery(queryDisplay(ruleGroup));
  }, [ruleGroup]);

  const screens = [
    {
      title: "Create tag and query",
      description: "The query you build will be saved in your active view",
    },
    {
      title: "Build your query",
      description: (
        <span
          className="px-2 text-white bg-purple-hover max-w-screen-md line-clamp-1 text-ellipsis rounded-sm"
          title={query}
        >
          Query: {query}
        </span>
      ),
    },
  ];

  const renderScreens = () => {
    switch (currentScreen) {
      case 0:
      default:
        return (
          <AddNewQuery
            handleCloseModal={handleClose}
            ruleGroup={ruleGroup as RuleGroup}
            error={error}
            setGroup={setGroup}
            setError={setError}
            setScreen={setCurrent}
          />
        );
      case 1:
        return (
          <BuildQuery
            ruleGroup={ruleGroup as RuleGroup}
            error={error}
            setGroup={setGroup}
            setError={setError}
            setScreen={setCurrent}
            handleClose={handleClose}
          />
        );
    }
  };

  return (
    <BaseModal open={open} onClose={handleClose}>
      <ModalContent
        sx={{ width: 960, height: 700 }}
        className="bg-black border border-grey relative rounded"
      >
        <button
          onClick={handleClose}
          className="w-fit absolute top-6 right-4 p-1 bg-purple-hover rounded-sm"
        >
          <MdClose size={16} color="white" />
        </button>
        <div className="mb-2 py-6 px-4 bg-purple">
          <h2 className="m-0 leading-6 text-white md:text-lg mb-2 text-base">
            {screens[currentScreen].title}
          </h2>
          <p className="m-0 text-purple-light md:text-base text-sm">
            {screens[currentScreen].description}
          </p>
        </div>
        {renderScreens()}
      </ModalContent>
    </BaseModal>
  );
}
