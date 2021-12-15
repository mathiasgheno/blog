import React, { FC } from 'react';
import { IProps } from './Button.types';
import * as icons from '../../icons';
import styles from "./Button.css";

export const links = () => [
  { rel: "stylesheet", href: styles }
];

export const Button: FC<IProps> = (props) => {
  let Icon = null;
  if (props.icon) {
    Icon = icons[props.icon];
  }
  return (
    <button
      {...props}
    >
      {props.description && props.description}
      {Icon && <Icon />}
    </button>
  )
}
