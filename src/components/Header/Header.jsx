import React from 'react';
import logoApp from '../../images/logoRoyal.png';
import { Navbar } from './Navbar';
import s from './Header.module.scss';

export const Header = () => {
  return (
    <div className={s.header}>
      <div className={s.wrapper}>
        <div className={s.logo}>
          <img src={logoApp} />
        </div>
      </div>
    </div>
  );
};
