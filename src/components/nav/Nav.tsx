import React from "react";
import { Link } from "react-router-dom";

export default function Nav({ children }: React.PropsWithChildren<any>) {
  return (
    <nav className="bg-white border-gray-200 px-2 py-2.5 rounded-xl shadow-sm">
      <div className="container flex justify-between items-center mx-auto my-4">
        <div
          className="flex flex-row w-auto gap-2 items-center"
          id="mobile-menu"
        >
          {children}
        </div>
      </div>
    </nav>
  );
}
