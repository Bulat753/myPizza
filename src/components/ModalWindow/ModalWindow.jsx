import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './ModalWindow.css';
import {
  addToCart,
  setProductsSize,
  setAdditionOption,
  setWithoutOption,
  setAmountProducts,
  setShowModalWindow,
  addAddition,
  removeAddition,
  addWithoutOptions,
  removeWithoutOptions,
} from '../../store/slices/CartSlice/CartSlice';
export const ModalWindow = () => {
  const {
    productsModalWindow,
    productsSize,
    additionOption,
    withoutOption,
    amountProducts,
    showModalWindow,
  } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <div
      className={showModalWindow ? 'modal active' : 'modal'}
      onClick={() => {
        dispatch(setShowModalWindow(false));
        dispatch(setAmountProducts(1));
        dispatch(setAdditionOption([]));
        dispatch(setWithoutOption([]));
      }}>
      <div
        className={showModalWindow ? 'content active' : 'content'}
        onClick={(e) => e.stopPropagation()}>
        <span
          className="exit"
          onClick={() => {
            dispatch(setShowModalWindow(false));
            dispatch(setAmountProducts(1));
            dispatch(setAdditionOption([]));
            dispatch(setWithoutOption([]));
          }}>
          ❌
        </span>
        {productsModalWindow.map((el) => (
          <div className="body">
            <img className="image" src={el.image} />
            <div className="body__content">
              <div className="title">{el.title}</div>
              {el.prices.map(
                (i) =>
                  i.size === productsSize && (
                    <div className="equipment">
                      <span>
                        {i?.volume} {i.volume && 'л '}
                      </span>
                      <span>
                        {i?.diametr} {i.diametr && 'см '}
                      </span>
                      <span>
                        {i?.weight} {i.weight && 'гр'}
                      </span>
                    </div>
                  ),
              )}
              <div className="text">{el?.text}</div>
              <div className="without">
                {el.withoutOptions?.map((k) => (
                  <div>
                    <input
                      onChange={(e) =>
                        e.target.checked
                          ? dispatch(
                              removeWithoutOptions({
                                name: k.name,
                                event: e.target.checked,
                                price: k.price,
                              }),
                            )
                          : dispatch(
                              addWithoutOptions({
                                name: k.name,
                                event: e.target.checked,
                                price: k.price,
                              }),
                            )
                      }
                      type="checkbox"
                    />
                    <span className="without__name">{k.name}</span>
                  </div>
                ))}
              </div>
              {el.prices.map((i) => (
                <span
                  className={productsSize === i.size ? 'activeSizes' : 'sizes'}
                  onClick={() =>
                    dispatch(
                      setProductsSize(
                        i.size === 'small' ? 'small' : i.size === 'middle' ? 'middle' : 'big',
                      ),
                    )
                  }>
                  {i.size === 'small' ? 'Маленький' : i.size === 'middle' ? 'Средний' : 'Большая'}
                </span>
              ))}{' '}
              <div className="additions">
                {el.additionsOptions?.map((n) => (
                  <div
                    onClick={() =>
                      n.completed === false
                        ? dispatch(addAddition({ name: n.name, price: n.price }))
                        : dispatch(removeAddition({ name: n.name, price: n.price }))
                    }
                    className={n.completed ? 'additions__body-active' : 'additions__body'}>
                    <img className="additions__image" src={n.image} />
                    <div className="additions__name">{n.name}</div>
                    <div className="additions__price">{n.price}₽</div>
                  </div>
                ))}{' '}
              </div>
              <div className="amount">
                Количество:{' '}
                <span onClick={() => dispatch(setAmountProducts(amountProducts - 1))}>➖</span>{' '}
                <span> {amountProducts} </span>{' '}
                <span onClick={() => dispatch(setAmountProducts(amountProducts + 1))}> ➕ </span>
              </div>
              <button
                onClick={() =>
                  dispatch(
                    addToCart({
                      title: el.title,
                      price:
                        el.prices.find((i) => i.size === productsSize && i.price).price *
                        amountProducts,
                      productsSize: productsSize,
                      additionOption: additionOption,
                      withoutOption: withoutOption,
                      amountProducts: amountProducts,
                    }),
                  )
                }
                className="button">
                В корзину за{' '}
                {el.prices.map((i) => i.size === productsSize && i.price * amountProducts)}₽
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
