// "use client"

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { CONFIG } from '@/configuration';

// const ServiceSection = () => {
//     const [loading, setLoading] = useState(false);
//     const [data, setData] = useState([]);

//     const fetchData = async () => {
//         try {
//             setLoading(true);
//             const response = await axios.get(`${CONFIG.API}/service?perPage=10`);
//             setData(response.data.data);
//         } catch (error) {
//             // toast.error("Internal server error");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     return (
//         <div className="container-xxl py-5">
//             <div className="container py-5 px-lg-5">
//                 <div className="wow fadeInUp" data-wow-delay="0.1s">
//                     <p className="section-title text-secondary justify-content-center">
//                         <span></span>Our Services<span></span>
//                     </p>
//                     <h1 className="text-center mb-5">What Solutions We Provide</h1>
//                 </div>

//                 {loading ? (
//                     <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
//                         <div className="spinner-grow text-primary" style={{ width: "3rem", height: "3rem" }} role="status">
//                             <span className="sr-only">Loading...</span>
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="row g-4">
//                         {data.length > 0 ? (
//                             data.map((item, index) => (
//                                 <div key={item.id || index} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={`${0.1 + index * 0.2}s`}>
//                                     <div className="service-item d-flex flex-column text-center rounded" style={{ minHeight: "350px" }}>
//                                         <div className="service-icon flex-shrink-0">
//                                             <i className={`${item.icon} fa-2x`}></i>
//                                         </div>
//                                         <h5 className="mb-3">{item.title}</h5>
//                                         <p className="m-0">{item.description}</p>
//                                         <a className="btn btn-square" href="#"><i className="fa fa-arrow-right"></i></a>
//                                     </div>
//                                 </div>
//                             ))
//                         ) : (
//                             <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
//                                 <h5>No Service found</h5>
//                             </div>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ServiceSection;


import { CONFIG } from "@/configuration";

const ServiceSection = async () => {
    let data = [];
    try {
        const res = await fetch(`${CONFIG.API}/service?perPage=10`, { cache: 'no-store' });
        const json = await res.json();
        data = json.data || [];
    } catch (error) {
        console.log("internal server error")
        data = [];
    }
    return (
        <div className="container-xxl py-5">
            <div className="container py-5 px-lg-5">
                <div className="wow fadeInUp" style={{ visibility: "visible", animationDelay: "0.1s", animationName: "fadeInUp" }}>
                    <p className="section-title text-secondary justify-content-center">
                        <span></span>Our Services<span></span>
                    </p>
                    <h1 className="text-center mb-5">What Solutions We Provide</h1>
                </div>
                <div className="row g-4">
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <div
                                key={item.id}
                                className="col-lg-4 col-md-6 wow fadeInUp"
                                style={{ visibility: "visible", animationDelay: `${0.1 + index * 0.2}s`, animationName: "fadeInUp" }}>
                                <div className="service-item d-flex flex-column text-center rounded" style={{ minHeight: "350px" }}>
                                    <div className="service-icon flex-shrink-0">
                                        <i className={`${item.icon} fa-2x`}></i>
                                    </div>
                                    <h5 className="mb-3">{item.title}</h5>
                                    <p className="m-0">{item.description}</p>
                                    <a className="btn btn-square" href="#">
                                        <i className="fa fa-arrow-right"></i>
                                    </a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
                            <h5>No Service found</h5>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ServiceSection;


