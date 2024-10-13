import React from "react";
import { TbPlus } from "react-icons/tb";
import { clsx } from "clsx";

import { Rule, RuleGroup } from "../../../types";
import Button from "../../common/Button";
import { pushRuleGroup, updateRuleGroup } from "../../../api/ruleGroup";
import RuleComponent from "./FilterComponent";

interface Props {
  ruleGroup: RuleGroup;
  error?: {
    status?: boolean;
    message?: string;
  };
  setGroup: any;
  setError?: any;
  setScreen: React.Dispatch<React.SetStateAction<number>>;
  handleClose: () => void;
}

export default function BuildQuery({
  ruleGroup,
  error,
  setError,
  setGroup,
  setScreen,
  handleClose,
}: Props) {
  const [rule, setRule] = React.useState<Rule>({
    field: "" as Rule["field"],
    condition: "" as Rule["condition"],
    value: "",
    conjunction: "and",
  });

  const handleSelect = (name: string, value: string, index: number) => {
    const updatedRules = [...ruleGroup.children];
    updatedRules[index] = { ...updatedRules[index], [name]: value };
    setGroup({ ...ruleGroup, children: updatedRules });
  };

  const handleConjunctionChange = async (
    alignment: "and" | "or",
    index: number
  ) => {
    const updatedRules = [...ruleGroup.children];
    updatedRules[index] = { ...updatedRules[index], conjunction: alignment };
    setGroup({ ...ruleGroup, children: updatedRules });
    if (ruleGroup.id) {
      const { data, error } = await updateRuleGroup(
        {
          children: updatedRules,
          conjunction: alignment,
          id: ruleGroup.id,
          not: ruleGroup.not,
        },
        ruleGroup.id
      );
      if (data) setGroup(data[0]);
      if (error) setError(error);
    }
  };

  const handleNewOption = () => {
    setGroup({
      ...ruleGroup,
      children: [...ruleGroup.children, { ...rule, conjunction: "and" }],
    });
    setRule({
      field: "" as Rule["field"],
      condition: "" as Rule["condition"],
      value: "",
      conjunction: "and",
    });
  };

  const handleDelete = (index: number) => {
    const updatedRules = ruleGroup.children.filter((_, i) => i !== index);
    setGroup({ ...ruleGroup, children: updatedRules });
  };

  const handleNextScreen = async () => {
    const allFilled = ruleGroup.children.every(
      (rule) => rule.field && rule.condition && rule.value
    );

    if (allFilled) {
      try {
        await pushRuleGroup(ruleGroup);
        handleClose();
      } catch (error) {
        console.error("Failed to push rule group", error);
        setError?.({
          status: true,
          message: "Failed to save rule group. Please try again.",
        });
      }
    } else {
      setError?.({
        status: true,
        message: "Please select all the fields of each rule",
      });
    }
  };

  return (
    <div className="py-10 px-6">
      <div
        className={clsx(
          "bg-slate p-4 text-white flex flex-col gap-4 max-h-96",
          ruleGroup?.children?.length > 2 && "lg:overflow-y-scroll",
          ruleGroup?.children?.length > 1 && "overflow-y-scroll"
        )}
      >
        {ruleGroup?.children?.map((rule, id) => (
          <RuleComponent
            key={id}
            rule={rule}
            index={id}
            handleSelect={handleSelect}
            handleDelete={handleDelete}
            handleConjunctionChange={handleConjunctionChange}
          />
        ))}
        <Button
          variant="primary"
          className="w-[130px] my-4 py-3 whitespace-nowrap text-sm rounded"
          startIcon={<TbPlus size={14} />}
          onClick={handleNewOption}
        >
          Add new filter
        </Button>
      </div>

      {error?.status && (
        <div className="p-4 text-white rounded-lg absolute bottom-16 left-0">
          <span className="text-white opacity-50 italic">*{error.message}</span>
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
        outline
        onClick={handleNextScreen}
        className="absolute bottom-6 right-6 text-purple hover:text-white"
      >
        Finish
      </Button>
    </div>
  );
}
