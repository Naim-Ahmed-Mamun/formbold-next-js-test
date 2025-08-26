import React, { useEffect, useRef } from "react";
import Prism from "prismjs";

const ClientCodeBlock = ({ code, language }) => {
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  return (
    <pre className={`h-full language-${language}`}>
      <code ref={codeRef} className={`h-full overflow-y-auto language-${language}`}>
        {code}
      </code>
    </pre>
  );
};

export default ClientCodeBlock;
