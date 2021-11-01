import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconDuplicate24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M3.75 1A2.75 2.75 0 001 3.75v10.5A2.75 2.75 0 003.75 17h1a.75.75 0 000-1.5h-1c-.69 0-1.25-.56-1.25-1.25V3.75c0-.69.56-1.25 1.25-1.25h10.5c.69 0 1.25.56 1.25 1.25v1a.75.75 0 001.5 0v-1A2.75 2.75 0 0014.25 1H3.75z" />
                    <path
                        fillRule="evenodd"
                        d="M9.75 7A2.75 2.75 0 007 9.75v10.5A2.75 2.75 0 009.75 23h10.5A2.75 2.75 0 0023 20.25V9.75A2.75 2.75 0 0020.25 7H9.75zM8.5 9.75c0-.69.56-1.25 1.25-1.25h10.5c.69 0 1.25.56 1.25 1.25v10.5c0 .69-.56 1.25-1.25 1.25H9.75c-.69 0-1.25-.56-1.25-1.25V9.75z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
