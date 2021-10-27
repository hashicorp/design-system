import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconDocsLink16 = forwardRef<SVGSVGElement, IconProps>(
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
                        d="M3.5 3.25a.75.75 0 01.75-.75H8A.75.75 0 008 1H4.25A2.25 2.25 0 002 3.25v9.5A2.25 2.25 0 004.25 15h8.5c.69 0 1.25-.56 1.25-1.25V7a.75.75 0 00-1.5 0v3H4.25c-.263 0-.515.045-.75.128V3.25zm0 9v.5c0 .414.336.75.75.75h8.25v-2H4.25a.75.75 0 00-.75.75z"
                        clipRule="evenodd"
                    />
                    <path d="M12.5 3.56v.69a.75.75 0 001.5 0v-2.5a.75.75 0 00-.75-.75h-2.5a.75.75 0 000 1.5h.69L9.47 4.47a.75.75 0 001.06 1.06l1.97-1.97z" />
                </g>
            </svg>
        );
    }
);
