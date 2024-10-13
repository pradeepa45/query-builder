import React, { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { FaCircleQuestion } from "react-icons/fa6";

import Button from "../common/Button";
import Select from "../form/Select";
import fields from "../../constants/fields";
import { pushRule } from "../../api/rules";
import { RuleGroup, Rule } from "../../types";
import { updateRuleGroup } from "../../api/ruleGroup";

interface Error {
  status?: boolean;
  message?: string;
}

interface Props {
  handleCloseModal: () => void;
  ruleGroup: RuleGroup;
  error?: Error;
  setGroup: (group: RuleGroup) => void;
  setError?: any;
  setScreen: (screen: number) => void;
}

const AddNewQuery: React.FC<Props> = ({
  handleCloseModal,
  ruleGroup,
  error,
  setError,
  setGroup,
  setScreen,
}) => {
  const [rule, setRule] = useState<Rule>({
    field: "" as Rule['field'],
    condition: "" as Rule['condition'],
    value: "",
    conjunction: "and",
  });

  const handleSelect = (name: string, option: string) => {
    setRule((prev) => ({
      ...prev,
      [name]: option,
    }));
  };

  const handleCheckbox = () => {
    setRule((prev) => ({
      ...prev,
      type: prev.type === "string" ? "number" : "string",
    }));
  };

  const handleNextScreen = async () => {
    if (!rule.field || !rule.condition || !rule.value) {
      setError?.({
        status: true,
        message: "Please select all the fields of the current rule",
      });
      return;
    }

    try {
      const newRule = { ...rule };
      const { data: newRuleData } = await pushRule(newRule);
      if (newRuleData) {
        const updatedGroup = {
          ...ruleGroup,
          children: [newRuleData[0] as Rule],
        };
        const { data: updatedGroupData } = await updateRuleGroup(updatedGroup, ruleGroup.id as string);
        if (updatedGroupData) {
          setGroup(updatedGroupData[0] as RuleGroup);
          setScreen(1);
        }
      }
    } catch (err) {
      setError?.({
        status: true,
        message: "Failed to add new rule. Please try again.",
      });
    }
  };

  return (
    <div>
      <div className="bg-slate my-10 px-6 flex items-center justify-center gap-2 mx-6">
        <div className="grid grid-cols-3 p-4 gap-4 text-white justify-between grow">
          {fields.map((item) => (
            <SelectField
              key={item.name}
              label={`Select ${item.name}`}
              name={item.name}
              options={item.options}
              value={rule[item.name as keyof Rule]}
              handleSelect={handleSelect}
            />
          ))}
        </div>
        
      </div>

      {error?.status && (
        <div className="p-4 text-white rounded-lg absolute bottom-16 left-0">
          <span className="text-white opacity-50 italic">*{error.message}</span>
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
};

export default AddNewQuery;

// Extracted Select Field Component
interface SelectFieldProps {
  label: string;
  name: string;
  options: string[];
  value?: string;
  handleSelect: (name: string, option: string) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, name, options, value, handleSelect }) => {
  return (
    <Select
      label={label}
      name={name}
      options={options}
      value={value}
      onChange={(name,selectedOption) => handleSelect(name, selectedOption)}
    />
  );
};
