// src/types/react-quill.d.ts
declare module "react-quill" {
  import * as React from "react";

  interface ReactQuillProps {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string, delta: any, source: string, editor: any) => void;
    readOnly?: boolean;
    placeholder?: string;
    theme?: string;
    modules?: any;
    formats?: string[];
    bounds?: string | HTMLElement;
    scrollingContainer?: string | HTMLElement;
    style?: React.CSSProperties;
    className?: string;
  }

  export default class ReactQuill extends React.Component<ReactQuillProps> {}
}
