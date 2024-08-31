import * as React from "react";

const SelectArrowDown = (props) => (
  <svg
    {...props}
    width={14}
    height={8}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m6.918 2.37-5.23 5.19a.993.993 0 0 1-1.613-.317.976.976 0 0 1 .214-1.07L6.217.29a.993.993 0 0 1 1.4 0l5.928 5.885a.977.977 0 0 1 0 1.387.993.993 0 0 1-1.4 0L6.918 2.37Z"
      fill="url(#a)"
    />
    <defs>
      <linearGradient
        id="a"
        x1={13.834}
        y1={0.981}
        x2={7.974}
        y2={10.455}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#A1E6F6" />
        <stop offset={1} stopColor="#A1E6F6" />
      </linearGradient>
    </defs>
  </svg>
);

export default SelectArrowDown;
