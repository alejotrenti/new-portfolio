import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { ContactShadows, Float, Environment, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

export default function Headset() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768); // Puedes ajustar el ancho según tus necesidades
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    return (
        <div className="w-full h-full flex justify-center items-center">
            <Canvas 
                shadows 
                gl={{ antialias: false }} 
                dpr={[1, 1.5]} 
                camera={{ position: [0, 0, 20], fov: 20, near: 1, far: 40 }}
            >
                <Suspense fallback={null}>
                    {isMobile ? (
                        <Keyboard />
                    ) : (
                        <>
                            <Headphones2 />
                            <Keyboard />
                            <Mouse />
                        </>
                    )}
                    <Environment preset="studio" />
                </Suspense>
            </Canvas>
        </div>
    );
}

function Keyboard() {
    const { scene } = useGLTF('./Keyboard.glb');
    const [visible, setVisible] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [rotation, setRotation] = useState([0, 0, 0]);

    const meshRef = useRef();
    const startPos = useRef([0, 0]);

    const handlePointerOver = () => {
        document.body.style.cursor = "pointer";
    };

    const handlePointerOut = () => {
        document.body.style.cursor = "default";
    };

    const handlePointerDown = useCallback((event) => {
        setDragging(true);
        startPos.current = [event.clientX, event.clientY];
    }, []);

    const handlePointerMove = useCallback((event) => {
        if (dragging) {
            const dx = event.clientX - startPos.current[0];
            const dy = event.clientY - startPos.current[1];
            startPos.current = [event.clientX, event.clientY];

            const rotationSpeed = 0.01; // Ajusta esta velocidad para controlar la velocidad de rotación
            const newRotation = [
                rotation[0] + dy * rotationSpeed,
                rotation[1] + dx * rotationSpeed,
                rotation[2]
            ];

            // Usa gsap para animar la rotación de forma suave
            gsap.to(meshRef.current.rotation, {
                x: newRotation[0],
                y: newRotation[1],
                z: newRotation[2],
                duration: 0.5, // Duración de la animación en segundos
                ease: "power2.out" // Tipo de interpolación
            });

            // Actualiza el estado de rotación para mantener el valor actual
            setRotation(newRotation);
        }
    }, [dragging, rotation]);

    const handlePointerUp = useCallback(() => {
        setDragging(false);
    }, []);

    useEffect(() => {
        gsap.context(() => {
            setVisible(true);
            gsap.from(meshRef.current.scale, {
                x: 0,
                y: 0,
                z: 0,
                duration: 1.7,
                ease: "elastic.out(1, 0.3)",
                delay: 1,
            });
        });
    }, []);

    useEffect(() => {
        document.addEventListener('pointermove', handlePointerMove);
        document.addEventListener('pointerup', handlePointerUp);

        return () => {
            document.removeEventListener('pointermove', handlePointerMove);
            document.removeEventListener('pointerup', handlePointerUp);
        };
    }, [handlePointerMove, handlePointerUp]);

    return (
        <Float speed={0.1} rotationIntensity={8} floatIntensity={2}>
            <primitive
                object={scene}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                onPointerDown={handlePointerDown}
                visible={visible}
                ref={meshRef}
                scale={[20, 20, 20]} // Aumenta la escala del objeto
                rotation={rotation} // Rotación del teclado
            />
        </Float>
    );
}


