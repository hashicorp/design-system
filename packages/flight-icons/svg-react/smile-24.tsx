import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSmile24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1m0 1.5c-5.247 0-9.5 4.253-9.5 9.5s4.253 9.5 9.5 9.5a9.5 9.5 0 0 0 0-19m3.513 10.778a.876.876 0 0 1 1.475.943l-.1.144a7.65 7.65 0 0 1-1.2 1.3c-.818.701-2.076 1.46-3.688 1.46s-2.871-.759-3.69-1.46a7.6 7.6 0 0 1-.948-.972 5 5 0 0 1-.35-.472.876.876 0 0 1 1.474-.944q.108.161.232.31a6 6 0 0 0 .729.748c.641.549 1.51 1.04 2.553 1.04s1.91-.491 2.551-1.04c.317-.271.564-.544.73-.747q.123-.149.232-.31M9.01 8a1 1 0 0 1 0 2H9a1 1 0 0 1 0-2zm6 0a1 1 0 1 1 0 2H15a1 1 0 0 1 0-2z"
                />
            </svg>
        );
    }
);
