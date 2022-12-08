import React from 'react';
import s from './Search.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setSearch } from '../../store/slices/FilterSlice/FilterSlice';

export const Search = () => {
  const { search } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  return (
    <div className={s.search}>
      <div className={s.wrapper}>
        <div className={s.body}>
          <input
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            placeholder="Найти продукт из списка"
          />
          {search.length !== 0 && <span onClick={() => dispatch(setSearch(''))}>❌</span>}
        </div>
      </div>
    </div>
  );
};
