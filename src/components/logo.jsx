import React from 'react';
import './Logo.css';

export default function Logo() {
  return (
    <div className="logo-container">
      <svg className="bio-logo" viewBox="0 0 450 180" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2d8c12" />
            <stop offset="100%" stopColor="#1c5c0a" />
          </linearGradient>
        </defs>
        
        <g fill="url(#greenGrad)">
          {/* Hojas sobre la letra i */}
          <path d="M 148 55 C 146 45, 155 35, 160 38 C 163 45, 154 53, 148 55 Z" />
          <path d="M 158 56 C 165 48, 175 49, 176 56 C 169 59, 160 59, 158 56 Z" />
          
          {/* Texto principal Bio-Sayegh */}
          <text 
            x="50%" 
            y="110" 
            textAnchor="middle" 
            fontFamily="'Kaushan Script', cursive" 
            fontSize="82" 
            fontWeight="bold" 
            fontStyle="italic"
          >
            Bio-Sayegh
          </text>

          {/* Ondulación e ilustración de la hoja inferior */}
          <path d="M 70 115 C 70 145, 180 155, 230 140 C 170 142, 90 135, 75 115 Z" />
          <path d="M 180 138 C 210 135, 235 150, 230 158 C 200 160, 180 148, 180 138 Z" />
        </g>
      </svg>
    </div>
  );
}
