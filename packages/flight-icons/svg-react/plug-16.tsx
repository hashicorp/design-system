import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPlug16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M4.62 1.82a1.6 1.6 0 012.26 0L8.5 3.44l1.72-1.72a.752.752 0 011.06 0c.29.294.29.77 0 1.061l-1.72 1.72 1.94 1.94 1.72-1.72a.752.752 0 011.06 0c.29.293.29.768 0 1.06l-1.72 1.72 1.606 1.606c.62.623.622 1.636 0 2.26a6.407 6.407 0 01-8.753.282l-2.108 2.108a.75.75 0 01-1.06-1.06l2.106-2.108A6.403 6.403 0 014.62 1.82zm1.2 1.061a.1.1 0 00-.14 0 4.903 4.903 0 000 6.933l.493.492a4.906 4.906 0 006.932 0 .103.103 0 000-.139L5.82 2.881z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
