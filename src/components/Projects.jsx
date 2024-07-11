import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel, EffectFade, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { app } from "../firebase/client";
import { doc, getFirestore } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { useState, useEffect } from "react";

export function Projects() {
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
  const popUpVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      right: "10px",
      transition: {
        duration: 0.1,
        delay: 0.1,
        ease: "easeIn",
      },
    },
  };
  if (text.length === 0) {
    return (
      <div className="poggi h-24">
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
            key={item.name+item.date} 
            className="w-full select-none">
              <a href={item.link}>
                <motion.div
                  initial="hidden"
                  whileHover="visible"
                  className="bg-slider flex flex-col justify-center rounded-xl h-48 md:h-40 antialiased text-left space-y-1 font-poppins hover:cursor-pointer"
                >
                  <h1 className="font-bold text-xl md:text-2xl ">
                    {item.name}
                  </h1>
                  <h2 className="text-md font-light md:text-xl">{item.date}</h2>
                  <p className="text-sm font-medium md:text-base">
                    {item.description}
                  </p>
                  <motion.div
                    className=" bg-zinc-200 font-light text-md right-0 fixed flex justify-center items-center p-2 w-24 text-center font-poppins h-full rounded-2xl"
                    variants={popUpVariant}
                  >
                    Visit ↗️
                  </motion.div>
                </motion.div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
        <div id="swiper-custom-pagination" className="" />
      </div>
    );
  }
  return (
    <div >
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
        {text.map((item) => (
          <SwiperSlide 
          key={item.name+item.date}
          className="w-full">
            <a href={item.link}>
              <motion.div
                initial="hidden"
                whileHover="visible"
                className=" bg-orange-100 flex flex-col justify-center items-start rounded-xl antialiased text-left space-y-1 font-poppins hover:cursor-pointer p-4 tracking-wide h-48 md:h-40"
              >
                <h1 className="font-bold text-xl md:text-2xl ">{item.name}</h1>
                <h2 className="text-md font-light md:text-xl">{item.date}</h2>
                <p className="text-sm font-medium md:text-base">
                  {item.description}
                </p>
                <motion.div
                  className=" bg-zinc-200 font-light text-md right-0 fixed flex justify-center items-center p-2 w-24 text-center font-poppins h-full rounded-2xl"
                  variants={popUpVariant}
                >
                  Visit ↗️
                </motion.div>
              </motion.div>
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
