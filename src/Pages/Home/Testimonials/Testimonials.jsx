import { useEffect, useState } from "react";
import SectionTile from "./../../../Component/SectionTitle/SectionTile";
import { Swiper, SwiperSlide } from "swiper/react";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("https://bistro-boss-server-alpha-mocha.vercel.app/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);
  // console.log(reviews);
  return (
    <section>
      <SectionTile
        subHeading={"What Our Clients Say"}
        heading={"TESTIMONIALS"}
      />

      <div>
        <Swiper
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          loop={true}
          navigation={true}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="m-24  text-center flex flex-col items-center gap-4 p-6 ">
                <Rating
                  style={{ maxWidth: 180 }}
                  value={review.rating}
                  readOnly
                />
                <p>{review.details}</p>
                <h3 className="text-2xl text-orange-400">{review.name}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
