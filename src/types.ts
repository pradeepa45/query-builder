export interface Rule {
  id?: string;
  field?:
    | "Theme"
    | "Sub-theme"
    | "Reason"
    | "Language"
    | "Source"
    | "Rating"
    | "Time Period"
    | "Customer ID";
  condition?:
    | "Equals"
    | "Does not equal"
    | "Like"
    | "Not like"
    | "Is Empty"
    | "Is"
    | "Is not";
  value?: string;
  conjunction: "and" | "or";
  type?: "string" | "number";
}

export interface RuleGroup {
  id?: string;
  children: Rule[];
  conjunction?: "and" | "or";
  not: boolean;
}