function Mouse() {
    const { scene } = useGLTF('./Mouse.glb');
    const [visible, setVisible] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [rotation, setRotation] = useState([0, 0, 0]);

    const meshRef = useRef();
    const startPos = useRef([0, 0]);

    const handlePointerOver = () => {
        document.body.style.cursor = "pointer";
    };

    const handlePointerOut = () => {
        document.body.style.cursor = "default";
    };

    const handlePointerDown = useCallback((event) => {
        setDragging(true);
        startPos.current = [event.clientX, event.clientY];
    }, []);

    const handlePointerMove = useCallback((event) => {
        if (dragging) {
            const dx = event.clientX - startPos.current[0];
            const dy = event.clientY - startPos.current[1];
            startPos.current = [event.clientX, event.clientY];

            const rotationSpeed = 0.01; // Ajusta esta velocidad para controlar la velocidad de rotación
            const newRotation = [
                rotation[0] + dy * rotationSpeed,
                rotation[1] + dx * rotationSpeed,
                rotation[2]
            ];

            // Usa gsap para animar la rotación de forma suave
            gsap.to(meshRef.current.rotation, {
                x: newRotation[0],
                y: newRotation[1],
                z: newRotation[2],
                duration: 0.5, // Duración de la animación en segundos
                ease: "power2.out" // Tipo de interpolación
            });

            // Actualiza el estado de rotación para mantener el valor actual
            setRotation(newRotation);
        }
    }, [dragging, rotation]);

    const handlePointerUp = useCallback(() => {
        setDragging(false);
    }, []);

    useEffect(() => {
        gsap.context(() => {
            setVisible(true);
            gsap.from(meshRef.current.scale, {
                x: 0,
                y: 0,
                z: 0,
                duration: 1.7,
                ease: "elastic.out(1, 0.3)",
                delay: 1,
            });
        });
    }, []);

    useEffect(() => {
        document.addEventListener('pointermove', handlePointerMove);
        document.addEventListener('pointerup', handlePointerUp);

        return () => {
            document.removeEventListener('pointermove', handlePointerMove);
            document.removeEventListener('pointerup', handlePointerUp);
        };
    }, [handlePointerMove, handlePointerUp]);

    return (
        <Float speed={0.1} rotationIntensity={2} floatIntensity={2}>
            <primitive
                object={scene}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                onPointerDown={handlePointerDown}
                visible={visible}
                ref={meshRef}
                scale={[1.1, 1.1, 1.1]} // Aumenta la escala del objeto
                rotation={rotation} // Rotación del teclado
                position={[5,0,4]}
            />
        </Float>
    );
}

function Headphones2() {
    const { scene } = useGLTF('./Headphones.glb');
    const [visible, setVisible] = useState(false);
    const [dragging, setDragging] = useState(false);

    const meshRef = useRef();
    const startPos = useRef([0, 0]);
    const rotationRef = useRef([0, 0, 0]);

    const handlePointerOver = () => {
        document.body.style.cursor = "pointer";
    };

    const handlePointerOut = () => {
        if (!dragging) {
            document.body.style.cursor = "default";
        }
    };

    const handlePointerDown = useCallback((event) => {
        setDragging(true);
        startPos.current = [event.clientX, event.clientY];
        document.body.style.cursor = "grabbing";
    }, []);

    const handlePointerMove = useCallback((event) => {
        if (dragging) {
            const dx = event.clientX - startPos.current[0];
            const dy = event.clientY - startPos.current[1];
            startPos.current = [event.clientX, event.clientY];

            const rotationSpeed = 0.01; // Ajusta esta velocidad para controlar la velocidad de rotación
            rotationRef.current = [
                rotationRef.current[0] + dy * rotationSpeed,
                rotationRef.current[1] + dx * rotationSpeed,
                rotationRef.current[2]
            ];

            // Usa gsap para animar la rotación de forma suave
            gsap.to(meshRef.current.rotation, {
                x: rotationRef.current[0],
                y: rotationRef.current[1],
                z: rotationRef.current[2],
                duration: 0.5, // Duración de la animación en segundos
                ease: "power2.out" // Tipo de interpolación
            });
        }
    }, [dragging]);

    const handlePointerUp = useCallback(() => {
        setDragging(false);
        document.body.style.cursor = "pointer";
    }, []);

    useEffect(() => {
        setVisible(true);
        gsap.from(meshRef.current.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1.7,
            ease: "elastic.out(1, 0.3)",
            delay: 1,
        });
    }, []);

    useEffect(() => {
        document.addEventListener('pointermove', handlePointerMove);
        document.addEventListener('pointerup', handlePointerUp);

        return () => {
            document.removeEventListener('pointermove', handlePointerMove);
            document.removeEventListener('pointerup', handlePointerUp);
        };
    }, [handlePointerMove, handlePointerUp]);

    return (
        <Float speed={0.1} rotationIntensity={2} floatIntensity={2}>
            <primitive
                object={scene}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                onPointerDown={handlePointerDown}
                visible={visible}
                ref={meshRef}
                position={[-5, 0, 4]}
                scale={[8, 8, 8]} // Aumenta la escala del objeto
            />
        </Float>
    );
}