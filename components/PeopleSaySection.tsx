import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Image,
  User,
  Tabs,
  Tab,
} from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";

// Easily editable JSON-style array
const peopleSayData = [
  {
    name: "John Smith",
    role: "CEO of Tech Innovations",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    text: "John is an exceptional developer—fast, creative, and always delivers beyond expectations. Highly recommended!",
    image: "/assets/images/dev.jpg",
  },
  {
    name: "Jane Doe",
    role: "Product Designer",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    text: "Jane's design skills transformed our product. Her attention to detail is unmatched.",
    image: "/assets/images/dev.jpg",
  },
  {
    name: "Alex Turner",
    role: "Lead Engineer",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    text: "Alex's technical leadership and mentorship made our team stronger and more efficient.",
    image: "/assets/images/dev.jpg",
  },
];

export default function PeopleSaySection() {
  const [selected, setSelected] = useState(0);
  const current = peopleSayData[selected];

  return (
    <section className="flex flex-col w-full min-h-screen bg-background relative z-0 justify-center items-center px-4 md:px-8 lg:px-16">
      <div className="font-bold text-xl md:text-3xl lg:text-4xl text-center z-20 w-full h-[64px] md:h-[100px] flex justify-center items-center">
        <div>People say</div>
      </div>
      <Card
        className="w-full md:h-[80vh] h-fit overflow-hidden"
        key="card4"
        isBlurred
      >
        <div
          className="left-0 top-0 h-full w-[30%] z-40"
          style={{
            width: "30%",
            height: "100vh",
            zIndex: 40,
            background: "linear-gradient(to left, transparent, black)",
            position: "absolute",
          }}
        />
        <div
          className="right-0 top-0 h-full w-[30%] z-40"
          style={{
            width: "30%",
            height: "100vh",
            zIndex: 40,
            background: "linear-gradient(to right, transparent, black)",
            position: "absolute",
          }}
        />
        <Image
          alt="People say background"
          height="100%"
          width="100%"
          className="z-0 w-full h-full object-cover"
          src={current.image}
        />
        <div className="absolute top-[10%] left-[2%] md:top-[20%] md:left-[5%] z-50 w-fit h-fit">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="max-w-xs md:max-w-md lg:max-w-lg bg-transparent shadow-none">
                <CardHeader className="flex flex-col items-start">
                  <h1 className="text-lg md:text-2xl lg:text-4xl font-bold">
                    “ {current.text} ”
                  </h1>
                </CardHeader>
                <CardBody>
                  <div className="flex flex-row gap-2 text-base md:text-lg lg:text-2xl">
                    <span>{current.name}</span>
                    <span className="text-foreground/40">{current.role}</span>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
        <CardFooter className="absolute bottom-0 left-0 w-full bg-transparent m-4 md:m-8 lg:m-16 z-50">
          <Tabs
            aria-label="Options"
            classNames={{
              tabList: "gap-6 w-full",
              cursor: "w-full bg-background/20 backdrop-blur-md ",
              tab: "max-w-fit px-0 h-fit bg-transparent backdrop-blur-md",
              tabContent: "group-data-[selected=true]:opacity-100",
            }}
            variant="light"
            color="primary"
            selectedKey={selected}
            onSelectionChange={(key) => setSelected(Number(key))}
          >
            {peopleSayData.map((person, idx) => (
              <Tab
                key={idx}
                title={
                  <div className="bg-transparent p-4">
                    <User
                      avatarProps={{ src: person.avatar }}
                      description={person.role}
                      name={person.name}
                    />
                  </div>
                }
              />
            ))}
          </Tabs>
        </CardFooter>
      </Card>
    </section>
  );
}
