import React from "react";
import { MdClose } from "react-icons/md";

import { ModalContent, Modal as BaseModal } from "./styles";
import AddNewQuery from "./AddNewQuery";
import BuildQuery from "./QueryBuilder";
import queryDisplay from "./QueryDisplay";

interface ModalProps {
  open: boolean;
  handleClose: () => void;
}

interface Rule {
  field: string;
  value: string;
  condition: string;
}

export default function Modal({ open, handleClose }: ModalProps) {
  const [ruleGroup, setGroup] = React.useState<Rule[]>([]);
  const [currentScreen, setCurrent] = React.useState(0);
  const [error, setError] = React.useState({
    status: false,
    message: "",
  });

  const screens = [
    {
      title: "Create tag and query",
      description: "The query you build will be saved in your active view",
    },
    {
      title: "Build your query",
      description: (
        <p className="px-2 text-white bg-purple-hover max-w-screen-sm text-ellipsis">
          Query: {queryDisplay(ruleGroup)}
        </p>
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
            ruleGroup={ruleGroup}
            error={error}
            setGroup={setGroup}
            setError={setError}
            setScreen={setCurrent}
          />
        );
      case 1:
        return (
          <BuildQuery
            ruleGroup={ruleGroup}
            error={error}
            setGroup={setGroup}
            setError={setError}
            setScreen={setCurrent}
          />
        );
    }
  };

  React.useEffect(() => {}, [currentScreen]);

  return (
    <BaseModal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={open}
      onClose={handleClose}
    >
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
          <h2
            id="unstyled-modal-title"
            className="m-0 leading-6 text-white text-lg mb-2"
          >
            {screens[currentScreen].title}
          </h2>
          <p id="unstyled-modal-description" className="m-0 text-purple-light">
            {screens[currentScreen].description}
          </p>
        </div>
        {renderScreens()}
      </ModalContent>
    </BaseModal>
  );
}
