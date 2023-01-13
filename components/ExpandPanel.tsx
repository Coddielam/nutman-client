import React, { useEffect, useRef, useState } from 'react';
import { BsChevronUp, BsChevronDown } from 'react-icons/bs';

interface IAccordionProps extends React.PropsWithChildren {
  title: string;
  defaultOpen?: boolean;
}
const Accordion: React.FC<IAccordionProps> = ({
  title,
  defaultOpen,
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultOpen);

  return (
    <div>
      <div
        className="flex justify-between items-center border-b-[lightgray] border-b-[1px] py-2 cursor-pointer"
        onClick={() => setIsExpanded((isOpen) => !isOpen)}
      >
        {title}
        {isExpanded ? <BsChevronUp /> : <BsChevronDown />}
      </div>
      <div
        className={`overflow-scroll transition-all duration-500 ${
          isExpanded ? 'max-h-96 ease-in' : 'max-h-0 ease-out'
        }`}
      >
        <div className="py-4">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
