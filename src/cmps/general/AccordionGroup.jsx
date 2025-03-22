import React, { useState } from "react";

export function AccordionGroup({ children }) {
  const [activeIdx, setActiveIdx] = useState(-1);
  const childrenWithProps = React.Children.map(children, (child, idx) => {
    const childProps = {
      onToggle: () => {
        if (idx === activeIdx) idx = -1;
        setActiveIdx(idx);
      },
      isActive: idx === activeIdx,
    };
    return React.cloneElement(child, childProps);
  });
  return <section className="accordion-group">{childrenWithProps}</section>;
}
