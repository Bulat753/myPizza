import React from 'react';
import s from './Navbar.module.scss';
import { Link } from 'react-scroll';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setNavTitle } from '../../store/slices/HomeSlice/HomeSlice';

export const Navbar = () => {
  const { navTitle } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  return (
    <div className={s.navbar}>
      <div className={s.wrapper}>
        <div className={s.body}>
          <NavLink style={{ textDecoration: 'none' }} to="/">
            <div
              onClick={() => dispatch(setNavTitle('Главная'))}
              className={navTitle === 'Главная' ? s.mainActive : s.main}>
              {' '}
              Главная
            </div>
          </NavLink>

          <Link smooth={true} to="pizzas" offset={-35} duration={1000}>
            <NavLink style={{ textDecoration: 'none' }} to="/">
              <div
                onClick={() => dispatch(setNavTitle('Пицца'))}
                className={navTitle === 'Пицца' ? s.pizzasActive : s.pizzas}>
                {' '}
                Пицца
              </div>
            </NavLink>
          </Link>

          <Link smooth={true} offset={-35} duration={1000} to="drinks">
            <NavLink style={{ textDecoration: 'none' }} to="/">
              <div
                onClick={() => dispatch(setNavTitle('Напитки'))}
                className={navTitle === 'Напитки' ? s.drinksActive : s.drinks}>
                Напитки
              </div>
            </NavLink>
          </Link>

          <NavLink style={{ textDecoration: 'none' }} to="/cart">
            <div
              onClick={() => dispatch(setNavTitle('Корзина'))}
              className={navTitle === 'Корзина' ? s.cartActive : s.cart}>
              {' '}
              Корзина
            </div>
          </NavLink>

          <NavLink style={{ textDecoration: 'none' }} to="/orders">
            <div
              onClick={() => dispatch(setNavTitle('Заказы'))}
              className={navTitle === 'Заказы' ? s.ordersActive : s.orders}>
              {' '}
              Заказы
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
