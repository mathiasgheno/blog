import React from "react";

export interface IProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  description?: string,
  icon?: 'Dark' | 'Light',
  withoutStyles?: boolean,
}
