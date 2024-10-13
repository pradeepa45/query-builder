import React from "react";
import { FaFilter } from "react-icons/fa";

import Button from "../Button";
import Modal from "../../Modal";

export default function Sidebar() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <aside className="basis-80 flex flex-col gap-2 py-20">
      <div className="flex gap-2 items-center">
        <span>
          <FaFilter size={18} color="white" />
        </span>
        <p className="whitespace-nowrap">Build your query</p>
      </div>
      <p className="text-white opacity-40">
        Narrow your search further by adding some filters.
      </p>
      <Button
        size="lg"
        variant="primary"
        className="w-fit rounded"
        onClick={handleOpen}
      >
        Build query
      </Button>
      <Modal open={open} handleClose={handleClose} />
    </aside>
  );
}
