import React from 'react';
import s from './Home.module.scss';
import { useEffect, useState } from 'react';
import { Carousel } from '../../components/Carousel/Carousel';
import { Header } from '../../components/Header/Header';
import { Navbar } from '../../components/Header/Navbar';
import { Search } from '../../components/Search/Search';
import { Element } from 'react-scroll';
import { Products } from '../../components/Products/Pizzas';
import { Drinks } from '../../components/Products/Drinks';
import { ModalWindow } from '../../components/ModalWindow/ModalWindow';
import Select from 'react-select';
import { CartWidget } from '../../components/CartWidget/CartWidget';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, onChange } from '../../store/slices/HomeSlice/HomeSlice';
export const Home = ({
}) => {
  const { showModalWindow } = useSelector((state) => state.cart);
  const { options } = useSelector((state) => state.filter);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const styless = {
    control: (base) => ({
      ...base,
      border: 1,
      height: 47,
      // This line disable the blue border
      boxShadow: 'none',
    }),
  };
  return (
    <div className={s.home}>
      <Header />
      <Navbar />
      <div className={s.body}>
        <Carousel />
        <div className={s.searchSelect}>
          <Search />
          <Select
            styles={styless}
            placeholder="Сортировка пицц"
            className={s.select}
            onChange={(e) => dispatch(onChange(e))}
            options={options}
          />
        </div>
        <Element name="pizzas">
          <Products />
        </Element>
        <Element name="drinks">
          <Drinks />
        </Element>
        {showModalWindow && <ModalWindow />}
        {cart.length !== 0 && (
          <CartWidget
          />
        )}
      </div>
    </div>
  );
};
