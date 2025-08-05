import { useEffect, useState} from "react";
//* ####################### useDebounce hook #############################

// Debouncing is used where user trigger fast changing state like a user input search bar. Stopping an action after certain delay
// Means Delaying the execution of a function until a specified amount of time has passed since it was last called

export function useDebounce<T>(value: T, delay: number): T {
  // T here specifies that it can take any value from number to string to boolean any and also specify that function will return something
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay); // if the user stopped changing the value for entire delay that is defined , we update the debouncedValue. EG updating search result after user stops typing

    return () => {
      clearTimeout(handler); // if user starts typing again -> value being changed now we reset the value and update it with latest interaction
    };
  }, [value, delay]);

  return debounceValue;
}