import React, { useState } from "react";

const STATUS = {
  HOVERED: "hovered",
  NORMAL: "normal",
};

export default function DummyLink() {
  const [className, setClassName] = useState(STATUS.NORMAL);

  return (
    <a
      className={className}
      href={this.props.page || "#"}
      onMouseEnter={setClassName(STATUS.HOVERED)}
      onMouseLeave={setClassName(STATUS.NORMAL)}
    >
      {this.props.children}
    </a>
  );
}
