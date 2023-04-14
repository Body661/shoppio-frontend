import {useState} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import "swiper/css/bundle"
import {Autoplay, Navigation, Pagination, Scrollbar, A11y, EffectFade} from 'swiper';

import previous from "../../imgs/Icons/previous.png";
import next from "../../imgs/Icons/next.png";

import ramadan from "../../imgs/Slider/ramadan-sweaters.png";
import school from "../../imgs/Slider/back-to-school.png";
import discount25 from "../../imgs/Slider/25off.png";

const Slider = () => {
    const [swiperRef, setSwiperRef] = useState(null);

    const prevHandler = () => {
        swiperRef.slidePrev();
    };

    const nextHandler = () => {
        swiperRef.slideNext();
    };


    return (
        <div className="slider">
            <img onClick={prevHandler} src={previous} alt="Previous" className="slider-arrow-prev"/>
            <img onClick={nextHandler} src={next} alt="Next" className="slider-arrow-next"/>

            <Swiper
                modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y, EffectFade]}
                effect="fade"
                spaceBetween={50}
                slidesPerView={1}
                loop={true}
                autoplay={{stopOnLastSlide: false, delay: 5000, disableOnInteraction: false}}
                lazy={true}
                onSwiper={(swiper) => setSwiperRef(swiper)}
            >
                <SwiperSlide>
                    <div>
                        <img
                            style={{width: "100%", display: "block"}}
                            src={ramadan}
                            alt="First slide"
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <img
                            style={{width: "100%", display: "block"}}
                            src={discount25}
                            alt="Second slide"
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <img
                            style={{width: "100%", display: "block"}}
                            src={school}
                            alt="Third slide"
                        />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Slider

