import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconRunning24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g>
                    <g fill={color} fillRule="evenodd" clipRule="evenodd">
                        <path d="M12 2.5a9.47 9.47 0 00-6.88 2.948.75.75 0 01-1.085-1.034A10.97 10.97 0 0112 1a10.97 10.97 0 017.965 3.414.75.75 0 11-1.086 1.034A9.47 9.47 0 0012 2.5zM2.351 8.451a.75.75 0 01.515.928A9.506 9.506 0 002.5 12c0 4.48 3.102 8.237 7.276 9.238a.75.75 0 01-.35 1.459C4.593 21.537 1 17.189 1 12c0-1.051.148-2.07.424-3.034a.75.75 0 01.927-.515zm19.297 0a.75.75 0 01.928.515C22.852 9.93 23 10.949 23 12c0 5.19-3.593 9.538-8.426 10.697a.75.75 0 11-.35-1.459c4.174-1 7.276-4.758 7.276-9.238 0-.91-.128-1.79-.366-2.621a.75.75 0 01.514-.928z" />
                        <path
                            d="M12 5.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM4 12a8 8 0 1116 0 8 8 0 01-16 0z"
                            opacity={0.2}
                        />
                    </g>
                    <animateTransform
                        attributeName="transform"
                        dur="1.1s"
                        from="0 12 12"
                        repeatCount="indefinite"
                        to="360 12 12"
                        type="rotate"
                    />
                </g>
            </svg>
        );
    }
);
