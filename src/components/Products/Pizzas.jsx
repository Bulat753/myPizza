import s from './Pizzas.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import {
  setProductName,
} from '../../store/slices/HomeSlice/HomeSlice';
import { setProductsModalWindow,setShowModalWindow,} from '../../store/slices/CartSlice/CartSlice';
export const Products = () => {
  const { products } = useSelector((state) => state.home);
  const { search } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  return (
    <div className={s.products}>
      <div className={s.wrapper}>
        {products.pizzas
          ?.filter((i) => i.title?.toLowerCase().includes(search?.toLowerCase()))
          ?.map((el) => (
            <div className={s.body}>
              <div className={s.content}>
                <img src={el.image} />
                <div className={s.title}>{el.title}</div>
                <div className={s.text}>{el?.text}</div>
                <div className={s.price}>
                  {' '}
                  от {el.prices.map((i) => i.size === 'small' && i.price)} руб.
                </div>
                <button
                  onClick={() => {
                    dispatch(setShowModalWindow(true));
                    dispatch(
                      setProductsModalWindow(products.allProducts.filter((i) => i.id === el.id)),
                    );
                    dispatch(setProductName(el.title));
                  }}>
                  Добавить в корзину
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
