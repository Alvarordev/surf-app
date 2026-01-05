import React from 'react'

interface WavesIconProps {
  className?: string
  color?: string
}

export const WavesIcon: React.FC<WavesIconProps> = ({
  className,
  color = '#626eec',
}) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 800 800"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlSpace="preserve"
      className={className}
      style={{
        fillRule: 'evenodd',
        clipRule: 'evenodd',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }}
    >
      <g transform="matrix(33.333333,0,0,33.333333,0,-0)">
        <path
          d="M2,6C2.6,6.5 3.2,7 4.5,7C7,7 7,5 9.5,5C10.8,5 11.4,5.5 12,6C12.6,6.5 13.2,7 14.5,7C17,7 17,5 19.5,5C20.8,5 21.4,5.5 22,6M2,10C2.6,10.5 3.2,11 4.5,11C7,11 7,9 9.5,9C10.8,9 11.4,9.5 12,10C12.6,10.5 13.2,11 14.5,11C17,11 17,9 19.5,9C20.8,9 21.4,9.5 22,10"
          style={{
            fill: 'none',
            fillRule: 'nonzero',
            stroke: '#000',
            strokeWidth: '5px',
          }}
        />
      </g>
      <g transform="matrix(33.333333,0,0,33.333333,0,0)">
        <path
          d="M2,6C2.6,6.5 3.2,7 4.5,7C7,7 7,5 9.5,5C10.8,5 11.4,5.5 12,6C12.6,6.5 13.2,7 14.5,7C17,7 17,5 19.5,5C20.8,5 21.4,5.5 22,6M2,10C2.6,10.5 3.2,11 4.5,11C7,11 7,9 9.5,9C10.8,9 11.4,9.5 12,10C12.6,10.5 13.2,11 14.5,11C17,11 17,9 19.5,9C20.8,9 21.4,9.5 22,10"
          style={{
            fill: 'none',
            fillRule: 'nonzero',
            stroke: color,
            strokeWidth: '2px',
          }}
        />
      </g>
    </svg>
  )
}
