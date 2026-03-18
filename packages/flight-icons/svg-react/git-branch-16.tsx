import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconGitBranch16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 1a3 3 0 0 1 .719 5.913c-.303 3.219-2.801 5.638-6.06 5.825A3.001 3.001 0 1 1 3 9.095V2a.75.75 0 0 1 1.5 0v7.095a3 3 0 0 1 2.151 2.14c2.437-.175 4.28-1.944 4.562-4.34A3.002 3.002 0 0 1 12 1m-8.25 9.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m8.25-8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"
                />
            </svg>
        );
    }
);
