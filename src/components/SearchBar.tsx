import { HiDownload } from "react-icons/hi";
import Button from "./common/Button";
import Input from "./form/Input";

export default function SearchBar() {
  return (
    <div className="grid grid-cols-12 items-center gap-2 pb-4">
      <Input
        type="search"
        variant="outlined"
        name="search"
        className="col-span-4 border-grey border"
        placeholder="Search"
      />
      <Button
        variant="grey"
        size="lg"
        outline
        startIcon={<HiDownload size={20} color="white" />}
        className="justify-self-center w-full col-span-3"
      >
        Export feedback
      </Button>
      <Button variant="primary" size="lg" className="col-span-2">
        View feedback
      </Button>
      <Input
        type="search"
        variant="outlined"
        name="search"
        className="col-span-3 border-grey border"
        placeholder="date"
      />
    </div>
  );
}
