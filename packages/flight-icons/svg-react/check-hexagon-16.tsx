import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconCheckHexagon16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M11.28 5.72a.75.75 0 010 1.06l-4 4a.75.75 0 01-1.06 0l-2-2a.75.75 0 011.06-1.06l1.47 1.47 3.47-3.47a.75.75 0 011.06 0z" />
                    <path
                        fillRule="evenodd"
                        d="M6.834.33a2.25 2.25 0 012.332 0l5.25 3.182A2.25 2.25 0 0115.5 5.436v5.128a2.25 2.25 0 01-1.084 1.924l-5.25 3.182a2.25 2.25 0 01-2.332 0l-5.25-3.182A2.25 2.25 0 01.5 10.564V5.436a2.25 2.25 0 011.084-1.924L6.834.33zm1.555 1.283a.75.75 0 00-.778 0l-5.25 3.181A.75.75 0 002 5.436v5.128a.75.75 0 00.361.642l5.25 3.181a.75.75 0 00.778 0l5.25-3.181a.75.75 0 00.361-.642V5.436a.75.75 0 00-.361-.642l-5.25-3.181z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
