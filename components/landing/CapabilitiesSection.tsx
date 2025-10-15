import React from "react";

import { Card, CardHeader, Chip } from "@heroui/react";
import ReactPlayer from "react-player";
import HorizontalScrollCarousel from "@/components/horizontal-scroll-carousel";
import { RiNextjsLine } from "react-icons/ri";
import {
  SiOllama,
  SiGooglegemini,
  SiPerplexity,
  SiLangchain,
  SiOpenai,
  SiN8N,
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
  SiKeras,
  SiHuggingface,
  SiApachespark,
  SiTypescript,
  SiJavascript,
  SiFlutter,
  SiReact,
  SiAndroidstudio,
  SiGithub,
  SiTailwindcss,
  SiNextui,
  SiVercel,
  SiFigma,
  SiSupabase,
  SiMongodb,
  SiPostgresql,
  SiStripe,
  SiDocker,
  SiAuth0,
  SiFirebase,
  SiAwsamplify,
  SiAwslambda,
  SiJupyter,
  SiCanva,
  SiBlender,
} from "react-icons/si";
import { FaPython, FaAws, FaGoogle } from "react-icons/fa";
import { TbApi } from "react-icons/tb";
import { VscAzure } from "react-icons/vsc";

const CapabilitiesSection = () => (
  <section className="bg-background relative z-10">
    <div className="sticky font-bold text-xl md:text-3xl lg:text-4xl text-center top-0 z-20 w-full h-[64px] md:h-[100px] flex justify-center items-center">
      <div>Capabilities</div>
    </div>
    <HorizontalScrollCarousel
      sectionHeight="1000vh"
      cards={[
        <Card
          className="w-full h-full overflow-hidden rounded-none bg-background"
          isHoverable
          key="card1"
          isFooterBlurred
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
          >
            {/* Add content or leave empty for just the gradient */}
          </div>
          <div
            className="right-0 top-0 h-full w-[30%] z-40"
            style={{
              width: "30%",
              height: "100vh",
              zIndex: 40,
              background: "linear-gradient(to right, transparent, black)",
              position: "absolute",
            }}
          >
            {/* Add content or leave empty for just the gradient */}
          </div>
          <div
            className="left-0 top-0 h-[100%] w-[100%] z-40"
            style={{
              zIndex: 40,
              background: "linear-gradient(-45deg, transparent 0%, black 100%)",
              position: "absolute",
            }}
          >
            {/* Add content or leave empty for just the gradient */}
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              width: "100vw",
              height: "100vh",
              overflow: "hidden",
              zIndex: 0,
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* This wrapper crops the player to fill the screen */}
            <div
              style={{
                position: "relative",
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* The player itself always stays at 16:9 ratio */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "calc(max(100vw, 100vh * 16 / 9))",
                  height: "calc(max(100vh, 100vw * 9 / 16))",
                  aspectRatio: "16/9",
                  overflow: "hidden",
                }}
              >
                <ReactPlayer
                  src="https://youtu.be/58Z4yYeWVsA"
                  playing
                  loop
                  controls={false}
                  muted
                  width="100%"
                  height="100%"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 z-10"></div>

          <div className="absolute top-[10%] left-[5%] md:top-[20%] md:left-[10%] z-50 w-fit h-fit">
            <Card isBlurred>
              <CardHeader className="flex flex-col items-start gap-2 max-w-xs md:max-w-md lg:max-w-lg">
                <h1 className="text-2xl md:text-4xl lg:text-5xl">AI agents</h1>
                <p className="text-base md:text-lg lg:text-xl">
                  Build and deploy custom AI agents for automation, data
                  analysis, and decision-making. Integrate LLMs, APIs, and cloud
                  services into your products.
                </p>
              </CardHeader>
            </Card>
            <div className="flex flex-wrap gap-2 p-2 md:p-4 max-w-xs md:max-w-md lg:max-w-lg">
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<SiOllama size={20} />}
              >
                Ollama
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<FaPython size={20} />}
              >
                Python
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<SiLangchain size={20} />}
              >
                LangChain
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<SiOpenai size={20} />}
              >
                OpenAI
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<SiN8N size={20} />}
              >
                n8n
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<TbApi size={20} />}
              >
                API
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<FaAws size={20} />}
              >
                AWS
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<FaGoogle size={20} />}
              >
                Google Cloud
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<VscAzure size={20} />}
              >
                Azure
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<SiGooglegemini size={20} />}
              >
                Gemini
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<SiPerplexity size={20} />}
              >
                Perplexity
              </Chip>
              <Chip size="lg" color="primary" variant="flat">
                CrewAI
              </Chip>
              <Chip size="lg" color="primary" variant="flat">
                MCP
              </Chip>
              <Chip size="lg" color="primary" variant="flat">
                RAG
              </Chip>
              <Chip size="lg" color="primary" variant="flat">
                NLP
              </Chip>
              <Chip size="lg" color="primary" variant="flat">
                Data Science
              </Chip>
            </div>
          </div>
        </Card>,
        <Card
          className="w-full h-full overflow-hidden rounded-none bg-background"
          isHoverable
          key="card2"
          isFooterBlurred
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
          >
            {/* Add content or leave empty for just the gradient */}
          </div>
          <div
            className="right-0 top-0 h-full w-[30%] z-40"
            style={{
              width: "30%",
              height: "100vh",
              zIndex: 40,
              background: "linear-gradient(to right, transparent, black)",
              position: "absolute",
            }}
          >
            {/* Add content or leave empty for just the gradient */}
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              width: "100vw",
              height: "100vh",
              overflow: "hidden",
              zIndex: 0,
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* This wrapper crops the player to fill the screen */}
            <div
              style={{
                position: "relative",
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* The player itself always stays at 16:9 ratio */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "calc(max(100vw, 100vh * 16 / 9))",
                  height: "calc(max(100vh, 100vw * 9 / 16))",
                  aspectRatio: "16/9",
                  overflow: "hidden",
                }}
              >
                <ReactPlayer
                  src="https://youtu.be/cz4biAjIFc0"
                  playing
                  loop
                  controls={false}
                  muted
                  width="100%"
                  height="100%"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 z-10"></div>
          <div className="absolute top-[10%] left-[5%] md:top-[20%] md:left-[10%] z-50 w-fit h-fit">
            <Card isBlurred>
              <CardHeader className="flex flex-col items-start gap-2 max-w-xs md:max-w-md lg:max-w-lg">
                <h1 className="text-2xl md:text-4xl lg:text-5xl">
                  Machine Learnings
                </h1>
                <p className="text-base md:text-lg lg:text-xl">
                  From image recognition, voice processing, text pattern
                  analysis, to a wide range of machine learning applications.
                  Skilled in deep learning, neural networks, and building
                  intelligent systems for complex data tasks.
                </p>
              </CardHeader>
            </Card>
            <div className="flex flex-wrap gap-2 p-2 md:p-4 max-w-xs md:max-w-md lg:max-w-lg">
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<FaPython size={20} />}
              >
                Python
              </Chip>

              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<TbApi size={20} />}
              >
                API
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<FaAws size={20} />}
              >
                AWS
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<FaGoogle size={20} />}
              >
                Google Cloud
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<VscAzure size={20} />}
              >
                Azure
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<SiJupyter size={20} />}
              >
                Jupyter Notebook
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<SiTensorflow size={20} />}
              >
                TensorFlow
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<SiPytorch size={20} />}
              >
                PyTorch
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<SiScikitlearn size={20} />}
              >
                scikit-learn
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<SiKeras size={20} />}
              >
                Keras
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<SiHuggingface size={20} />}
              >
                Hugging Face
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<SiApachespark size={20} />}
              >
                Apache Spark
              </Chip>
            </div>
          </div>
        </Card>,
        <Card
          className="w-full h-full overflow-hidden rounded-none bg-background"
          isHoverable
          key="card3"
          isFooterBlurred
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
          >
            {/* Add content or leave empty for just the gradient */}
          </div>
          <div
            className="right-0 top-0 h-full w-[30%] z-40"
            style={{
              width: "30%",
              height: "100vh",
              zIndex: 40,
              background: "linear-gradient(to right, transparent, black)",
              position: "absolute",
            }}
          >
            {/* Add content or leave empty for just the gradient */}
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              width: "100vw",
              height: "100vh",
              overflow: "hidden",
              zIndex: 0,
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* This wrapper crops the player to fill the screen */}
            <div
              style={{
                position: "relative",
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* The player itself always stays at 16:9 ratio */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "calc(max(100vw, 100vh * 16 / 9))",
                  height: "calc(max(100vh, 100vw * 9 / 16))",
                  aspectRatio: "16/9",
                  overflow: "hidden",
                }}
              >
                <ReactPlayer
                  src="https://youtu.be/6e49BbnlCbk"
                  playing
                  loop
                  controls={false}
                  muted
                  width="100%"
                  height="100%"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 z-10"></div>
          <div className="absolute top-[10%] left-[5%] md:top-[20%] md:left-[10%] z-50 w-fit h-fit">
            <Card isBlurred>
              <CardHeader className="flex flex-col items-start gap-2 max-w-xs md:max-w-md lg:max-w-lg">
                <h1 className="text-2xl md:text-4xl lg:text-5xl">Apps</h1>
                <p className="text-base md:text-lg lg:text-xl">
                  Webapp, mobile app, desktop app, or even a simple command-line
                  tool. I can build it all. From concept to deployment, I ensure
                  a smooth and efficient development process.
                </p>
              </CardHeader>
            </Card>
            <div className="flex flex-wrap gap-2 p-2 md:p-4 max-w-xs md:max-w-md lg:max-w-lg">
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<FaPython size={20} />}
              >
                Python
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<RiNextjsLine size={20} />}
              >
                Next.js
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<SiTypescript size={20} />}
              >
                TypeScript
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<SiJavascript size={20} />}
              >
                JavaScript
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<SiFlutter size={20} />}
              >
                Flutter
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<SiReact size={20} />}
              >
                React
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<SiAndroidstudio size={20} />}
              >
                Android Studio
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<SiFirebase size={20} />}
              >
                Firebase
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<SiAwsamplify size={20} />}
              >
                AWS Amplify
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<SiAwslambda size={20} />}
              >
                AWS Lambda
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<SiGithub size={20} />}
              >
                GitHub
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<SiTailwindcss size={20} />}
              >
                Tailwind CSS
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<SiNextui size={20} />}
              >
                Hero UI
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<SiVercel size={20} />}
              >
                Vercel
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<SiFigma size={20} />}
              >
                Figma
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<SiSupabase size={20} />}
              >
                Supabase
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<SiMongodb size={20} />}
              >
                MongoDB
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<SiPostgresql size={20} />}
              >
                PostgreSQL
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<SiStripe size={20} />}
              >
                Stripe
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<SiDocker size={20} />}
              >
                Docker
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<SiAuth0 size={20} />}
              >
                Auth0
              </Chip>
            </div>
          </div>
        </Card>,
        <Card
          className="w-full h-full overflow-hidden rounded-none bg-background"
          isHoverable
          key="card4"
          isFooterBlurred
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
          <div
            style={{
              position: "absolute",
              inset: 0,
              width: "100vw",
              height: "100vh",
              overflow: "hidden",
              zIndex: 0,
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "calc(max(100vw, 100vh * 16 / 9))",
                  height: "calc(max(100vh, 100vw * 9 / 16))",
                  aspectRatio: "16/9",
                  overflow: "hidden",
                }}
              >
                <ReactPlayer
                  src="https://youtu.be/9mTzbBLLCqs"
                  playing
                  loop
                  controls={false}
                  muted
                  width="100%"
                  height="100%"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 z-10"></div>
          <div className="absolute top-[10%] left-[5%] md:top-[20%] md:left-[10%] z-50 w-fit h-fit">
            <Card isBlurred>
              <CardHeader className="flex flex-col items-start gap-2 max-w-xs md:max-w-md lg:max-w-lg">
                <h1 className="text-2xl md:text-4xl lg:text-5xl">
                  Design & Branding
                </h1>
                <p className="text-base md:text-lg lg:text-xl">
                  From UI/UX design to branding, I create visually appealing and
                  user-friendly designs. My design process focuses on enhancing
                  user experience and meeting business goals.
                </p>
              </CardHeader>
            </Card>
            <div className="flex flex-wrap gap-2 p-2 md:p-4 max-w-xs md:max-w-md lg:max-w-lg">
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<SiFigma size={20} />}
              >
                Figma
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<SiCanva size={20} />}
              >
                Canva
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<SiBlender size={20} />}
              >
                Blender
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<SiOpenai size={20} />}
              >
                Sora
              </Chip>
              <Chip
                size="lg"
                color="primary"
                variant="flat"
                startContent={<FaGoogle size={20} />}
              >
                Veo3
              </Chip>
            </div>
          </div>
        </Card>,
        <Card
          className="w-full h-full overflow-hidden rounded-none bg-background"
          isHoverable
          key="card5"
          isFooterBlurred
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
          <div
            style={{
              position: "absolute",
              inset: 0,
              width: "100vw",
              height: "100vh",
              overflow: "hidden",
              zIndex: 0,
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "calc(max(100vw, 100vh * 16 / 9))",
                  height: "calc(max(100vh, 100vw * 9 / 16))",
                  aspectRatio: "16/9",
                  overflow: "hidden",
                }}
              >
                <ReactPlayer
                  src="https://youtu.be/Lhjwln_taYk"
                  playing
                  loop
                  controls={false}
                  muted
                  width="100%"
                  height="100%"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 z-10"></div>
          <div className="absolute top-[10%] left-[5%] md:top-[20%] md:left-[10%] z-50 w-fit h-fit">
            <Card isBlurred>
              <CardHeader className="flex flex-col items-start gap-2 max-w-xs md:max-w-md lg:max-w-lg">
                <h1 className="text-2xl md:text-4xl lg:text-5xl">Softskills</h1>
                <p className="text-base md:text-lg lg:text-xl">
                  Managed team from 3 to 50+ people, I can and had lead a team
                  through complex projects, ensuring effective communication,
                  and fostering a collaborative environment.
                </p>
              </CardHeader>
            </Card>
            <div className="flex flex-wrap gap-2 p-2 md:p-4 max-w-xs md:max-w-md lg:max-w-lg">
              <Chip size="lg" color="primary" variant="flat">
                Entrepreneurship
              </Chip>
              <Chip size="lg" color="primary" variant="flat">
                Leadership
              </Chip>
              <Chip size="lg" color="primary" variant="flat">
                Team Management
              </Chip>
              <Chip size="lg" color="primary" variant="flat">
                Communication
              </Chip>
              <Chip size="lg" color="primary" variant="flat">
                Problem Solving
              </Chip>
              <Chip size="lg" color="primary" variant="flat">
                Adaptability
              </Chip>
              <Chip size="lg" color="primary" variant="flat">
                Time Management
              </Chip>
              <Chip size="lg" color="primary" variant="flat">
                Stress Management
              </Chip>
              <Chip size="lg" color="primary" variant="flat">
                Conflict Resolution
              </Chip>
              <Chip size="lg" color="primary" variant="flat">
                Decision Making
              </Chip>
              <Chip size="lg" color="primary" variant="flat">
                Critical Thinking
              </Chip>
              <Chip size="lg" color="primary" variant="flat">
                Creativity
              </Chip>
            </div>
          </div>
        </Card>,
      ]}
    />
  </section>
);
export default CapabilitiesSection;
