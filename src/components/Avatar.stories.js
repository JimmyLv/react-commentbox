import React from "react";
import Avatar from "./Avatar";

export default {
  title: "Avatar",
};

export const normal = () => <Avatar />;
export const bigger = (args) => <Avatar {...args} />;

bigger.args = { maxWidth: 200 };
