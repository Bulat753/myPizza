import React from 'react';
import './CartModalWindow.css';
import cartModalWindowImage from '../../images/cartModalWindowImage.png';
import { useSelector, useDispatch } from 'react-redux';
import { setShowCartModalWindow } from '../../store/slices/CartSlice/CartSlice';
export const CartModalWindow = () => {
  const { showCartModalWindow } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <div
      className={showCartModalWindow ? 'modal active' : 'modal'}
      onClick={() => dispatch(setShowCartModalWindow(false))}>
      <div
        className={showCartModalWindow ? 'content active' : 'content'}
        onClick={(e) => e.stopPropagation()}>
        <span className="exit" onClick={() => dispatch(setShowCartModalWindow(false))}>
          ❌
        </span>
        <div className="bodyCartModalWindow">
          <div className="titleCartModalWindow"> Спасибо!</div>
          <div className="textCartModalWindow">
            Наш менеджер свяжется с Вами в ближайшее время,ожидайте звонка.
          </div>
          <img className="imageCartModalWindow" src={cartModalWindowImage} />
          <button
            onClick={() => dispatch(setShowCartModalWindow(false))}
            className="buttonCartModalWindow">
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
