import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconLearnLink24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M18.75 1a.75.75 0 0 0 0 1.5h1.69l-2.97 2.97a.75.75 0 0 0 1.06 1.06l2.97-2.97v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75z" />
                    <path
                        fillRule="evenodd"
                        d="M11.856 5.09a.75.75 0 0 0-.712 0l-9.75 5.25a.75.75 0 0 0 0 1.32l2.627 1.415A.8.8 0 0 0 4 13.25v5.333a.75.75 0 0 0 .067.31l.683-.31-.683.31v.002l.002.003.003.006.007.016a2 2 0 0 0 .094.168c.061.101.151.234.277.387.251.308.643.694 1.23 1.072C6.857 21.306 8.772 22 11.82 22c3.043 0 4.827-.692 5.87-1.487.52-.397.838-.806 1.029-1.138a2.7 2.7 0 0 0 .244-.557q.008-.027.012-.048l.005-.018.001-.007.001-.004v-.001s0-.002-.733-.157l.734.155a.8.8 0 0 0 .016-.155V13.25q0-.091-.02-.175l2.626-1.415a.75.75 0 0 0 0-1.32zM17.5 13.87l-5.644 3.04a.75.75 0 0 1-.712 0L5.5 13.87v4.508q.042.061.11.146c.158.192.434.472.882.761.892.575 2.513 1.214 5.33 1.214 2.823 0 4.253-.641 4.959-1.18a2.4 2.4 0 0 0 .64-.695q.058-.101.079-.159zm-6 1.527L3.332 11 11.5 6.602 19.668 11z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
