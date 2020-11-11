import React, { useState, useEffect } from "react";
import { Skeleton } from "antd";
import "./LazyLoadImage.scss";

interface IProps {
    url: string;
    alt: string;
    w100?: boolean;
}

const LazyLoadImage = (props: IProps) => {
    const [rendered, setRendered] = useState(true);

    return (
        <div className="wrap-lazyload h-100 w-100">
            {rendered && <Skeleton.Button className={"skeleton"} active={true} size={"large"} shape={"square"}></Skeleton.Button>}
            {props.url && (
                <img
                    onLoad={() => {
                        setRendered(false);
                    }}
                    style={{ maxWidth: "100%" }}
                    className={`${props.w100 && "w-100"} h-100`}
                    src={props.url}
                    alt={props.alt}
                />
            )}
        </div>
    );
};

export default LazyLoadImage;
