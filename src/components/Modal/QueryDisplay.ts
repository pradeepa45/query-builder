import camelCase from "lodash/camelCase";

import { Rule, RuleGroup } from "../../types";

const conditionToOperator: Record<string, string> = {
  Equals: "==",
  "Does not equal": "!=",
  Like: "LIKE",
  "Not like": "NOT LIKE",
  "Is Empty": "IS EMPTY",
  Is: "IS",
  "Is not": "IS NOT",
};

export default function queryDisplay(ruleGroup: RuleGroup | undefined): string {
  if (!ruleGroup) return "";

  const processRule = (rule: Rule): string => {
    const operator =
      conditionToOperator[rule.condition as keyof typeof conditionToOperator] ||
      rule.condition;
    if (operator === "IS EMPTY") {
      return `“(field.${camelCase(rule.field)}) ${operator}”`;
    }
    return `“(field.${camelCase(rule.field)}) ${operator} \\"${rule.value}\\"”`;
  };

  const processGroup = (group: RuleGroup): string => {
    if (!group || !group.children) return "";
    const groupQueries = group.children.map((child, index) => {
      if (child) return processRule(child);
      else return "";
    });
    const conjunction = group.conjunction === "and" ? " && " : " || ";
    return `{ ${groupQueries.join(conjunction)} }`;
  };

  return processGroup(ruleGroup);
}
