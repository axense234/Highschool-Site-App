type MarkableHeadingProps = {
  type: "h1" | "h2" | "h3";
  hasHiddenClassname?: boolean;
  textContent: string;
  isLink?: boolean;
  linkHref?: string;
  idUsed?: string;
  headingRef?: (node?: Element | null | undefined) => void;
  pageId?: string;
};

export default MarkableHeadingProps;
