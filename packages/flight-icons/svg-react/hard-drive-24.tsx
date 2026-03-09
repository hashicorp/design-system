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
                <path
                    fill={color}
                    d="M16.798 3a2.75 2.75 0 012.429 1.46l3.452 6.498c.21.397.321.84.321 1.29v6.002A2.75 2.75 0 0120.25 21H3.75A2.75 2.75 0 011 18.25v-6.002c0-.45.11-.893.321-1.29L4.773 4.46A2.75 2.75 0 017.203 3h9.595zM2.5 18.25c0 .69.56 1.25 1.25 1.25h16.5c.69 0 1.25-.56 1.25-1.25V13h-19v5.25zM5.25 15a.75.75 0 010 1.5h-.5a.75.75 0 010-1.5h.5zM7.202 4.5a1.25 1.25 0 00-1.103.663L2.732 11.5h18.536L17.9 5.163a1.25 1.25 0 00-1.103-.663H7.202z"
                />
            </svg>
        );
    }
);
