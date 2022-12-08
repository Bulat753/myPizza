import { Header } from '../../components/Header/Header';
import { Navbar } from '../../components/Header/Navbar';
import s from './Orders.module.scss';
import moment from 'moment';
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setNavTitle } from '../../store/slices/HomeSlice/HomeSlice';
import { getOrders } from '../../store/slices/OrderSlice/OrderSlce';

export const Orders = ({ setOrders }) => {
  const { navTitle } = useSelector((state) => state.home);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  return (
    <div className={s.orders}>
      <Header />
      <Navbar navTitle={navTitle} setNavTitle={dispatch(setNavTitle)} />
      <div className={s.wrapper}>
        {orders?.length === 0 ? (
          <div className={s.title}>У вас пока нет заказов!</div>
        ) : (
          <>
            <div className={s.title}>Ваши заказы:</div>
            {orders?.map((el) => (
              <div className={s.body}>
                <div>Дата заказа:{moment(el?.date).calendar()}</div>
                {el?.pizzas.map((i) => (
                  <div className={s.floors}>
                    <div className={s.firstFloor}>
                      <div className={s.pizzasTitle}>{i?.title}</div>
                      <div className={s.sizePizzas}>
                        {i?.size === 'small'
                          ? '(Маленькая)'
                          : el.size === 'middle'
                          ? '(Средняя)'
                          : '(Большая)'}
                      </div>
                      <div className={s.amountProducts}> Количество: {i?.amount} шт.</div>
                    </div>

                    <div className={s.priceProducts}>Cумма: {i?.price} руб.</div>
                    {i?.additionsOptions.length !== 0 && (
                      <div className={s.additionOptionsProducts}>
                        {' '}
                        Дополнительные ингредиенты: {i?.additionsOptions.map((n) => n + ' ')}
                      </div>
                    )}
                    {i?.withoutOptions.length !== 0 && (
                      <div className={s.withoutOptionsProducts}>
                        {' '}
                        Для вас: {i?.withoutOptions.map((n) => n + ' ')}
                      </div>
                    )}
                  </div>
                ))}
                <div>
                  <div className={s.userAddress}>
                    Адрес доставки: г.Казань, ул.{el.userAddress.map((i) => i.street)}, д.{' '}
                    {el.userAddress.map((i) => i.houseNum)}, кв.{' '}
                    {el.userAddress.map((i) => i.flatNum)}
                  </div>
                  <div className={s.userName}>Получатель заказа:{el.userName}</div>
                  <div className={s.userPhone}>{el.userPhone}</div>
                  <div className={s.amountPerson}>Количество персон: {el.amountPerson}</div>
                </div>
                <div className={s.totalProducts}>Итого: {el?.total} руб.</div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
