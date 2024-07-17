"use client";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";

function SmoothScrolling({ children }: { children: React.ReactNode }) {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  });
  // lenis options for configuration
  const lenisOptions = {
    //lerp: 0.9,
    duration: 0.1,
    //smoothTouch: false, //smooth scroll for touch devices
    smoothWheel: true,
  };

  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}
export default SmoothScrolling;
