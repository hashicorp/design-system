import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCloudCheck16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M10.72 9.22a.75.75 0 0 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 0 1 1.06-1.06l1.47 1.47zM3.932 1.373a6.03 6.03 0 0 1 6.24 1.28 6 6 0 0 1 1.504 2.284h.28c1.072 0 2.1.425 2.859 1.18a4.025 4.025 0 0 1-.666 6.238.75.75 0 1 1-.811-1.261q.226-.146.418-.336a2.526 2.526 0 0 0 0-3.578 2.55 2.55 0 0 0-1.8-.743h-.831a.75.75 0 0 1-.726-.561A4.5 4.5 0 0 0 9.14 3.74a4.53 4.53 0 0 0-4.688-.96 4.5 4.5 0 0 0-2.006 1.466 4.49 4.49 0 0 0-.482 4.735c.221.45.516.857.869 1.207a.75.75 0 0 1-1.056 1.066 5.984 5.984 0 0 1-.516-7.929 6 6 0 0 1 2.672-1.953"
                />
            </svg>
        );
    }
);
