import React, { useEffect } from 'react';
import * as THREE from 'three';

const StarsBackground = () => {
  useEffect(() => {
    let scene, camera, renderer, stars;

    const init = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);
      renderer.domElement.style.position = 'fixed';
      renderer.domElement.style.top = '0';
      renderer.domElement.style.left = '0';
      renderer.domElement.style.zIndex = '-1';

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });

      const starGeometry = new THREE.BufferGeometry();
      const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });

      const starVertices = [];
      for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = -Math.random() * 2000;
        starVertices.push(x, y, z);
      }

      starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
      stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);

      camera.position.z = 1;

      animate();
    };

    const animate = () => {
      requestAnimationFrame(animate);
      stars.rotation.x += 0.00005;
      stars.rotation.y += 0.00005;
      renderer.render(scene, camera);
    };

    init();
  }, []);

  return null;
};

export default StarsBackground;