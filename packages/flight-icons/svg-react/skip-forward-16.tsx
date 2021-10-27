import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconSkipForward16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
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
                <g fill={color}>
                    <path
                        fillRule="evenodd"
                        d="M4.76 2.5C3.6 1.682 2 2.51 2 3.93v8.14c0 1.419 1.6 2.248 2.76 1.43l5.765-4.07a1.75 1.75 0 000-2.86L4.76 2.5zM3.5 3.93a.25.25 0 01.394-.204l5.766 4.07a.25.25 0 010 .408l-5.766 4.07a.25.25 0 01-.394-.204V3.93z"
                        clipRule="evenodd"
                    />
                    <path d="M14 3a.75.75 0 00-1.5 0v10a.75.75 0 001.5 0V3z" />
                </g>
            </svg>
        );
    }
);
