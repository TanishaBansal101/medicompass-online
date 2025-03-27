
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HospitalModelProps {
  className?: string;
}

export const HospitalModel = ({ className }: HospitalModelProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xf8fafc);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      50, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    cameraRef.current = camera;
    camera.position.set(10, 8, 10);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current = renderer;
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // Ground
    const groundGeometry = new THREE.PlaneGeometry(30, 30);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xe0f2fe,
      roughness: 0.8,
      metalness: 0.2
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    
    // Simple hospital building
    const buildingGeometry = new THREE.BoxGeometry(8, 4, 5);
    const buildingMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffffff,
      roughness: 0.7,
      metalness: 0.1
    });
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
    building.position.y = 2;
    building.castShadow = true;
    building.receiveShadow = true;
    scene.add(building);
    
    // Roof
    const roofGeometry = new THREE.ConeGeometry(6, 2, 4);
    const roofMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x3b82f6,
      roughness: 0.6,
      metalness: 0.2
    });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 5;
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    scene.add(roof);
    
    // Entrance
    const entranceGeometry = new THREE.BoxGeometry(2, 2, 1);
    const entranceMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xbfdbfe,
      roughness: 0.3,
      metalness: 0.7
    });
    const entrance = new THREE.Mesh(entranceGeometry, entranceMaterial);
    entrance.position.set(0, 1, 2.5);
    entrance.castShadow = true;
    entrance.receiveShadow = true;
    scene.add(entrance);
    
    // Windows
    const createWindow = (x: number, z: number) => {
      const windowGeometry = new THREE.PlaneGeometry(1, 1);
      const windowMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xdbeafe,
        roughness: 0.2,
        metalness: 0.8,
        side: THREE.DoubleSide
      });
      const window = new THREE.Mesh(windowGeometry, windowMaterial);
      window.position.set(x, 2, z);
      window.castShadow = false;
      scene.add(window);
      return window;
    };
    
    // Add windows on each side
    const windows = [
      createWindow(4.01, 0), // Right
      createWindow(-4.01, 0), // Left
      createWindow(2, 2.51), // Front
      createWindow(-2, 2.51), // Front
      createWindow(2, -2.51), // Back
      createWindow(-2, -2.51), // Back
    ];
    
    // Windows rotation to face outward
    windows[0].rotation.y = Math.PI / 2;
    windows[1].rotation.y = Math.PI / 2;
    
    // Path to entrance
    const pathGeometry = new THREE.PlaneGeometry(2, 5);
    const pathMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xd1d5db,
      roughness: 1,
      metalness: 0,
      side: THREE.DoubleSide
    });
    const path = new THREE.Mesh(pathGeometry, pathMaterial);
    path.rotation.x = -Math.PI / 2;
    path.position.set(0, 0.01, 5);
    path.receiveShadow = true;
    scene.add(path);
    
    // Auto rotation animation
    let autoRotationEnabled = true;
    const autoRotationSpeed = 0.005;
    
    // Mouse interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotation = { x: 0, y: 0 };
    let currentRotation = { x: 0, y: 0 };
    const rotationSpeed = 0.01;
    const dampingFactor = 0.05;
    
    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition.x = e.clientX;
      previousMousePosition.y = e.clientY;
      autoRotationEnabled = false;
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y
      };
      
      targetRotation.y += deltaMove.x * rotationSpeed;
      targetRotation.x += deltaMove.y * rotationSpeed;
      
      // Limit vertical rotation
      targetRotation.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, targetRotation.x));
      
      previousMousePosition.x = e.clientX;
      previousMousePosition.y = e.clientY;
    };
    
    const handleMouseUp = () => {
      isDragging = false;
    };
    
    const handleMouseLeave = () => {
      isDragging = false;
    };
    
    // Mobile touch events
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition.x = e.touches[0].clientX;
        previousMousePosition.y = e.touches[0].clientY;
        autoRotationEnabled = false;
      }
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      
      const deltaMove = {
        x: e.touches[0].clientX - previousMousePosition.x,
        y: e.touches[0].clientY - previousMousePosition.y
      };
      
      targetRotation.y += deltaMove.x * rotationSpeed;
      targetRotation.x += deltaMove.y * rotationSpeed;
      
      // Limit vertical rotation
      targetRotation.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, targetRotation.x));
      
      previousMousePosition.x = e.touches[0].clientX;
      previousMousePosition.y = e.touches[0].clientY;
    };
    
    const handleTouchEnd = () => {
      isDragging = false;
    };
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Smooth rotation with damping
      currentRotation.x += (targetRotation.x - currentRotation.x) * dampingFactor;
      currentRotation.y += (targetRotation.y - currentRotation.y) * dampingFactor;
      
      // Apply rotation
      scene.rotation.x = currentRotation.x;
      scene.rotation.y = currentRotation.y;
      
      // Auto rotation if not interacting
      if (autoRotationEnabled) {
        targetRotation.y += autoRotationSpeed;
      }
      
      renderer.render(scene, camera);
    };
    
    // Start animation
    animate();
    
    // Attach event listeners
    const container = containerRef.current;
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    container.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    
    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseleave', handleMouseLeave);
      
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={className || "w-full h-[400px] rounded-2xl overflow-hidden"} 
    />
  );
};
