import { MdDelete } from "react-icons/md";

import fields from "../../../constants/fields";
import { Rule } from "../../../types";
import ToggleButtons from "../../form/Switcher";
import Select from "../../form/Select";

interface Props {
  rule: Rule;
  index: number;
  handleSelect: (name: string, value: string, index: number) => void;
  handleDelete: (index: number) => void;
  handleConjunctionChange: (alignment: "and" | "or", index: number) => void;
}

export default function RuleComponent({
  rule,
  index,
  handleSelect,
  handleDelete,
  handleConjunctionChange,
}: Props) {
  return (
    <div>
      {index > 0 && (
        <ToggleButtons
          alignment={rule.conjunction as Rule["conjunction"]}
          onToggle={(alignment) =>
            handleConjunctionChange(alignment, index - 1)
          }
        />
      )}
      <div className="flex gap-4 lg:items-center justify-center lg:flex-row flex-col">
        <div className="lg:grid lg:grid-cols-3 gap-4 flex flex-col grow">
          <Select
            label="Select field"
            name="field"
            options={fields[0].options}
            onChange={(name, value) => handleSelect(name, value, index)}
            value={rule.field}
          />
          <Select
            label="Select condition"
            name="condition"
            options={fields[1].options}
            onChange={(name, value) => handleSelect(name, value, index)}
            value={rule.condition}
          />
          <Select
            label="Select value"
            name="value"
            options={fields[2].options}
            onChange={(name, value) => handleSelect(name, value, index)}
            value={rule.value}
          />
        </div>
        <button className="" onClick={() => handleDelete(index)}>
          <MdDelete size={24} />
        </button>
      </div>
    </div>
  );
}
