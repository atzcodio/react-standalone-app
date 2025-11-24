import React, { useContext } from "react";
import { BuilderContext, useDrawer } from "react-flow-builder";
import { UploadOutlined } from "@ant-design/icons";
import { Upload } from "antd";

import {
  Row,
  Col,
  Form,
  Button,
  Input,
  Space,
  Checkbox,
  Radio,
  Select,
} from "antd";

import MarkCodeEditor from "./../Properties/Elements/MarkEditor";
import CodeEditor from "../Properties/Elements/CodeEditor";

export const ValueField = (
  handleFieldChange2,
  input,
  index,
  node,
  nodeId,
  suggestionArray,
  handleFieldChange,
  handleChangeInMarkEditor,
  // contentType = "binary",
  parentField = "",
  // setContentType,
  // contentType
) => {
  let defaultValue;
  if (parentField) {
    // console.log("node.data=",[parentField])
    console.log("node.data", node.data?.[parentField][input.name]);
    defaultValue = node.data?.[parentField][input.name] || input.defaultValue;
  } else {
    console.log("node.data", node.data[input.name]);
    defaultValue = node.data[input.name] || input.defaultValue;
  }

  

  console.log("defaultValue==", defaultValue);
  console.log("inputInValue==", input);
  return (
    <Form.Item
      key={index}
      name={input.name}
      style={{ marginBottom: "16px" ,height:'100%'}}
      initialValue={defaultValue}
    >
      {input.type === "text" && <Input onChange={handleFieldChange} />}
      {/* {input.type === "textarea" && (
        <Input.TextArea onChange={handleFieldChange} />
      )} */}
      {input.type === "textarea" && (
        <Input.TextArea onChange={handleFieldChange} />
      )}
      {input.type === "number" && (
        <Input type="number" onChange={handleFieldChange} />
      )}
      {input.type === "checkbox" && (
        <Checkbox onChange={handleFieldChange}>{input.label}</Checkbox>
      )}
      {input.type === "radio" && (
        <Radio.Group>
          {input.options.map((option, idx) => (
            <Radio key={idx} value={option.value} onChange={handleFieldChange}>
              {option.label}
            </Radio>
          ))}
        </Radio.Group>
      )}
      {input.type === "select" && (
        <Select onChange={(value) => handleFieldChange2(input.name,value)}>
          {input.options.map((option, idx) => (
            <Select.Option key={idx} value={option.value}>
              {console.log("option===", option)}
              {option.label}
            </Select.Option>
          ))}
        </Select>
      )}
      {input.type === "markCodeEditor" && (
        <div className="w-full">
        <MarkCodeEditor
          id={nodeId}
          name={input.name}
          value={defaultValue !== undefined ? String(defaultValue) : ""}
          suggestionArray={suggestionArray.suggestions}
          onChange={(id,name, value) => handleChangeInMarkEditor(id,name, value)}
        />
        </div>
      )}
      {input.type === "codeEditor" && (
        <CodeEditor
          id={nodeId}
          name={input.name}
          // value={JSON.stringify(node.data?.[input.name]) || ""}
          value={defaultValue !== undefined ? String(defaultValue) : ""}
          suggestionArray={suggestionArray.suggestions}
          onChange={(id,name, value) => handleChangeInMarkEditor(id,name, value)}
        />
      )}
    </Form.Item>
  );
};
