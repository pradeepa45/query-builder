import React, { useState } from "react";

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
    field: "" as Rule["field"],
    condition: "" as Rule["condition"],
    value: "",
    conjunction: "and",
  });

  const handleSelect = (name: string, option: string) => {
    setRule((prev) => ({
      ...prev,
      [name]: option,
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
        const { data: updatedGroupData } = await updateRuleGroup(
          updatedGroup,
          ruleGroup.id as string
        );
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
        <div className="lg:grid lg:grid-cols-3 p-4 lg:gap-4 text-white justify-between grow flex flex-col gap-2">
          {fields.map((item) => (
            <Select
              key={item.name}
              label={`Select ${item.name}`}
              name={item.name}
              options={item.options}
              value={rule[item.name as keyof Rule]}
              onChange={(name, selectedOption) =>
                handleSelect(name, selectedOption)
              }
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
