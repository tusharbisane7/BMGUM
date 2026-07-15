import "../styles/committee.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

import PranayImg from "../assets/images/pranay.png";
import DarshanImg from "../assets/images/darshan.png";
import ManishImg from "../assets/images/manish.JPG";
import TusharImg from "../assets/images/tushar.jpg";
import VedantImg from "../assets/images/vedant.jpg";
import GopalImg from "../assets/images/gopal.jpg";

const members = [

  {
    id: 1,
    name: "प्रणय जावंजाळ",
    position: "अध्यक्ष",
    phone: "9876543210",
    image: PranayImg,
  },

  {
    id: 2,
    name: "दर्शन भागवत",
    position: "उपाध्यक्ष",
    phone: "9876543211",
    image: DarshanImg,
  },

  {
    id: 3,
    name: "मनीष लव्हाळे",
    position: "सचिव",
    phone: "9876543212",
    image: ManishImg,
  },

  {
    id: 4,
    name: "तुषार बिसने",
    position: "कोषाध्यक्ष",
    phone: "9876543213",
    image: TusharImg,
  },

  {
    id: 5,
    name: "वेदान्त गाडगे",
    position: "सहसचिव",
    phone: "9876543214",
    image: VedantImg,
  },

  {
    id: 6,
    name: "गोपाल घोडे",
    position: "व्यवस्थापक",
    phone: "9876543215",
    image: GopalImg,
  },

];

function Committee() {

  return (

    <section className="committee-section container">

      <h2 className="title">

        👥 कार्यकारिणी सदस्य

      </h2>

      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
      >

        {members.map((member) => (

          <SwiperSlide key={member.id}>

            <div className="member-card">

              <img
                src={member.image}
                alt={member.name}
              />

              <h3>{member.name}</h3>

              <span>{member.position}</span>

              <p>📞 {member.phone}</p>

            </div>

          </SwiperSlide>

        ))}

      </Swiper>

    </section>

  );

}

export default Committee;