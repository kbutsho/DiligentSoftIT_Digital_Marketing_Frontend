import Image from 'next/image';
import { CONFIG } from "@/configuration";

const ProjectSection = async () => {
    let data = [];
    try {
        const res = await fetch(`${CONFIG.BackendURL}/api/project?perPage=10`, { cache: 'no-store' });
        const json = await res.json();
        data = json.data || [];
    } catch (error) {
        console.log(error)
        data = [];
    }

    return (
        <div className="container-xxl py-5">
            <div className="container py-5 px-lg-5">
                <div className="wow fadeInUp" data-wow-delay="0.1s">
                    <p className="section-title text-secondary justify-content-center"><span></span>Our
                        Projects<span></span></p>
                    <h1 className="text-center mb-5">Recently Completed Projects</h1>
                </div>

                {data.length === 0 ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
                        <h5>No Project found</h5>
                    </div>
                ) : (
                    <div className="row g-4 portfolio-container">
                        {data.map((project, index) => (
                            <div
                                key={project.id || index}
                                className={`col-lg-4 col-md-6 portfolio-item ${index % 2 === 0 ? 'first' : 'second'} wow fadeInUp`}
                                data-wow-delay={`${(index % 3) * 0.2 + 0.1}s`}
                            >
                                <div className="rounded overflow-hidden">
                                    <div className="position-relative overflow-hidden">
                                        <Image
                                            className="img-fluid w-100"
                                            src={project.image ? `${CONFIG.BackendURL}/storage/${project.image}` : "/images/portfolio-4.jpg"}
                                            alt={project.title || 'Project Image'}
                                            width={300}
                                            height={300}
                                        />
                                        <div className="portfolio-overlay">
                                            <span className="btn btn-square btn-outline-light mx-1" data-lightbox="portfolio">
                                                <i className="fa fa-eye"></i>
                                            </span>

                                            <a className="btn btn-square btn-outline-light mx-1" href={project.link || '/'}>
                                                <i className="fa fa-link"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="bg-light p-4">
                                        <p className="text-primary fw-medium mb-2">{project.name || 'Design & Development'}</p>
                                        <h5 className="lh-base mb-0">{project.title || 'Untitled Project'}</h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectSection;
