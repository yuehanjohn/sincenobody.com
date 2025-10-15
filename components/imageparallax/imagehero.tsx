import { ReactLenis } from "lenis/dist/lenis-react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { SiSpacex } from "react-icons/si";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { useRef } from "react";
import { Card, CardBody, CardHeader, Image } from "@heroui/react";
import Counter from "@/components/text/counter";
import { getLinesOfCodes, getDrankedCoffee } from "@/hooks/math";
import { FaCircle } from "react-icons/fa6";

const SECTION_HEIGHT = 1100;

export const ImageHero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage />

      <ParallaxImages />

      <div className="absolute bottom-0 left-0 right-0 h-96  from-zinc-950/0 to-zinc-950" />
    </div>
  );
};
const CenterImage = () => {
  // Get the current scroll position (vertical)
  const { scrollY } = useScroll();

  // Calculate when the 3rd section (ParallaxImages) is in view
  // Each section is roughly SECTION_HEIGHT tall, so trigger at 2 * SECTION_HEIGHT
  const triggerStart = 1.5 * SECTION_HEIGHT;
  const triggerEnd = triggerStart + 1500;

  // Map scroll position to polygon clip path coordinates
  const clip1 = useTransform(scrollY, [triggerStart, triggerEnd], [25, 0]);
  const clip2 = useTransform(scrollY, [triggerStart, triggerEnd], [75, 100]);

  // Create a dynamic CSS clip-path polygon string
  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  // Animate background image size (zoom out effect)
  const backgroundSize = useTransform(
    scrollY,
    [triggerStart, triggerEnd + 500],
    ["170%", "100%"]
  );
  // Animate opacity (fade out effect)
  const opacity = useTransform(scrollY, [triggerEnd, triggerEnd + 500], [1, 0]);

  return (
    // Render a sticky, full-screen div with animated styles
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage: "url(/assets/images/speechtest.png)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};
//

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        alt="Written code"
        start={-200}
        end={200}
        className="w-1/2 md:w-1/3"
      >
        <Card className="shadow-lg bg-background/30" isBlurred>
          <CardHeader className="gap-2">
            <FaCircle className="text-accent" />
            <h3 className="text-base md:text-xl lg:text-2xl font-bold">
              Contributed project
            </h3>
          </CardHeader>
          <CardBody className="pt-0">
            <span className="text-2xl md:text-4xl font-bold text-foreground gap-2">
              <Counter targetValue={20} />+<span className="ml-1"></span>
            </span>
          </CardBody>
        </Card>
      </ParallaxImg>
      <ParallaxImg
        src="assets/images/award.jpg"
        alt="An example of a space launch"
        start={200}
        end={-250}
        className="mx-auto w-3/4 md:w-2/3"
      />

      <ParallaxImg
        alt="Written code"
        start={-200}
        end={200}
        className="ml-auto w-1/2 md:w-1/3"
      >
        <Card className="shadow-lg bg-background/30" isBlurred>
          <CardHeader className="gap-2">
            <FaCircle className="text-accent" />
            <h3 className="text-base md:text-xl lg:text-2xl font-bold">
              Written code
            </h3>
          </CardHeader>
          <CardBody className="pt-0">
            <span className="text-2xl md:text-4xl font-bold text-foreground gap-2">
              <Counter targetValue={getLinesOfCodes()} />+
              <span className="ml-1">Lines</span>
            </span>
          </CardBody>
        </Card>
      </ParallaxImg>

      <ParallaxImg
        alt="Written code"
        start={0}
        end={-500}
        className="ml-8 md:ml-24 w-2/3 md:w-5/12"
      >
        <Card className="shadow-lg bg-background/30" isBlurred>
          <CardHeader className="gap-2">
            <FaCircle className="text-accent" />
            <h3 className="text-base md:text-xl lg:text-2xl font-bold">
              Consumed Coffee
            </h3>
          </CardHeader>
          <CardBody className="pt-0">
            <span className="text-2xl md:text-4xl font-bold text-foreground gap-2">
              <Counter targetValue={getDrankedCoffee()} />+
              <span className="ml-1">Cups</span>
            </span>
          </CardBody>
        </Card>
      </ParallaxImg>
    </div>
  );
};

