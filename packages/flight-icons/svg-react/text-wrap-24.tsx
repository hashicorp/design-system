import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconTextWrap24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M2.75 3.25A.75.75 0 013.5 4v16A.75.75 0 012 20V4a.75.75 0 01.75-.75zM21.25 3.25A.75.75 0 0122 4v16a.75.75 0 01-1.5 0V4a.75.75 0 01.75-.75zM14.913 8.515c.966.067 1.886.376 2.524 1.026.718.731.918 1.642.918 2.418 0 .777-.236 1.76-.91 2.467-.688.722-1.81 1.074-2.948 1.074h-4.185l.72.72.051.056a.75.75 0 01-1.056 1.056l-.056-.052-2-2-.043-.047a.748.748 0 01-.078-.112l-.022-.043-.02-.04-.012-.035a.74.74 0 01-.035-.14l-.004-.02a.75.75 0 01.012-.252.744.744 0 01.04-.124c.003-.012.009-.023.014-.034a.745.745 0 01.044-.081l.02-.03a.75.75 0 01.084-.102l2-2a.75.75 0 011.112 1.004l-.052.056-.72.72h4.186c.885 0 1.55-.28 1.862-.608.327-.343.495-.903.495-1.433 0-.531-.133-1.007-.487-1.367-.299-.305-.824-.53-1.548-.581L14.497 10H6.498a.75.75 0 110-1.5h8l.415.015z" />
                </g>
            </svg>
        );
    }
);
