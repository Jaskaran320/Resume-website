import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel, EffectFade, Autoplay } from "swiper/modules";
import { app } from "../firebase/client";
import { doc, getFirestore } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import infoicon from "../images/info-icon.svg";
import axios from "axios";
import { useState, useEffect } from "react";

export function Projects() {
  useEffect(() => {
    const fetchAndLog = async () => {
      try {
        const ipResponse = await axios.get("https://api.ipify.org?format=json");
        const ip = ipResponse.data.ip;
        await axios.post("/spf", {}, {
          headers: {
            'X-Forwarded-For': ip
          }
        });
      } catch (error) { }
    };

    fetchAndLog();
  }, []);

  const placeholder = [
    {
      name: "Loading...",
      date: "Loading...",
      description: "Loading...",
      link: "Loading...",
    },
  ];
  const [text, setText] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(app);
      const response = await getDoc(
        doc(db, "Projects", "resume-projects")
      );
      setText(response.data().projects);
    };
    fetchData();
  }, []);

  if (text.length === 0) {
    return (
      <div>
        <Swiper
          onInit={(swiper) => swiper.slideToLoop(0, 0)}
          modules={[Pagination, Mousewheel, EffectFade, Autoplay]}
          autoplay={{
            delay: 7000,
            disableOnInteraction: false,
          }}
          loop={true}
          spaceBetween={30}
          effect={"fade"}
          pagination={{
            clickable: true,
            el: "#swiper-custom-pagination",
          }}
          mousewheel={true}
        >
          {placeholder.map((item) => (
            <SwiperSlide
              key={item.name + item.date}
              className="w-full select-none"
            >
              <a href={item.link}>
                <div
                style={{backgroundColor: '#D1D6F0'}} 
                  className="bg-orange-100 flex flex-col justify-center rounded-xl h-48 md:h-40 antialiased text-left space-y-1 font-poppins hover:cursor-pointer">
                  <h1 className="font-bold text-xl md:text-2xl ">
                    {item.name}
                  </h1>
                  <h2 className="text-md font-light md:text-xl">{item.date}</h2>
                  <p className="text-xs font-medium md:text-base">
                    {item.description}
                  </p>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
        <div id="swiper-custom-pagination" className="" />
      </div>
    );
  }
  return (
    <div>
      <Swiper
        onInit={(swiper) => swiper.slideToLoop(0, 0)}
        modules={[Pagination, Mousewheel, EffectFade, Autoplay]}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        loop={true}
        effect={"fade"}
        pagination={{
          clickable: true,
          el: "#swiper-custom-pagination",
        }}
        mousewheel={true}
      >
        {text.map((item) => (
          <SwiperSlide key={item.name + item.date} className="w-full">
            <a href={item.link}>
              <div style={{backgroundColor: '#D1D6F0'}}
              className=" flex flex-col justify-center items-start rounded-xl antialiased text-left space-y-1 font-poppins hover:cursor-pointer p-4 tracking-wide h-56 md:h-40">
                <h1 className="font-bold w-full text-xl md:text-2xl flex items-start justify-between">
                  <div>{item.name}</div>
                  <div className = "hidden md:flex text-xs md:text-xs text-text opacity-75 items-center justify-around"><img src = {infoicon.src} className="w-3 h-3 mx-2"/>Click to visit</div>
                </h1>
                <h2 className="text-md font-light md:text-xl">{item.date}</h2>
                <p className="text-sm font-medium md:text-base">
                  {item.description}
                </p>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        id="swiper-custom-pagination"
        className="flex items-center space-x-1 justify-center my-4"
      />
    </div>
  );
}
