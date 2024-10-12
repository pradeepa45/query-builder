import React from "react";
import Button from "../common/Button";
import Select from "../form/Select";
import fields from "../../constants/fields";

interface Props {
  handleCloseModal: () => void;
  ruleGroup: any[];
  error?: {
    status?: boolean;
    message?: string;
  };
  setGroup: any;
  setError?: any;
  setScreen: any;
}

export default function AddNewQuery({
  handleCloseModal,
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

  const handleSelect = (name: string, value: string) => {
    setRule({
      ...rule,
      [name]: value,
    });
  };

  const handleNextScreen = () => {
    if (field && condition && value) {
      setGroup([...ruleGroup, rule]);
      setScreen(1);
    } else {
      setError({
        status: true,
        message: "Please select all the fields of the current rule",
      });
    }
  };

  return (
    <div className="py-10 px-6">
      <div className="bg-slate grid grid-cols-3 p-4 gap-4 text-white justify-between">
        {fields.map((item) => (
          <Select
            label={`Select ${item.name}`}
            name={item.name}
            options={item.options}
            onChange={handleSelect}
            key={item.name}
            value={rule[item.name as keyof typeof rule]}
          />
        ))}
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
        onClick={handleCloseModal}
        className="absolute bottom-6 left-6"
      >
        Cancel
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
