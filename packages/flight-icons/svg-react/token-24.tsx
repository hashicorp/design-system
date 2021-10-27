import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconToken24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden={!title}
                ref={svgRef}
                aria-labelledby={titleId}
                {...props}
            >
                {title ? <title id={titleId}>{title}</title> : null}
                <g fill={color} fillRule="evenodd" clipRule="evenodd">
                    <path d="M8.762 5.228L5.227 8.763a1.75 1.75 0 000 2.475l3.535 3.535a1.75 1.75 0 002.475 0l3.536-3.535a1.75 1.75 0 000-2.475l-3.536-3.535a1.75 1.75 0 00-2.475 0zM6.287 9.824l3.536-3.536a.25.25 0 01.354 0l3.535 3.536a.25.25 0 010 .353l-3.535 3.536a.25.25 0 01-.354 0l-3.536-3.536a.25.25 0 010-.353z" />
                    <path d="M1 10a9 9 0 0117.043-4.043A9 9 0 115.957 18.043 9 9 0 011 10zm9-7.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15zm9 7.5c0-.594-.058-1.174-.167-1.736A7.5 7.5 0 118.264 18.833 9 9 0 0019 10z" />
                </g>
            </svg>
        );
    }
);
