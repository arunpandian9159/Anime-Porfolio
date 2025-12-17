import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Card = ({ children, index, progress, range, targetScale }) => {
  const scale = useTransform(progress, range, [1, targetScale]);
  
  return (
    <div className="sticky top-0 h-screen flex items-center justify-center">
      <motion.div 
        style={{ scale, top: `calc(-5vh + ${index * 25}px)` }} 
        className="relative flex flex-col w-full max-w-5xl h-[70vh] rounded-3xl overflow-hidden bg-oxford-navy border border-frosted-blue/20 origin-top shadow-2xl hover:border-punch-red transition-colors"
      >
        {children}
      </motion.div>
    </div>
  );
};

const ScrollStack = ({ items, itemContent }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={container} className="relative mt-[10vh]">
      {items.map((item, i) => {
        const targetScale = 1 - ( (items.length - i) * 0.05 );
        return (
            <Card 
            key={i} 
            index={i} 
            progress={scrollYProgress}
            range={[i * (1/items.length), 1]}
            targetScale={targetScale}
            >
            {itemContent(item, i)}
            </Card>
        );
      })}
    </div>
  );
};

export default ScrollStack;
