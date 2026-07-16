import { useEffect, useState } from "react";

import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";

import {

    Autoplay,

    Pagination

} from "swiper/modules";

import "swiper/css";

import "swiper/css/pagination";

import "../styles/sponsors.css";

const API = "https://bmgum.onrender.com";

function Sponsors() {

    const [sponsors, setSponsors] = useState([]);

    const [loading, setLoading] = useState(true);

    const loadSponsors = async () => {

        try {

            const res = await axios.get(

                `${API}/api/sponsors/active`

            );

            setSponsors(res.data);

        }

        catch(err){

            console.log(err);

        }

        finally{

            setLoading(false);

        }

    };

    useEffect(()=>{

        loadSponsors();

    },[]);

    if(loading){

        return(

            <section className="sponsor-section container">

                <h2 className="title">

                    🤝 आमचे प्रायोजक

                </h2>

                <p className="loading">

                    माहिती लोड होत आहे...

                </p>

            </section>

        );

    }

    if(sponsors.length===0){

        return(

            <section className="sponsor-section container">

                <h2 className="title">

                    🤝 आमचे प्रायोजक

                </h2>

                <div className="no-sponsor">

                    सध्या कोणतेही प्रायोजक उपलब्ध नाहीत.

                </div>

            </section>

        );

    }

    return(

        <section className="sponsor-section container">

            <h2 className="title">

                🤝 आमचे प्रायोजक

            </h2>

            <Swiper

                modules={[

                    Autoplay,

                    Pagination

                ]}

                spaceBetween={20}

                slidesPerView={1}

                loop={true}

                autoplay={{

                    delay:2500,

                    disableOnInteraction:false

                }}

                pagination={{

                    clickable:true

                }}

                breakpoints={{

                    768:{

                        slidesPerView:2

                    },

                    1024:{

                        slidesPerView:3

                    }

                }}

            >
                                {

                    sponsors.map((item)=>(

                        <SwiperSlide

                            key={item.id}

                        >

                            <div className="sponsor-card">

                                <div className="logo-box">

                                    {

                                        item.logo ?

                                        (

                                            <img

                                                src={`${API}/uploads/sponsors/${item.logo}`}

                                                alt={item.sponsorName}

                                                className="sponsor-logo"

                                            />

                                        )

                                        :

                                        (

                                            <div className="logo-placeholder">

                                                🤝

                                            </div>

                                        )

                                    }

                                </div>

                                <h3>

                                    {item.sponsorName}

                                </h3>

                                <p className="company">

                                    {item.companyName}

                                </p>

                                <span

                                    className={`type ${

                                        item.sponsorType.toLowerCase()

                                    }`}

                                >

                                    {item.sponsorType} Sponsor

                                </span>

                            </div>

                        </SwiperSlide>

                    ))

                }

            </Swiper>

        </section>

    );

}

export default Sponsors;