"use client";

import type { ReactNode } from "react";
import { LazyMotion } from "motion/react";

// Os recursos de animação do Motion carregam depois da hidratação (fora do caminho do LCP).
const features = () => import("./motion-features").then((mod) => mod.default);

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={features} strict>
      {children}
    </LazyMotion>
  );
}
