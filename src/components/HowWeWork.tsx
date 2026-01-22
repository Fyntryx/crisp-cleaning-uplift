"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Request & Estimate",
    description:
      "The process begins when a potential client contacts the agency for a cleaning service.",
  },
  {
    number: "02",
    title: "Scheduling & Prep",
    description:
      "Once the client approves the estimate, the agency schedules a date and time for the service.",
  },
  {
    number: "03",
    title: "Execution & Follow-up",
    description:
      "The cleaning team arrives at the scheduled time and performs the cleaning service as agreed.",
  },
];

const HowWeWork = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);

  const [lengths, setLengths] = useState({ path1: 0, path2: 0 });
  const [isDesktop, setIsDesktop] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [sequenceStep, setSequenceStep] = useState(0);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (isDesktop && path1Ref.current && path2Ref.current) {
      setLengths({
        path1: path1Ref.current.getTotalLength(),
        path2: path2Ref.current.getTotalLength(),
      });
    }
  }, [isDesktop]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const DURATION = 350;

    setSequenceStep(0);

    const t1 = setTimeout(() => {
      setSequenceStep(1);
    }, 50);

    const t2 = setTimeout(() => {
      setSequenceStep(2);
    }, 50 + DURATION);

    const t3 = setTimeout(
      () => {
        setSequenceStep(3);
      },
      50 + DURATION * 2
    );

    const t4 = setTimeout(
      () => {
        setSequenceStep(4);
      },
      50 + DURATION * 3
    );

    const t5 = setTimeout(
      () => {
        setSequenceStep(5);
      },
      50 + DURATION * 4
    );

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [hasStarted]);

  const path1D = "M 305 200 Q 375 130 445 200";
  const path2D = "M 755 200 Q 825 270 895 200";

  return (
    <section
      ref={sectionRef}
      className="relative px-4 md:px-6 py-12 md:py-12 flex items-center justify-center md:min-h-[75vh]">
      <div
        className="absolute inset-x-4 inset-y-0 md:inset-x-6 bg-primary overflow-hidden shadow-xl z-0"
        style={{ borderRadius: "3rem" }}
      />

      <div className="relative w-full max-w-7xl mx-auto z-10 flex flex-col items-center justify-center h-full px-4 md:px-0">
        <span className="inline-block px-4 py-2 bg-white/10 text-white text-sm font-medium rounded-full mb-6 border border-white/10 backdrop-blur-sm">
          Our Process
        </span>

        <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-12 md:mb-12 text-white z-20 drop-shadow-md">
          The Way We Work
        </h2>

        <div className="relative w-full px-0 md:px-16">
          <div className="md:relative md:w-full md:aspect-[1200/400]">
            <svg
              className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0"
              viewBox="0 0 1200 400"
              fill="none"
              preserveAspectRatio="xMidYMid meet">
              <defs>
                <marker
                  id="arrow"
                  markerWidth="6"
                  markerHeight="6"
                  refX="5"
                  refY="3"
                  orient="auto"
                  markerUnits="strokeWidth">
                  <path d="M0,0 L0,6 L6,3 z" fill="white" />
                </marker>
              </defs>

              {/* Path 1 */}
              <path
                d={path1D}
                stroke="rgba(255,255,255, 0.3)"
                strokeWidth="4"
                fill="none"
                strokeDasharray="12 12"
              />
              <path
                ref={path1Ref}
                d={path1D}
                stroke="white"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                style={{
                  strokeDasharray: lengths.path1 || 1,
                  strokeDashoffset: sequenceStep >= 2 ? 0 : lengths.path1,

                  transition: "stroke-dashoffset 0.3s linear",
                  filter: "drop-shadow(0 0 8px rgba(255,255,255,0.5))",
                }}
              />

              {/* Path 2 */}
              <path
                d={path2D}
                stroke="rgba(255,255,255, 0.3)"
                strokeWidth="4"
                fill="none"
                strokeDasharray="12 12"
              />
              <path
                ref={path2Ref}
                d={path2D}
                stroke="white"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                style={{
                  strokeDasharray: lengths.path2 || 1,
                  strokeDashoffset: sequenceStep >= 4 ? 0 : lengths.path2,

                  transition: "stroke-dashoffset 0.3s linear",
                  filter: "drop-shadow(0 0 8px rgba(255,255,255,0.5))",
                }}
              />
            </svg>

            <div className="flex flex-col gap-12 md:block md:absolute md:inset-0 z-20">
              {steps.map((step, index) => {
                const visibilityThreshold = index * 2 + 1;
                const isVisible = isDesktop
                  ? sequenceStep >= visibilityThreshold
                  : true;
                const desktopPositions = [
                  { left: "12.5%" },
                  { left: "50%" },
                  { left: "87.5%" },
                ];
                const pos = desktopPositions[index];

                const desktopStyle = isDesktop
                  ? {
                      left: pos.left,
                      top: "50%",
                      transform: `translate(-50%, -50%) scale(${
                        isVisible ? 1 : 0.9
                      })`,
                      opacity: isVisible ? 1 : 0,
                      filter: isVisible ? "blur(0px)" : "blur(4px)",

                      transition: "all 0.3s ease-out",
                      zIndex: 30,
                    }
                  : {};

                return (
                  <div
                    key={index}
                    className="relative w-full max-w-md mx-auto md:absolute md:w-[24%] md:h-[260px] md:m-0"
                    style={desktopStyle}>
                    <div className="md:hidden absolute left-4 top-16 bottom-[-3rem] w-0.5 bg-white/20 last:hidden" />

                    <div className="bg-white/10 backdrop-blur-md p-4 lg:p-6 rounded-3xl border border-white/20 relative z-30 shadow-lg text-center flex flex-col items-center h-full justify-center">
                      <div className="flex items-center justify-center gap-3 mb-3 lg:mb-4">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white text-primary font-bold text-base lg:text-lg flex items-center justify-center shadow-sm border-4 border-white/20">
                          {step.number}
                        </div>
                      </div>
                      <h3 className="text-base lg:text-xl font-display font-bold mb-2 text-white">
                        {step.title}
                      </h3>
                      <p className="text-white/80 text-xs lg:text-sm leading-relaxed font-medium">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
