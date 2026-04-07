import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconHeart24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M16.855 3c.804 0 1.602.155 2.346.457a6.2 6.2 0 0 1 1.993 1.305 6 6 0 0 1 1.336 1.956 5.93 5.93 0 0 1 0 4.626 6 6 0 0 1-1.336 1.957l-8.67 8.485a.75.75 0 0 1-1.048 0l-8.67-8.485A5.97 5.97 0 0 1 1 9.03c0-1.604.651-3.14 1.806-4.27A6.2 6.2 0 0 1 7.146 3c1.624 0 3.185.631 4.338 1.76l.516.504.515-.503a6.2 6.2 0 0 1 1.993-1.305A6.3 6.3 0 0 1 16.855 3m0 1.5c-.613 0-1.219.118-1.784.347a4.7 4.7 0 0 0-1.506.986l-1.04 1.018a.75.75 0 0 1-1.05 0l-1.04-1.018a4.7 4.7 0 0 0-3.29-1.332c-1.237 0-2.42.48-3.29 1.332A4.47 4.47 0 0 0 2.5 9.031c0 1.196.485 2.347 1.354 3.198L12 20.2l8.145-7.971c.43-.422.771-.92 1.003-1.47a4.43 4.43 0 0 0 0-3.456 4.5 4.5 0 0 0-1.003-1.47 4.7 4.7 0 0 0-1.508-.986 4.75 4.75 0 0 0-1.782-.347"
                />
            </svg>
        );
    }
);
