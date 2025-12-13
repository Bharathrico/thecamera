//this is just for expostion for the experience

import React,{useRef, useEffect} from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Intermediate = ({ onDone }) =>  {

    const interRef = useRef();
    const nextRef = useRef();

  useGSAP((context, contextSafe) => {
	// overall div animation
	gsap.fromTo(interRef.current, {
      opacity: 0,
      x: 50,
      // scale: 0.4
    },{
      opacity: 1,
      x: 0,
      // scale:1,
      duration: 0.2,
      delay:0.2,
      ease: "power2.out"
    });

	const exitAnimation = contextSafe(() => {
		gsap.to(interRef.current, { 
      opacity: 0,
      x: -50,
      duration: 0.3,
      ease: "power2.in",
      // onComplete: onDone("second"),
     });
     setTimeout(()=>onDone("third"),200)
	});

	nextRef.current.addEventListener('click', exitAnimation);

	return () => {
		// <-- cleanup
		nextRef.current.removeEventListener('click', exitAnimation);
	};
},{ scope: interRef });


  return (
    <div

      ref={interRef}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection:"column",
        textAlign:"center",
        gap:"10px"
      }}
    >
      Make sure you are in a dark room<br/>before developing the image
      <button ref={nextRef}>Next Step</button>
    </div>
  );
}

export default Intermediate;
