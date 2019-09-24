import React, { Component } from "react";
import { MonacoDiffEditor } from "react-monaco-editor";

const getEditor = (options: any, original: string, current: string) => {
  return (
    <MonacoDiffEditor
      language="javascript"
      theme="vs-dark"
      original={original}
      value={current}
      options={options}
      onChange={(value: any, e: any) => {}}
    />
  );
};

export { getEditor };
