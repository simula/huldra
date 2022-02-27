import React from "react";
const ParagraphWithList = ({
  className,
  listClassName,
  listOptions,
  listItemClassName,
  textBefore,
  textAfter,
  textClassName,
}) => {
  return (
    <div className={className}>
      <p className={textClassName}>{textBefore}</p>
      <ul className={listClassName}>
        {listOptions &&
          listOptions.map((item, index) => (
            <li className={listItemClassName} key={index}>
              {item}
            </li>
          ))}
      </ul>
      <p className={textClassName}>{textAfter}</p>
    </div>
  );
};

export default ParagraphWithList;
