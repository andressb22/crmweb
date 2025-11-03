import React, { useState } from "react";

type CollapsibleItem = {
  label: string;
  children: React.ReactNode;
};

function CollapsibleItem({ label, children }: CollapsibleItem) {
  const [open, setOpen] = useState(false);

  return (
    <li style={{ marginBottom: "5px" }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          cursor: "pointer",
          fontWeight: "bold",
          userSelect: "none",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <span>
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          )}
        </span>{" "}
        {label}
      </div>
      {open && <div style={{ marginLeft: "20px" }}>{children}</div>}
    </li>
  );
}

export default CollapsibleItem;
