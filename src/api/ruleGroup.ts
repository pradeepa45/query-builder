import { RuleGroup } from "../types";
import { supabase } from "../utils/supabase";

export async function fetchRuleGroup(start: number, end: number) {
  let { data, error, count } = await supabase
    .from("ruleGroup")
    .select("*", {count: "exact",})
    .range(start, end)
    .order("created_at", { ascending: false });

  return { data, error, count };
}


export async function pushRuleGroup(group: RuleGroup) {
  const { data, error } = await supabase
    .from("ruleGroup")
    .insert({
      children: group.children,
      conjunction: group.conjunction,
      not: group.not,
    })
    .select();
  return { data, error };
}

export async function updateRuleGroup(group: RuleGroup, id: string) {
  const { data, error } = await supabase
    .from("ruleGroup")
    .update({
      children: group.children,
      conjunction: group.conjunction,
      not: group.not,
    })
    .eq("id", id)
    .select();
  return { data, error };
}

export async function deleteRuleGroup(id: string) {
  const { data, error } = await supabase
    .from("ruleGroup")
    .delete()
    .eq("id", id)
    .select();
  return { data, error };
}