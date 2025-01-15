import React, { useEffect } from "react";

const ParticleEffect = () => {
  const createParticle = () => {
    const particles = document.querySelector(".particles");
    const particle = document.createElement("div");

    particle.style.cssText = `
      position: absolute;
      background: rgba(147, 51, 234, 0.2);
      border-radius: 50%;
      pointer-events: none;
      width: 6px;
      height: 6px;
    `;

    const startPos = Math.random() * 100;
    particle.style.left = startPos + "vw";
    particle.style.top = "100%";

    const animation = particle.animate(
      [
        {
          transform: "translateY(0) scale(1)",
          opacity: 1,
        },
        {
          transform: `translateY(-100vh) scale(${Math.random() + 0.5})`,
          opacity: 0,
        },
      ],
      {
        duration: Math.random() * 3000 + 2000,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      }
    );

    particles.appendChild(particle);

    animation.onfinish = () => {
      particle.remove();
    };
  };

  useEffect(() => {
    // Create particles periodically
    const intervalId = setInterval(createParticle, 200);

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return <div className="particles absolute inset-0 pointer-events-none"></div>;
};

export default ParticleEffect;
