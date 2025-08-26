// import Highlight, { defaultProps } from "prism-react-renderer";
// import vsDark from "prism-react-renderer/themes/vsDark";
// import React from "react";

// export default ({ children, className }) => {
//   // Pull the className
//   const language = className.replace(/language-/, "") || "";

//   return (
//     <Highlight
//       {...defaultProps}
//       code={children}
//       language={language}
//       theme={vsDark}
//     >
//       {({ className, style, tokens, getLineProps, getTokenProps }) => (
//         <div data-language={language}>
//           <pre className={className} style={{ ...style, borderRadius: "6px" }}>
//             {tokens.map((line, index) => {
//               const lineProps = getLineProps({ line, key: index });
//               return (
//                 <div key={index} {...lineProps}>
//                   {line.map((token, key) => (
//                     <span key={key} {...getTokenProps({ token, key })} />
//                   ))}
//                 </div>
//               );
//             })}
//           </pre>
//         </div>
//       )}
//     </Highlight>
//   );
// };


import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import vsDark from "prism-react-renderer/themes/vsDark";

const CodeBlock = ({ children, className }) => {
  const language = className?.replace(/language-/, "") || "";

  return (
    <Highlight
      {...defaultProps}
      code={children}
      language={language}
      theme={vsDark}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div data-language={language}>
          <pre className={className} style={{ ...style, borderRadius: "6px" }}>
            {tokens.map((line, index) => {
              const lineProps = getLineProps({ line, key: index });
              return (
                <div key={index} {...lineProps}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              );
            })}
          </pre>
        </div>
      )}
    </Highlight>
  );
};

export default CodeBlock;

