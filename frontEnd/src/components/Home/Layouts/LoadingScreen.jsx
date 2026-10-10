// LoadingScreen.js
import React from 'react';
import styled, { keyframes } from 'styled-components';


const LoadingScreen = () => {
  return (
    <LoadingContainer>
      <Loader />
    </LoadingContainer>
  );
};


const loaderAnimation = keyframes`
  66% { transform: skewX(0deg); }
  80%, 100% { transform: skewX(-45deg); }
`;

const loaderBeforeAfterAnimation = keyframes`
  0% { transform: scale(var(--s, 1)) translate(-0.5px, 0); }
  33% { transform: scale(var(--s, 1)) translate(calc(1px - 50%), calc(1px - 50%)); }
  66% { transform: scale(var(--s, 1)) translate(calc(1px - 50%), 0%); }
  100% { transform: scale(var(--s, 1)) translate(calc(0.5px - 50%), 0%); }
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
`;

const Loader = styled.div`
  width: 40px;
  aspect-ratio: 1;
  display: grid;
  animation: ${loaderAnimation} 1.5s infinite linear;

  &::before,
  &::after {
    content: "";
    grid-area: 1/1;
    background: #16db65; /* Couleur du loader */
    clip-path: polygon(0 0%, 100% 0, 100% 100%);
    animation: inherit;
    animation-name: ${loaderBeforeAfterAnimation};
  }

  &::after {
    --s: -1;
  }
`;



export default LoadingScreen;
