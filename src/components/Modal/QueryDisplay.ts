import camelCase from "lodash/camelCase";
import { Rule, RuleGroup } from "../../types";

const conditionToOperator = {
  Equals: "==",
  "Does not equal": "!=",
  Like: "LIKE",
  "Not like": "NOT LIKE",
  "Is Empty": "IS EMPTY",
  Is: "IS",
  "Is not": "IS NOT",
};

export default function queryDisplay(ruleGroup: any) {
  const processRule = (rule: Rule): string => {
    const operator =
      conditionToOperator[rule.condition as keyof typeof conditionToOperator] ||
      rule.condition;

    if (operator === "IS EMPTY") {
      return `“(field.${camelCase(rule.field)}) ${operator}”`;
    }

    // Format rule as: “(field) operator "value"”
    return `“(field.${camelCase(rule.field)}) ${operator} \\"${rule.value}\\"”`;
  };

  const processGroup = (group: any): string => {
    const conjunction = group.conjunction === "AND" ? "&&" : "||";
    const groupQuery = group
      .map((child: any) =>
        child.type === "rule_group"
          ? processGroup(child as RuleGroup)
          : processRule(child as Rule)
      )
      .join(` ${conjunction} `);

    return group.not ? `!(${groupQuery})` : `(${groupQuery})`;
  };

  return processGroup(ruleGroup);
}
