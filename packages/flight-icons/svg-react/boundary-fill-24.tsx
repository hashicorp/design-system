import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconBoundaryFill24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M2 0a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.81 19v-1.085h2.25v-.67H9.969v-1.093h5.149L12.726 12l2.392-4.154H9.84v5.76H7V5h9.775l1.631 2.832-2.4 4.168 2.448 4.252L16.873 19zm.438-2.848h-1.09v1.092h1.09zm-1.159 1.755H7v1.092h1.09z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
