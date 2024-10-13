import React from 'react';

import { fetchRuleGroup, deleteRuleGroup } from '../api/ruleGroup';
import { RuleGroup } from '../types';
import { supabase } from '../utils/supabase';

export const useRuleGroups = (itemsPerPage: number) => {
  const [rules, setRules] = React.useState<RuleGroup[] | undefined>();
  const [error, setError] = React.useState<string | undefined>();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  const getRules = React.useCallback(async (page: number) => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage - 1;
    try {
      const { data, error: fetchError, count } = await fetchRuleGroup(start, end);
      if (count) setTotalPages(Math.ceil(count / itemsPerPage));
      setRules(data as unknown as RuleGroup[]);
      if (fetchError) {
        setError(fetchError.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch rule groups');
    }
  },[itemsPerPage]);

  React.useEffect(() => {
    getRules(currentPage);
  }, [currentPage, getRules]);

  const handleDelete = async (id?: string) => {
    if(!id) return
    const { error } = await deleteRuleGroup(id);
    if (!error) {
      setRules((prevRules) => prevRules?.filter((rule) => rule.id !== id));
    }
  };

  React.useEffect(() => {
    const subscription = supabase
      .channel('public:ruleGroup')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'ruleGroup' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setRules((prevData) => [...(prevData || []), payload.new as RuleGroup]);
        } else if (payload.eventType === 'UPDATE') {
          setRules((prevData) =>
            prevData?.map((item) =>
              item.id === payload.new.id ? (payload.new as RuleGroup) : item
            )
          );
        } else if (payload.eventType === 'DELETE') {
          setRules((prevData) => prevData?.filter((item) => item.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    rules,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
    handleDelete,
  };
};
