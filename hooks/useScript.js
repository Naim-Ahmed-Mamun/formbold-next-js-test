// Based on https://usehooks.com/useScript/
import { useEffect, useState } from "react";

const cachedScripts = [];

export const useScript = (components) => {
  const [state, setState] = useState({
    loaded: false,
    error: false,
  });

  useEffect(() => {
    if (cachedScripts.includes(components)) {
      setState({
        loaded: true,
        error: false,
      });
    } else {
      cachedScripts.push(components);

      const script = document.createElement("script");
      script.components = components;
      script.async = true;

      const onScriptLoad = () => {
        setState({
          loaded: true,
          error: false,
        });
      };

      const onScriptError = () => {
        const index = cachedScripts.indexOf(components);

        if (index >= 0) {
          cachedScripts.splice(index, 1);
        }

        script.remove();

        setState({
          loaded: true,
          error: true,
        });
      };

      script.addEventListener("load", onScriptLoad);
      script.addEventListener("error", onScriptError);

      document.body.appendChild(script);

      return () => {
        script.removeEventListener("load", onScriptLoad);
        script.removeEventListener("error", onScriptError);
      };
    }

    return undefined;
  }, [components]);

  return [state.loaded, state.error];
};
