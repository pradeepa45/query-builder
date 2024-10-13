import * as React from "react";
import { Tabs } from "@mui/base/Tabs";
import { TabsList } from "@mui/base/TabsList";
import { TabPanel } from "@mui/base/TabPanel";
import { Tab } from "@mui/base/Tab";

import { RuleGroup } from "../types";
import queryDisplay from "./Modal/QueryDisplay";

export default function QueryTabs({
  ruleGroup,
}: {
  ruleGroup: RuleGroup | null;
}) {
  if (!ruleGroup) return null;
  return (
    <Tabs defaultValue={1}>
      <TabsList className="mb-4 rounded bg-purple flex items-center justify-center content-between">
        <Tab
          slotProps={{
            root: ({ selected, disabled }) => ({
              className: `font-sans ${
                selected
                  ? "text-purple bg-white"
                  : "text-white bg-transparent focus:text-white hover:bg-purple-hover"
              } ${
                disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              } text-sm font-bold w-full p-2 m-1.5 border-0 rounded-lg flex justify-center focus:outline-0 focus:shadow-outline-purple-light`,
            }),
          }}
          value={1}
        >
          Query string
        </Tab>
        <Tab
          slotProps={{
            root: ({ selected, disabled }) => ({
              className: `font-sans ${
                selected
                  ? "text-purple bg-white"
                  : "text-white bg-transparent focus:text-white hover:bg-purple-hover"
              } ${
                disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              } text-sm font-bold w-full p-2 m-1.5 border-0 rounded-md flex justify-center focus:outline-0 focus:shadow-outline-purple-light`,
            }),
          }}
          value={2}
        >
          RuleGroup
        </Tab>
      </TabsList>
      <TabPanel className="w-full font-mono text-sm" value={1}>
        <pre className="bg-gray-100 p-4 rounded shadow-md text-wrap">
          <code>{queryDisplay(ruleGroup)}</code>
        </pre>
      </TabPanel>
      <TabPanel
        className="w-full font-sans text-sm max-h-[500px] overflow-y-scroll"
        value={2}
      >
        {/* display rulegroup as object */}
        <pre className="bg-gray-100 p-4 rounded shadow-md text-wrap">
          <code>{JSON.stringify(ruleGroup, null, 2)}</code>
        </pre>
      </TabPanel>
    </Tabs>
  );
}
