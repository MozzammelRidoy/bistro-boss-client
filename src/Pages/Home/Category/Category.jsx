import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

import slider1 from '../../../assets/home/slide1.jpg'
import slider2 from '../../../assets/home/slide2.jpg'
import slider3 from '../../../assets/home/slide3.jpg'
import slider4 from '../../../assets/home/slide4.jpg'
import slider5 from '../../../assets/home/slide5.jpg'
import SectionTile from "../../../Component/SectionTitle/SectionTile";

const Category = () => {
  return (
    <section className="mb-24">
        
            <SectionTile heading={'Order Online'} subHeading={'Form 11pm to 10am'}/>
        
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>

        <img src={slider1} alt="" />
        <h3 className="text-4xl uppercase text-center text-white  -mt-16 pb-4">Salad</h3>

        </SwiperSlide>
        <SwiperSlide>

        <img src={slider2} alt="" />
        <h3 className="text-4xl uppercase text-center text-white  -mt-16 pb-4">Soups</h3>

        </SwiperSlide>
        <SwiperSlide>

        <img src={slider3} alt="" />
        <h3 className="text-4xl uppercase text-center text-white  -mt-16 pb-4">pizzas</h3>

        </SwiperSlide>
        <SwiperSlide>

        <img src={slider4} alt="" />
        <h3 className="text-4xl uppercase text-center text-white  -mt-16 pb-4">desserts</h3>

        </SwiperSlide>
        <SwiperSlide>

        <img src={slider5} alt="" />
        <h3 className="text-4xl uppercase text-center text-white  -mt-16 pb-4">drink</h3>

        </SwiperSlide>
        
      </Swiper>
    </section>
  );
};

export default Category;
