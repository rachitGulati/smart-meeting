import * as React from "react";

const { useEffect, useRef } = React;


const useInterval = (callback: Function, delay: number) => {
    const savedCallback = useRef<Function | null>(null);
  
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    useEffect(() => {
      const tick = () => {
        savedCallback && savedCallback.current && savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

  export  default useInterval;