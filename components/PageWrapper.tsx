import React, { PropsWithChildren } from "react";

type Props = { heading: string };

const PageWrapper: React.FC<PropsWithChildren<Props>> = ({ heading, children }) => {
  return (
    <>
      <div className="flex flex-row justify-between items-center mb-4 sm:mb-8">
        <h2 className="item-list-header">{heading}:</h2>
      </div>
      {children}
    </>
  );
};

export default PageWrapper;
