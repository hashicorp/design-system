import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMicrosoftColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                <path fill="#f35325" d="M1 1h6.5v6.5H1z" />
                <path fill="#81bc06" d="M8.5 1H15v6.5H8.5z" />
                <path fill="#05a6f0" d="M1 8.5h6.5V15H1z" />
                <path fill="#ffba08" d="M8.5 8.5H15V15H8.5z" />
            </svg>
        );
    }
);
