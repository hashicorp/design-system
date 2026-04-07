import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPlug24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M15.22 2.879a.754.754 0 0 1 1.061 0c.29.292.29.768 0 1.06L13.48 6.741l3.906 3.905 2.927-2.926a.754.754 0 0 1 1.06 0c.29.292.29.768 0 1.06l-2.927 2.927 1.737 1.737c.907.911.908 2.39 0 3.3-3.318 3.317-8.66 3.38-12.058.192L4.393 20.67a.753.753 0 0 1-1.061 0 .75.75 0 0 1 0-1.06l3.73-3.73a8.67 8.67 0 0 1 .04-12.217 2.34 2.34 0 0 1 3.3 0l2.017 2.019zM9.34 4.723a.84.84 0 0 0-1.178 0 7.17 7.17 0 0 0 0 10.135l.825.824a7.17 7.17 0 0 0 10.135 0 .84.84 0 0 0 0-1.177z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
