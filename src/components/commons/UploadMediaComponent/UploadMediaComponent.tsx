import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import "./UploadMediaComponent.scss";
import LazyLoadImage from "../LazyLoadImage/LazyLoadImage";

interface IProps {
  media: string;
  onChange: (media) => void;
  height?: any;
}

const UploadMediaComponent = (props: IProps) => {
  return (
    <div className="upload-component w-100">
      <label htmlFor="input-media" className="w-100">
        <div className="wrap-open-modal w-100 h-100">
          <div className="wrap-image d-flex" style={{ height: props.height || "300px", justifyContent: "center" }}>
            {props.media && (
              <LazyLoadImage
                url={
                  typeof props.media == "string" ? `https://register-class-api.dev-altamedia.com/${props.media}` : URL.createObjectURL(props.media)
                }
                alt={"media"}
              />
            )}
            <div className="open-modal">
              <PlusOutlined />
            </div>
          </div>
        </div>
      </label>
      <input
        onChange={e => {
          props.onChange(e.target.files[0]);
        }}
        type="file"
        id="input-media"
        name="input-media"
        accept="image/png, image/jpeg"
      />
    </div>
  );
};

export default UploadMediaComponent;
