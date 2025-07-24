// import Image from "next/image";

// const TeamSection = () => {
//     return (
//         <div className="container-xxl py-5">
//             <div className="container py-5 px-lg-5">
//                 <div className="wow fadeInUp" data-wow-delay="0.1s">
//                     <p className="section-title text-secondary justify-content-center"><span></span>Our Team<span></span>
//                     </p>
//                     <h1 className="text-center mb-5">Our Team Members</h1>
//                 </div>
//                 <div className="row g-4">
//                     <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
//                         <div className="team-item bg-light rounded">
//                             <div className="text-center border-bottom p-4">
//                                 <Image className="img-fluid rounded-circle mb-4" src="/images/team-1.jpg" alt="img" height={300} width={300} />
//                                 <h5>John Doe</h5>
//                                 <span>CEO & Founder</span>
//                             </div>
//                             <div className="d-flex justify-content-center p-4">
//                                 <a className="btn btn-square mx-1" href=""><i className="fab fa-facebook-f"></i></a>
//                                 <a className="btn btn-square mx-1" href=""><i className="fab fa-twitter"></i></a>
//                                 <a className="btn btn-square mx-1" href=""><i className="fab fa-instagram"></i></a>
//                                 <a className="btn btn-square mx-1" href=""><i className="fab fa-linkedin-in"></i></a>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
//                         <div className="team-item bg-light rounded">
//                             <div className="text-center border-bottom p-4">
//                                 <Image className="img-fluid rounded-circle mb-4" src="/images/team-2.jpg" alt="img" height={300} width={300} />
//                                 <h5>Jessica Brown</h5>
//                                 <span>Web Designer</span>
//                             </div>
//                             <div className="d-flex justify-content-center p-4">
//                                 <a className="btn btn-square mx-1" href=""><i className="fab fa-facebook-f"></i></a>
//                                 <a className="btn btn-square mx-1" href=""><i className="fab fa-twitter"></i></a>
//                                 <a className="btn btn-square mx-1" href=""><i className="fab fa-instagram"></i></a>
//                                 <a className="btn btn-square mx-1" href=""><i className="fab fa-linkedin-in"></i></a>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
//                         <div className="team-item bg-light rounded">
//                             <div className="text-center border-bottom p-4">
//                                 <Image className="img-fluid rounded-circle mb-4" src="/images/team-3.jpg" alt="img" height={300} width={300} />
//                                 <h5>Tony Johnson</h5>
//                                 <span>SEO Expert</span>
//                             </div>
//                             <div className="d-flex justify-content-center p-4">
//                                 <a className="btn btn-square mx-1" href=""><i className="fab fa-facebook-f"></i></a>
//                                 <a className="btn btn-square mx-1" href=""><i className="fab fa-twitter"></i></a>
//                                 <a className="btn btn-square mx-1" href=""><i className="fab fa-instagram"></i></a>
//                                 <a className="btn btn-square mx-1" href=""><i className="fab fa-linkedin-in"></i></a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TeamSection;





import { CONFIG } from "@/configuration";
import Image from "next/image";

const TeamSection = async () => {
    let data = [];
    try {
        const res = await fetch(`${CONFIG.BackendURL}/api/team?perPage=10`, { cache: 'no-store' });
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
                        <span></span>Our Team<span></span>
                    </p>
                    <h1 className="text-center mb-5">Meet Our Experts</h1>
                </div>
                <div className="row g-4">
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <div key={item.id} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={`${0.1 + index * 0.2}s`}>
                                <div className="team-item bg-light rounded">
                                    <div className="text-center border-bottom p-4">
                                        <Image
                                            className="img-fluid rounded-circle mb-4"
                                            src={item.image ? `${CONFIG.BackendURL}/storage/${item.image}` : "/images/team-2.jpg"}
                                            alt={item.name}
                                            height={300}
                                            width={300}
                                        />
                                        <h5>{item.name}</h5>
                                        <span>{item.designation}</span>
                                    </div>
                                    <div className="d-flex justify-content-center p-4">
                                        <a className="btn btn-square mx-1" href={item.facebook} target="_blank"><i className="fab fa-facebook-f"></i></a>
                                        <a className="btn btn-square mx-1" href={item.twitter} target="_blank"><i className="fab fa-twitter"></i></a>
                                        <a className="btn btn-square mx-1" href={item.instagram} target="_blank"><i className="fab fa-instagram"></i></a>
                                        <a className="btn btn-square mx-1" href={item.linkedin} target="_blank"><i className="fab fa-linkedin-in"></i></a>

                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
                            <h5>No team member found</h5>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeamSection;

