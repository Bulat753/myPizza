import s from './Cart.module.scss';
import { Header } from '../../components/Header/Header';
import { Navbar } from '../../components/Header/Navbar';
import { OrderDetails } from '../../components/OrderDetails/OrderDetails';
import MaskedInput from 'react-text-mask';
import { CartModalWindow } from '../../components/ModalWindow/CartModalWindow';
import { useSelector, useDispatch } from 'react-redux';
import { setNavTitle } from '../../store/slices/HomeSlice/HomeSlice';
import {
  removeProductCart,
  increaseCount,
  decreaseCount,
  handlerBlur,
  valueChange,
  toggleBtn,
  setCart,
  postOrder,
  setShowCartModalWindow,
} from '../../store/slices/CartSlice/CartSlice';
export const Cart = () => {
  const { navTitle } = useSelector((state) => state.home);
  const {
    cart,
    orderDetails,
    userName,
    userPhone,
    amountPerson,
    userAddress,
    showCartModalWindow,
  } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const addOrder = (obj) => {
    dispatch(setShowCartModalWindow(true));
    dispatch(postOrder(obj));
    dispatch(setCart([]));
  };
  return (
    <div className={s.cart}>
      <Header />
      <Navbar navTitle={navTitle} setNavTitle={dispatch(setNavTitle)} />
      <div className={s.wrapper}>
        <div className={s.cartTitle}>{cart?.length > 0 ? 'Корзина' : 'Корзина пуста'}</div>
        {cart?.length > 0 &&
          cart?.map((el) => (
            <div className={s.body}>
              {/* Наименование пиццы и его размер */}
              <div className={s.text}>
                <span className={s.title}>{el.title}</span>
                <span className={s.size}>
                  {el.size === 'small'
                    ? '(Маленькая)'
                    : el.size === 'middle'
                    ? '(Средняя)'
                    : '(Большая)'}
                </span>
                {/* Отрисовка доп ингридиентов */}
                {el.additionsOptions.length !== 0 && 'Добавить:'}
                {el.additionsOptions.map((elem) => (
                  <span className={s.additonsTitle}>{elem}</span>
                ))}
                {/* Отрисовка примечаний P.S.(Без лука, без помидоров) */}
                {el.withoutOptions.length !== 0 && 'Для вас:'}
                {el.withoutOptions.map((elem) => (
                  <span className={s.withoutTitle}>{elem}</span>
                ))}
                {/* Отрисовка кол-ва продуктов */}
                <div className={s.amount}>Кол-во:{el.amount} шт.</div>
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
        {cart?.length > 0 && (
          <div className={s.totalCart}>
            <></>
            <div> Итого:</div>
            <div>
              {cart
                ?.map((el) => el.price)
                ?.flat()
                ?.reduce((a, b) => a + b)}
              ₽
            </div>
          </div>
        )}
        {cart?.length !== 0 && (
          <>
            <div className={s.titleOrderDetails}>Детали заказа</div>
            <div className={s.orderDetails}>
              {orderDetails.slice(0, orderDetails.length - 1).map((el) => (
                <div className={s.floors}>
                  <div className={s.orderDetailsText}>{el.text}</div>
                  <OrderDetails
                    id={el.id}
                    text={el.text}
                    placeholder={el.placeholder}
                    type={el.type}
                    error={el.error}
                    dirty={el.dirty}
                    value={el.value}
                  />
                </div>
              ))}
              {orderDetails.slice(orderDetails.length - 1, orderDetails.length).map((el) => (
                <div className={s.floors}>
                  <div className={s.orderDetailsText}>{el.text}</div>
                  <MaskedInput
                    name={el.text}
                    mask={[
                      '+',
                      '7',
                      '(',
                      /[1-9]/,
                      /\d/,
                      /\d/,
                      ')',
                      '-',
                      /\d/,
                      /\d/,
                      /\d/,
                      '-',
                      /\d/,
                      /\d/,
                      '-',
                      /\d/,
                      /\d/,
                    ]}
                    className={s.maskedInput}
                    placeholder={el.placeholder}
                    guide={false}
                    value={el.value}
                    onBlur={(e) =>
                      dispatch(
                        handlerBlur({ event: e.target.value, text: el.text, value: el.value }),
                      )
                    }
                    onChange={(e) =>
                      dispatch(
                        valueChange({
                          event: e.target.value,
                          value: el.value,
                          id: el.id,
                          text: el.text,
                        }),
                      )
                    }
                  />
                  {el.dirty && <div className={s.error}>{el.error}</div>}
                </div>
              ))}
            </div>
            <button
              onClick={() =>
                addOrder({
                  total: cart
                    .map((el) => el.price)
                    .flat()
                    .reduce((a, b) => a + b),
                  pizzas: cart,
                  userName: userName,
                  userPhone: userPhone,
                  amountPerson: amountPerson,
                  userAddress: userAddress,
                  postOrder: postOrder,
                })
              }
              disabled={!dispatch(toggleBtn)}
              className={
                orderDetails.every((el) => el.value === '')
                  ? s.btnOrderDisabled
                  : orderDetails.some((el) => el.dirty === true || el.value === '')
                  ? s.btnOrderDisabled
                  : s.btnOrder
              }>
              Заказать
            </button>
          </>
        )}
        {showCartModalWindow && <CartModalWindow />}
      </div>
    </div>
  );
};
