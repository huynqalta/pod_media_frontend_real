import React from 'react';
import './styles.scss';

interface Props {
  classNames?: string;
  htmlFor?: any;
  text: string;
  require?: boolean;
}

const LabelComponent = (props: Props) => {
  return (
    <div className="wrap-label-custom">
      <label
        htmlFor={props.htmlFor}
        className={`label-custom ${props.classNames}`}
      >
        {props.text}
        {props.require ? <span className="require">*</span> : ''}
      </label>
    </div>
  );
};

export default LabelComponent;
