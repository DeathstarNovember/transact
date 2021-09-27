import React, { Children } from "react";
import { isWhiteSpaceLike } from "typescript";

type CustomBaseCardProps = {};

type BaseCardProps = CustomBaseCardProps &
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
export const Card: React.FC<BaseCardProps> = ({ children, style }) => {
  const baseCardStyles: React.CSSProperties = {
    background: "#FFFFFF",
    height: "140",
    boxShadow: "10px 5px 76px gray",
    padding: "25px",
    margin: "50px",
    alignItems: "center",
  };
  return <div style={{ ...baseCardStyles, ...style }}>{children}</div>; //---- ask john to make a note on this
};

