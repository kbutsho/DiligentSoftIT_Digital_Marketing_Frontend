// import { CONFIG } from "@/configuration";
// import Image from "next/image";

// const TestimonialSection = async () => {
//     let data = [];
//     try {
//         const res = await fetch(`${CONFIG.BackendURL}/api/testimonial?perPage=10`, { cache: 'no-store' });
//         const json = await res.json();
//         data = json.data || [];
//     } catch (error) {
//         console.log("internal server error");
//         data = [];
//     }

//     return (
//         <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
//             <div className="container py-5 px-lg-5">
//                 <p className="section-title text-secondary justify-content-center">
//                     <span></span>Testimonial<span></span>
//                 </p>
//                 <h1 className="text-center mb-5">What Say Our Clients!</h1>
//                 <div className="owl-carousel testimonial-carousel">
//                     {data.length > 0 ? (
//                         data.map((item, index) => (
//                             <div key={index} className="testimonial-item bg-light rounded my-4" style={{ minHeight: "220px" }}>
//                                 <p className="fs-5">
//                                     <i className="fa fa-quote-left fa-4x text-primary mt-n4 me-3"></i>
//                                     {item.message || "No testimonial message."}
//                                 </p>
//                                 <div className="d-flex align-items-center">
//                                     <Image
//                                         className="img-fluid flex-shrink-0 rounded-circle"
//                                         style={{ width: "65px", height: "65px" }}
//                                         src={item.image ? `${CONFIG.BackendURL}/storage/${item.image}` : "/images/testimonial-1.jpg"}
//                                         alt={item.name || "Client"}
//                                         width={65}
//                                         height={65}
//                                     />
//                                     <div className="ps-4">
//                                         <h5 className="mb-1">{item.name || "Client Name"}</h5>
//                                         <span>{item.profession || "Profession"}</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
//                             <h5>No testimonial found</h5>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TestimonialSection;



"use client";

import { CONFIG } from "@/configuration";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';



const TestimonialSection = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${CONFIG.BackendURL}/api/testimonial?perPage=10`);
                setData(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);
    const responsiveSettings = [
        {
            breakpoint: 1140,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 960,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 720,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 540,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 300,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ];
    return (
        <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
            <div className="container py-5 px-lg-5">
                <p className="section-title text-secondary justify-content-center">
                    <span></span>Testimonial<span></span>
                </p>
                <h1 className="text-center mb-5">What Say Our Clients!</h1>

                <Swiper
                    spaceBetween={20}
                    slidesPerView={2}
                    loop
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 2,
                        },
                    }}
                    modules={[Autoplay]}
                >
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <SwiperSlide key={index} className="col-md-6 col-12 testimonial-item bg-light rounded my-4 p-3" style={{ minHeight: "250px" }}>
                                <p className="fs-5">
                                    <i className="fa fa-quote-left fa-4x text-primary mt-n4 me-3"></i>
                                    {item.message || "No testimonial message."}
                                </p>
                                <div className="d-flex align-items-center">
                                    <Image
                                        className="img-fluid flex-shrink-0 rounded-circle"
                                        style={{ width: "65px", height: "65px" }}
                                        src={item.image ? `${CONFIG.BackendURL}/storage/${item.image}` : "/images/testimonial-1.jpg"}
                                        alt={item.name || "Client"}
                                        width={65}
                                        height={65}
                                    />
                                    <div className="ps-4">
                                        <h5 className="mb-1">{item.name || "Client Name"}</h5>
                                        <span>{item.profession || "Profession"}</span>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    ) : (
                        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
                            <h5>No testimonial found</h5>
                        </div>
                    )}
                </Swiper>
            </div>
        </div>
    );
};

export default TestimonialSection;