const ParallaxImg = ({
  className,
  alt,
  src,
  start,
  end,
  children,
}: {
  className?: string;
  alt?: string;
  src?: string;
  start: number;
  end: number;
  children?: React.ReactNode;
}) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    // @ts-ignore
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.div className={className} ref={ref} style={{ transform, opacity }}>
      {children ? children : src ? <img src={src} alt={alt} /> : null}
    </motion.div>
  );
};

import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useState, useId, useEffect } from "react";
import ExpandableCardModal from "@/components/ExpandableCardModal";
import CardList from "@/components/CardList";
import { Card as ExpandCard } from "@/components/CardList";

export const Work = () => {
  const [active, setActive] = useState<ExpandCard | boolean | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }
    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <section
      id="work"
      className="mx-auto max-w-full px-2 md:px-4 py-24 md:py-48 min-h-screen flex flex-col justify-center items-center"
    >
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-10 md:mb-20 text-2xl md:text-4xl font-black uppercase text-center"
      >
        <div className="mt-10 md:mt-20">
          <span
            className="flex-none font-bebas m-0 p-0"
            style={{
              fontSize: "min(32px, 8vw)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              padding: 0,
              lineHeight: 1,
              letterSpacing: 0,
              verticalAlign: "middle",
              fontFeatureSettings: "liga",
              maxWidth: "100%",
              display: "inline-block",
              position: "relative",
            }}
          >
            Works
            <span
              style={{
                position: "absolute",
                left: "50%",
                top: "60%",
                transform: "translate(-50%, -50%) rotate(-10deg)",
                width: "100%",
                height: "20px",
                background:
                  "linear-gradient(180deg, background 0%, transparent 100%)",
                zIndex: 2,
                pointerEvents: "none",
                opacity: 1,
                filter: "blur(2px)",
                WebkitMaskImage: `
              linear-gradient(180deg, background 0%, transparent 100%),
              linear-gradient(to right, transparent 0%, background 20%, background 80%, transparent 100%)
            `,
                maskImage: `
              linear-gradient(180deg, background 0%, transparent 100%),
              linear-gradient(to right, transparent 0%, background 20%, background 80%, transparent 100%)
            `,
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in",
              }}
            />
          </span>
          <h1 className="text-base">Check Linkedin for latest status</h1>
        </div>
      </motion.h1>
      <ExpandableCardModal
        active={active}
        id={id}
        refObj={ref}
        onClose={() => setActive(null)}
      />
      <CardList cards={cards} id={id} onCardClick={setActive} />
    </section>
  );
};

