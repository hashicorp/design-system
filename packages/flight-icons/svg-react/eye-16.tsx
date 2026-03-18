import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconEye16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8 2c2.578 0 4.57 1.321 5.888 2.65.661.668 1.17 1.354 1.516 1.914.173.28.31.536.408.75q.073.162.122.311c.025.08.066.22.066.375 0 .154-.04.295-.066.375a3 3 0 0 1-.122.31c-.097.215-.235.47-.408.75-.346.561-.855 1.247-1.516 1.915C12.57 12.679 10.578 14 8 14s-4.57-1.321-5.888-2.65A11 11 0 0 1 .596 9.436a7 7 0 0 1-.408-.75 3 3 0 0 1-.122-.311A1.3 1.3 0 0 1 0 8c0-.154.04-.295.066-.375a3 3 0 0 1 .122-.31 7 7 0 0 1 .408-.75c.346-.561.855-1.247 1.516-1.915C3.43 3.321 5.422 2 8 2m0 1.5c-2.036 0-3.668 1.042-4.822 2.206a9.5 9.5 0 0 0-1.306 1.647A5 5 0 0 0 1.526 8l.03.067c.065.145.17.344.316.58a9.5 9.5 0 0 0 1.306 1.647C4.332 11.458 5.964 12.5 8 12.5s3.668-1.042 4.822-2.206a9.5 9.5 0 0 0 1.306-1.647A5 5 0 0 0 14.474 8l-.03-.067a5 5 0 0 0-.316-.58 9.5 9.5 0 0 0-1.306-1.647C11.668 4.542 10.036 3.5 8 3.5M8 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6m0 1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"
                />
            </svg>
        );
    }
);
