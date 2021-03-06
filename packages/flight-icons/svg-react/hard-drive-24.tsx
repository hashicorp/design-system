import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconHardDrive24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M4 15.75a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75z" />
                    <path
                        fillRule="evenodd"
                        d="M7.202 3a2.75 2.75 0 00-2.428 1.46L1.32 10.958A2.75 2.75 0 001 12.248v6.002A2.75 2.75 0 003.75 21h16.5A2.75 2.75 0 0023 18.25v-6.002c0-.45-.11-.893-.321-1.29L19.226 4.46A2.75 2.75 0 0016.798 3H7.202zM6.098 5.164A1.25 1.25 0 017.202 4.5h9.596c.462 0 .887.255 1.104.664l3.366 6.336H2.732l3.366-6.336zM2.5 13v5.25c0 .69.56 1.25 1.25 1.25h16.5c.69 0 1.25-.56 1.25-1.25V13h-19z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
