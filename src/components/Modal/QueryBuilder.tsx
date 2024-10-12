import React from "react";
import Button from "../common/Button";
import Select from "../form/Select";
import fields from "../../constants/fields";
import { TbPlus } from "react-icons/tb";
import { MdDelete } from "react-icons/md"; // Import delete icon

interface Props {
  ruleGroup: any[];
  error?: {
    status?: boolean;
    message?: string;
  };
  setGroup: React.Dispatch<React.SetStateAction<any[]>>;
  setError?: any;
  setScreen: React.Dispatch<React.SetStateAction<number>>;
}

export default function BuildQuery({
  ruleGroup,
  error,
  setError,
  setGroup,
  setScreen,
}: Props) {
  const [rule, setRule] = React.useState({
    field: "",
    condition: "",
    value: "",
  });
  const { field, condition, value } = rule;

  const handleSelect = (name: string, value: string, index: number) => {
    console.log(name, value);
    const updatedRules = [...ruleGroup];
    updatedRules[index] = { ...updatedRules[index], [name]: value }; // Update the specific rule
    setGroup(updatedRules); // Set the updated rules to the state
  };

  console.log(ruleGroup);

  const handleNextScreen = () => {
    if (field && condition && value) {
      setGroup([...ruleGroup, { ...rule, id: ruleGroup.length + 1 }]);
      setScreen(1);
    } else {
      setError({
        status: true,
        message: "Please select all the fields of the current rule",
      });
    }
  };

  const handleNewOption = () => {
    setGroup([...ruleGroup, { ...rule, id: ruleGroup.length + 1 }]);
    setRule({ field: "", condition: "", value: "" }); // Reset rule input
  };

  const handleDelete = (index: number) => {
    const updatedRules = ruleGroup.filter((_, i) => i !== index); // Remove the selected rule
    setGroup(updatedRules); // Set the updated rules to the state
  };

  return (
    <div className="py-10 px-6">
      <div className="bg-slate p-4 text-white flex flex-col gap-4">
        {ruleGroup.map((rule, id) => (
          <div className="flex gap-4 items-center justify-center" key={id}>
            <div className="grid grid-cols-3 gap-4 grow">
              <Select
                label="Select field"
                name="field"
                options={fields[0].options}
                onChange={(name, value) => handleSelect(name, value, id)}
                value={rule.field}
              />
              <Select
                label="Select condition"
                name="condition"
                options={fields[1].options}
                onChange={(name, value) => handleSelect(name, value, id)}
                value={rule.condition}
              />
              <Select
                label="Select value"
                name="value"
                options={fields[2].options}
                onChange={(name, value) => handleSelect(name, value, id)}
                value={rule.value}
              />
            </div>
            <button
              className="hover:color-purple"
              onClick={() => handleDelete(id)}
            >
              <MdDelete size={24} />
            </button>
          </div>
        ))}
        <Button
          variant="primary"
          className="w-[130px] my-4 whitespace-nowrap text-sm rounded"
          startIcon={<TbPlus size={14} />}
          onClick={handleNewOption}
        >
          Add new filter
        </Button>
      </div>
      {error?.status && (
        <div className="p-4 text-white rounded-lg absolute bottom-16 left-0">
          <span className="text-white opacity-50 italic">
            *{error?.message}
          </span>
        </div>
      )}
      <Button
        variant="grey"
        onClick={() => setScreen(0)}
        className="absolute bottom-6 left-6"
      >
        Back
      </Button>
      <Button
        variant="primary"
        onClick={handleNextScreen}
        className="absolute bottom-6 right-6"
      >
        Next
      </Button>
    </div>
  );
}
