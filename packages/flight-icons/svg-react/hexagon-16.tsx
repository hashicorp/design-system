import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconHexagon16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = useMemo(
            () =>
                title
                    ? 'title-' + Math.random().toString(36).substr(2, 9)
                    : undefined,
            [title]
        );
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
                    d="M6.834.33a2.25 2.25 0 0 1 2.332 0l5.25 3.182A2.25 2.25 0 0 1 15.5 5.436v5.128c0 .786-.412 1.517-1.084 1.924l-5.25 3.182a2.25 2.25 0 0 1-2.332 0l-5.25-3.182A2.25 2.25 0 0 1 .5 10.564V5.436c0-.786.412-1.517 1.084-1.924zm1.555 1.282a.75.75 0 0 0-.778 0l-5.25 3.183a.75.75 0 0 0-.361.64v5.13c0 .26.138.505.361.641l5.25 3.182a.75.75 0 0 0 .778 0l5.25-3.182a.75.75 0 0 0 .361-.642V5.436a.75.75 0 0 0-.361-.641z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
