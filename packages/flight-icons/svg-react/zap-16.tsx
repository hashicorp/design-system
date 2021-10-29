import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconZap16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = title
            ? 'title-' + Math.random().toString(36).substr(2, 9)
            : undefined;
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="none"
                viewBox="0 0 16 16"
                aria-hidden={!title}
                ref={svgRef}
                aria-labelledby={titleId}
                {...props}
            >
                {title ? <title id={titleId}>{title}</title> : null}
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M9.375.078a.75.75 0 01.402.82l-.889 4.418 5.485.908a.75.75 0 01.44 1.236l-7.292 8.285a.75.75 0 01-1.298-.643l.889-4.418-5.485-.908a.75.75 0 01-.44-1.236L8.479.255a.75.75 0 01.896-.177zm-6.17 8.439l4.918.815a.75.75 0 01.612.887l-.489 2.433 4.548-5.169-4.917-.814a.75.75 0 01-.612-.888l.489-2.432-4.548 5.168z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
