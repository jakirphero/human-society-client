import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
const History = () => {
    return (
        <div className='w-full mt-20 mx-auto h-[250px]'>
            <Swiper
                modules={[Autoplay]}
                spaceBetween={30}
                slidesPerView={4}
                autoplay={{ delay: 3000 }}
                loop={true}
            >
                <SwiperSlide>
                    <img src="https://www.w3schools.com/html/pic_trulli.jpg" alt="Slide 1" className="w-[600px] h-[250px] object-cover" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://www.w3schools.com/html/img_girl.jpg" alt="Slide 2" className="w-[600px] h-[250px] object-cover" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://www.w3schools.com/html/img_chania.jpg" alt="Slide 3" className="w-[600px] h-[250px] object-cover" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://www.w3schools.com/html/pic_trulli.jpg" alt="Slide 4" className="w-[600px] h-[250px] object-cover" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://www.w3schools.com/html/img_girl.jpg" alt="Slide 5" className="w-[600px] h-[250px] object-cover" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://www.w3schools.com/html/img_chania.jpg" alt="Slide 6" className="w-[600px] h-[250px] object-cover" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default History;