const cards: ExpandCard[] = [
  {
    description:
      " I bridged business strategy and hands-on technical leadership to launch and scale best-in-class AI products—from concept to market impact—while building a collaborative team culture.",
    title: "Fucard",
    src: "assets/images/fucard.png",
    ctaText: "Visit",
    ctaLink: "https://fucard.github.io/",
    content: () => (
      <p>
        Technical Architecture: Designed and developed scalable full-stack
        solutions, leveraging the latest technologies in AI, cloud, and secure
        software architecture.
        <br />
        <br />
        Product Strategy: Defined and executed product roadmaps, aligning
        technical capabilities with business goals to deliver innovative AI
        solutions that drive user engagement and satisfaction.
        <br />
        <br />
        End-to-End Product Management: Led all stages of product
        development—including ideation, technical design, implementation,
        deployment, and scaling—ensuring rapid validation and continuous
        improvement.
        <br />
        <br />
        Team Building & Culture: Recruited, grew, and managed a high-performance
        multidisciplinary team focused on collaboration, creative
        problem-solving, and fast iteration.
        <br />
        <br />
        Business Development: Built strong relationships with partners, clients,
        and stakeholders to drive business growth, identify market
        opportunities, and expand Fucard’s reach within the tech ecosystem.
      </p>
    ),
  },
  {
    description: "Babbu Maan",
    title: "Mitran Di Chhatri",
    src: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
    ctaText: "Visit",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => (
      <p>
        Babu Maan, a legendary Punjabi singer, is renowned for his soulful voice
        and profound lyrics that resonate deeply with his audience. Born in the
        village of Khant Maanpur in Punjab, India, he has become a cultural icon
        in the Punjabi music industry. <br /> <br /> His songs often reflect the
        struggles and triumphs of everyday life, capturing the essence of
        Punjabi culture and traditions. With a career spanning over two decades,
        Babu Maan has released numerous hit albums and singles that have
        garnered him a massive fan following both in India and abroad.
      </p>
    ),
  },
  {
    description: "Metallica",
    title: "For Whom The Bell Tolls",
    src: "https://assets.aceternity.com/demos/metallica.jpeg",
    ctaText: "Visit",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => (
      <p>
        Metallica, an iconic American heavy metal band, is renowned for their
        powerful sound and intense performances that resonate deeply with their
        audience. Formed in Los Angeles, California, they have become a cultural
        icon in the heavy metal music industry. <br /> <br /> Their songs often
        reflect themes of aggression, social issues, and personal struggles,
        capturing the essence of the heavy metal genre. With a career spanning
        over four decades, Metallica has released numerous hit albums and
        singles that have garnered them a massive fan following both in the
        United States and abroad.
      </p>
    ),
  },
  {
    description: "Lord Himesh",
    title: "Aap Ka Suroor",
    src: "https://assets.aceternity.com/demos/metallica.jpeg",
    ctaText: "Visit",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => (
      <p>
        Himesh Reshammiya, a renowned Indian music composer, singer, and actor,
        is celebrated for his distinctive voice and innovative compositions.
        Born in Mumbai, India, he has become a prominent figure in the Bollywood
        music industry. <br /> <br /> His songs often feature a blend of
        contemporary and traditional Indian music, capturing the essence of
        modern Bollywood soundtracks. With a career spanning over two decades,
        Himesh Reshammiya has released numerous hit albums and singles that have
        garnered him a massive fan following both in India and abroad.
      </p>
    ),
  },
  {
    description: "Daft Punk",
    title: "Get Lucky",
    src: "https://assets.aceternity.com/demos/metallica.jpeg",
    ctaText: "Visit",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => (
      <p>
        Daft Punk, the legendary French electronic music duo, is celebrated for
        their innovative sound and iconic visual style. Known for blending
        house, funk, and disco, their music has influenced countless artists
        worldwide. <br /> <br /> With chart-topping hits and groundbreaking
        albums, Daft Punk has left an indelible mark on the global music scene,
        earning numerous awards and a devoted fan base.
      </p>
    ),
  },
  {
    description: "Taylor Swift",
    title: "Blank Space",
    src: "https://assets.aceternity.com/demos/metallica.jpeg",
    ctaText: "Visit",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => (
      <p>
        Taylor Swift, an American singer-songwriter, is renowned for her
        narrative songwriting and genre-spanning music. Rising to fame in
        country before conquering pop, she has become one of the most
        influential artists of her generation. <br /> <br /> Her albums
        consistently top charts, and her lyrics resonate with millions, making
        her a cultural icon with a global following.
      </p>
    ),
  },
];

const ScheduleItem = ({
  title,
  date,
  location,
}: {
  title: string;
  date: string;
  location: string;
}) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="mb-4 md:mb-9 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-zinc-800 px-2 md:px-3 pb-4 md:pb-9"
    >
      <div>
        <p className="mb-1 text-base md:text-xl ">{title}</p>
        <p className="text-xs md:text-sm uppercase text-zinc-500">{date}</p>
      </div>
      <div className="flex items-center gap-1 text-end text-xs md:text-sm uppercase text-zinc-500 mt-2 md:mt-0">
        <p>{location}</p>
        <FiMapPin />
      </div>
    </motion.div>
  );
};
