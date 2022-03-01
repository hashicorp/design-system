import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconBoundaryColor24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill="#F24C53">
                    <path d="M6.586 22v-1.55H9.8v-.958H8.241v-1.56h7.356L12.18 12l3.417-5.934H8.058v8.229H4V2h13.964l2.33 4.046L16.866 12l3.498 6.074L18.103 22H6.586z" />
                    <path d="M7.21 17.932H5.656v1.56H7.21v-1.56zM5.556 20.438H4v1.56h1.556v-1.56z" />
                </g>
            </svg>
        );
    }
);
