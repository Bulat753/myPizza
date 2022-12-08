import React from 'react';
import s from './Carousel.module.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import slider1 from '../../images/slider1.png';
import slider2 from '../../images/slider2.png';
import slider3 from '../../images/slider3.png';

export const Carousel = () => {
  const slider = [
    {
      title: 'День рождения!',
      text: 'Купи пиццу в день рождения на 1000 рублей и получи в подарок столько пицц сколько тебе лет!!!',
      img: slider1,
    },
    {
      title: 'Сытый понедельник',
      text: 'По понедельникам скидка на всю пиццу 50%',
      img: slider2,
    },
    {
      title: 'На массе!',
      text: 'Заказывай у нас пиццу 30 дней подряд и получи в подарок годовой абонемент в тренажерный зал!',
      img: slider3,
    },
  ];
  return (
    <div className={s.stock}>
      <div className={s.wrapper}>
        <div className={s.title}>Акции:</div>
        <div className={s.slider}>
          <Slider
            dots={true}
            autoplay={true}
            autoplaySpeed={5000}
            infinite={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}>
            {slider.map((el) => (
              <>
                <img src={el.img} />
                <div className={s.slider__title}>{el.title}</div>
                <div className={s.slider__text}>{el.text}</div>
              </>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};
