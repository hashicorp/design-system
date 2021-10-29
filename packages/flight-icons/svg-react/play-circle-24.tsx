import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconPlayCircle24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = title
            ? 'title-' + Math.random().toString(36).substr(2, 9)
            : undefined;
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
                    <path d="M10.712 6.143C9.548 5.377 8 6.213 8 7.605v8.79c0 1.393 1.548 2.228 2.712 1.462l6.68-4.395a1.75 1.75 0 000-2.924l-6.68-4.395zM9.5 7.605a.25.25 0 01.387-.209l6.681 4.395a.25.25 0 010 .418l-6.68 4.395a.25.25 0 01-.388-.209v-8.79z" />
                    <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM2.5 12a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z" />
                </g>
            </svg>
        );
    }
);
