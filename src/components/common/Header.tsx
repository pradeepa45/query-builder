import React, { useState } from "react";
import { clsx } from "clsx";

import Logo from "./Logo";
import Avatar from "./Avatar";

interface HeaderListItem {
  id: string;
  name: string;
  url: string;
  icon: React.ReactNode;
}

export default function Header({ list }: { list: HeaderListItem[] }) {
  const [active] = useState(0);
  return (
    <nav className="flex gap-20 h-[72px] items-center lg:mx-20 bg-grey bg-opacity-5 justify-between mx-4">
      <Logo />
      <div className="gap-4 grow md:flex hidden">
        {list.map((item) => (
          <a
            href={item.url}
            key={item.name}
            id={item.id}
            className={clsx(
              "flex gap-2 py-1.5 px-2 hover:bg-grey hover:bg-opacity-10 rounded-3xl items-center justify-center",
              active === list.indexOf(item)
                ? "bg-white bg-opacity-5 text-white"
                : "text-grey"
            )}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </a>
        ))}
      </div>
      <Avatar />
    </nav>
  );
}
