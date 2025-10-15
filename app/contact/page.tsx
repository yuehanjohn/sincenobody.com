"use client";

import React from "react";

import { Card, CardBody } from "@heroui/react";
import { FaChevronRight } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaRegCalendarPlus, FaWhatsapp } from "react-icons/fa";
import { SiGooglemeet } from "react-icons/si";

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen h-fit justify-center items-center bg-background z-30 pt-[100px]">
      <div className=" flex flex-col w-full h-fit lg:flex-row lg:flex-nowrap flex-wrap p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
        <div className="flex-1 mb-8 sm:mb-10 md:mb-12 lg:mb-16 gap-4 sm:gap-6 md:gap-8 flex flex-col">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight">
            However works for you
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            Let's not waste any time.
          </p>
        </div>

        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          <div className="flex flex-row gap-2">
            <Card
              className="flex-1 min-w-0"
              isHoverable
              isPressable
              onPress={() =>
                window.open(
                  "https://calendar.app.google/6s3JjxNhkb5ppTe56",
                  "_blank"
                )
              }
            >
              <CardBody className=" p-3 sm:p-4 md:p-5 lg:p-6 justify-center items-center">
                <div className="flex flex-col items-center gap-2">
                  <SiGooglemeet size={30} className="text-primary" />
                  <p className="text-tiny text-primary/60">Book a call</p>
                </div>
              </CardBody>
            </Card>
            <Card
              className="flex-1 min-w-0"
              isHoverable
              isPressable
              onPress={() =>
                window.open("https://www.linkedin.com/in/yuehanjohn/", "_blank")
              }
            >
              <CardBody className=" p-3 sm:p-4 md:p-5 lg:p-6 justify-center items-center">
                <div className="flex flex-col items-center gap-2">
                  <FaLinkedinIn size={30} className="text-foreground" />
                  <p className="text-tiny text-foreground/60">LinkedIn</p>
                </div>
              </CardBody>
            </Card>
            <Card
              className="flex-1 min-w-0"
              isHoverable
              isPressable
              onPress={() =>
                window.open("https://wa.me/358403633893", "_blank")
              }
            >
              <CardBody className=" p-3 sm:p-4 md:p-5 lg:p-6 justify-center items-center">
                <div className="flex flex-col items-center gap-2">
                  <FaWhatsapp size={30} className="text-foreground" />
                  <p className="text-tiny text-foreground/60">WhatsApp</p>
                </div>
              </CardBody>
            </Card>
          </div>

          <Card
            isHoverable
            isPressable
            className="w-full"
            onPress={() => window.open("mailto:yuehan.dai.john@gmail.com")}
          >
            <CardBody className="flex flex-col p-3 sm:p-4 md:p-5 lg:p-6">
              <h2 className="text-sm sm:text-base md:text-lg">Email</h2>
              <div className="flex flex-row justify-between items-center gap-2">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl break-all sm:break-normal">
                  yuehan.dai.john@gmail.com
                </p>
                <FaChevronRight className="text-xs sm:text-sm md:text-base text-foreground flex-shrink-0" />
              </div>
            </CardBody>
          </Card>

          <Card
            isHoverable
            isPressable
            className="w-full"
            onPress={() => window.open("tel:+358403633893")}
          >
            <CardBody className="flex flex-col p-3 sm:p-4 md:p-5 lg:p-6">
              <h2 className="text-sm sm:text-base md:text-lg">Talk now</h2>
              <div className="flex flex-row justify-between items-center gap-2">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                  +358 040 3633 893
                </p>
                <FaChevronRight className="text-xs sm:text-sm md:text-base text-foreground flex-shrink-0" />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
