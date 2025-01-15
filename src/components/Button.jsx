import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <div className="flex justify-end space-x-4 space-y-2">
      <button className={`${bgColor} ${textColor} ${className}`} {...props}>
        {children}
      </button>
    </div>
  );
}
