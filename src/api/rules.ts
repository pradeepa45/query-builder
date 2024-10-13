import { Rule } from '../types'
import {supabase} from '../utils/supabase'

export async function fetchRule() {
  const { data, error } = await supabase.from('rules').select()
  return {data, error}
}

export async function pushRule(rule: Rule) {
  const { data, error } = await supabase.from('rules').insert([
    {field: rule.field, condition: rule.condition, field_type: rule.type, value: rule.value}
  ]).select()
  return {data, error}
}