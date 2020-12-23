import React from "react";
import { Prism } from "react-syntax-highlighter";
import { materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism";

export type CodeBlockProps = {
  className: string;
};

export const CodeBlock: React.FC<CodeBlockProps> = ({
  className,
  children,
  ...props
}) => {
  let classes: string[] = [];
  if (className) {
    classes = className?.split(" ");
  }

  if (classes[1] && classes[1].indexOf("language") !== -1) {
    const lang = classes[1].split("-")[1];
    return (
      <Prism language={lang} style={materialOceanic}>
        {children}
      </Prism>
    );
  }
  return (
    <code {...props} className={className}>
      {children}
    </code>
  );
};
