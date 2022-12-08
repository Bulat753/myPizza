import React, { useState } from 'react';
import s from './CartWidget.module.scss';
import cartToggler from '../../images/cart__toggler.png';
import { NavLink } from 'react-router-dom';
import { setNavTitle } from '../../store/slices/HomeSlice/HomeSlice';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeProductCart,
  decreaseCount,
  setShowCartWidget,
  increaseCount,
} from '../../store/slices/CartSlice/CartSlice';

export const CartWidget = () => {
  const { cart, showCartWidget } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <div className={s.catWidget}>
      <div className={s.wrapper}>
        <div className={s.content}>
          <div className={s.header}>
            <NavLink style={{ textDecoration: 'none', color: 'white' }} to="/cart">
              <span onClick={() => dispatch(setNavTitle('Корзина'))} className={s.headerTitle}>
                Корзина(
                {cart
                  .map((el) => el.price)
                  .flat()
                  .reduce((a, b) => a + b)}
                ₽)
              </span>
            </NavLink>

            <img
              className={showCartWidget ? s.image : s.imageRotate}
              onClick={() => dispatch(setShowCartWidget(!showCartWidget))}
              src={cartToggler}
            />
          </div>
          {showCartWidget &&
            cart.map((el) => (
              <div className={s.body}>
                {/* Наименование пиццы и его размер */}
                <div className={s.text}>
                  <div className={s.title}>
                    {el.title}{' '}
                    <span className={s.size}>
                      {el.size === 'small'
                        ? '(Маленькая)'
                        : el.size === 'middle'
                        ? '(Средняя)'
                        : '(Большая)'}
                    </span>
                  </div>
                  {/* Отрисовка доп ингридиентов */}
                  <div className={s.additionsOptions}>
                    {el.additionsOptions.length !== 0 && ':Добавить'}
                    {el.additionsOptions.map((elem) => (
                      <span className={s.additonsTitle}>{elem}</span>
                    ))}
                  </div>
                  {/* Отрисовка примечаний P.S.(Без лука, без помидоров) */}

                  <div className={s.withoutOptions}>
                    {el.withoutOptions.length !== 0 && ':Для вас'}
                    {el.withoutOptions.map((elem) => (
                      <span className={s.withoutTitle}>{elem}</span>
                    ))}
                  </div>
                  {/* Отрисовка кол-ва продуктов */}
                  <div className={s.amount}>Кол-во:{el.amount}</div>
                  {/* Отрисовка суммы продукта */}
                  <div className={s.summ}>Сумма:{el.price} руб</div>
                </div>
                <div className={s.button}>
                  <div className={s.currentAmount}>
                    <button
                      onClick={() =>
                        dispatch(
                          increaseCount({
                            title: el.title,
                            size: el.size,
                            additionOption: el.additionsOptions,
                            withoutOption: el.withoutOptions,
                            price: el.price,
                            amount: el.amount,
                          }),
                        )
                      }
                      className={s.minus}>
                      -
                    </button>
                    <button
                      onClick={() =>
                        dispatch(
                          decreaseCount({
                            title: el.title,
                            size: el.size,
                            additionOption: el.additionsOptions,
                            withoutOption: el.withoutOptions,
                            price: el.price,
                            amount: el.amount,
                          }),
                        )
                      }
                      className={s.plus}>
                      +
                    </button>
                  </div>

                  <button
                    onClick={() =>
                      dispatch(
                        removeProductCart({
                          title: el.title,
                          size: el.size,
                          additionOption: el.additionsOptions,
                          withoutOption: el.withoutOptions,
                        }),
                      )
                    }
                    className={s.delete}>
                    Удалить
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
