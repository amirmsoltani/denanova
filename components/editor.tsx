import React, { FC, useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type PropsType = {
  initialValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
};
const Editor: FC<PropsType> = ({
  initialValue,
  onChange: onChangeProps,
  value: propsValue,
  name: propsName,
}) => {
  const [value, setValue] = useState(initialValue || "");

  const onChange = (editorValue: string) => {
    onChangeProps?.(editorValue);
    if (!propsValue) {
      setValue(editorValue);
    }
  };

  return (
    <div dir="ltr" className="bg-white">
      {propsName && (
        <input
          type={"hidden"}
          className="hidden"
          value={propsValue || value}
          name={propsName}
        />
      )}
      <ReactQuill
        theme="snow"
        value={propsValue || value}
        onChange={onChange}
        modules={{
          toolbar: [
            [
              { header: [1, 2, 3, 4, 5, 6, false] },
              { size: ["small", false, "large", "huge"] },
            ],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            [{ list: "ordered" }, { list: "bullet" }],
            [
              { indent: "-1" },
              { indent: "+1" },
              { align: [] },
              { direction: "rtl" },
            ],
            ["link"],
            ["clean"],
          ],
        }}
      />
    </div>
  );
};

export default Editor;
