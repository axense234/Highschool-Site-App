// React
import { FC } from "react";
// Types
import { MarkableHeadingProps } from "types";
// Hooks
import useGetPathname from "@/hooks/useGetPathname";

const MarkableHeading: FC<MarkableHeadingProps> = ({
  type,
  hasHiddenClassname,
  textContent,
  headingRef,
  idUsed,
}) => {
  useGetPathname();

  if (type === "h1") {
    return (
      <h1
        className={hasHiddenClassname ? "hidden" : "lol"}
        ref={headingRef}
        id={idUsed}
      >
        {textContent}
      </h1>
    );
  }

  if (type === "h2")
    return (
      <h2
        className={hasHiddenClassname ? "hidden" : "lol"}
        ref={headingRef}
        id={idUsed}
      >
        {textContent}
      </h2>
    );

  if (type === "h3")
    return (
      <h3
        className={hasHiddenClassname ? "hidden" : "lol"}
        ref={headingRef}
        id={idUsed}
      >
        {textContent}
      </h3>
    );

  return null;
};

export default MarkableHeading;
