import React from 'react';
import { handlerBlur, valueChange } from '../../store/slices/CartSlice/CartSlice';
import s from './OrderDetails.module.scss';
import { useDispatch } from 'react-redux';
export const OrderDetails = ({ text, placeholder, type, value, dirty, error }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <input
        value={value}
        name={text}
        onBlur={(e) => dispatch(handlerBlur({ event: e.target.value, text: text, value: value }))}
        onChange={(e) => dispatch(valueChange({ event: e.target.value, text: text, value: value }))}
        placeholder={placeholder}
        type={type}
        className={s.input}
      />
      {dirty && <div style={{ color: 'red', fontSize: '13px ' }}>{error}</div>}
    </div>
  );
};
