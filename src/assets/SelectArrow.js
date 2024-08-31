import * as React from "react";

const SelectArrow = (props) => (
  <svg
    {...props}
    width={14}
    height={8}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.916 5.48 12.145.289a.993.993 0 0 1 1.614.318.977.977 0 0 1-.214 1.069L7.617 7.56a.993.993 0 0 1-1.4 0L.289 1.676a.976.976 0 0 1 0-1.387.993.993 0 0 1 1.4 0l5.227 5.19Z"
      fill="url(#a)"
    />
    <defs>
      <linearGradient
        id="a"
        x1={0}
        y1={6.868}
        x2={5.859}
        y2={-2.605}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#A1E6F6" />
        <stop offset={1} stopColor="#A1E6F6" />
      </linearGradient>
    </defs>
  </svg>
);

export default SelectArrow;
