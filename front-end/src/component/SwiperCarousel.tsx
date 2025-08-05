import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import type { IconName } from '@fortawesome/fontawesome-svg-core';


import Datas from "../json/swiperData.json";

library.add(fas);

type swiperDone ={
  carouselItemDone : number[],
  handleAlertFrame : (arg :number) => void 
}

const SwiperCarousel :React.FC<swiperDone>= ({handleAlertFrame , carouselItemDone}) => {


  // const [isDone, setIsDone] = useState(false);

 
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={2.8}
      allowSlidePrev={true}
      allowSlideNext={true}
      modules={[Pagination, Navigation]}
      navigation={{
        nextEl: '.icon_next',
        prevEl: '.icon_prev',
      }}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}>
      {Datas.map((item, index) => {

        return (<SwiperSlide>
          <div className={`card_container ${carouselItemDone[index]?"done":""}`} onClick={()=>handleAlertFrame(index)}>
            <div className="card_top_icon">
              <FontAwesomeIcon icon={['fas', item.swiper_icon as IconName]} />
            </div>
            <div className="card_bottom">
              <div className="card_text">
                <div className="num_dec_container"><div className="num_dec">{index + 1}</div><h3>{item.swiper_title}</h3></div>
                <p>{item.swiper_inner}</p>
              </div>

              {carouselItemDone[index]? 
                <div className="card_status">
                  <div className="icon"><FontAwesomeIcon icon={['fas', "check"]} /></div>
                  <p className="text">編輯完成</p>
                </div>
                :
                <div className="card_status false">
                  <div className="icon"><FontAwesomeIcon icon={['fas', "circle-notch"]} /></div>
                  <p className="text">等待編輯</p>
                </div>
              }

            </div>
          </div>
        </SwiperSlide>)
      })}


    </Swiper>

  )
}

export default SwiperCarousel;