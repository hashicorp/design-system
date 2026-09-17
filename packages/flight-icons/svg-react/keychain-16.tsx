import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconKeychain16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M10.027 1.14a2.708 2.708 0 1 1 4.138 3.49l-1.863 2.097a2.125 2.125 0 1 1-1.074-1.049l.614-.691a3.113 3.113 0 0 0-4.368 4.18.75.75 0 0 1-.11.897L4 13.552v.948h1.25v-1a.75.75 0 0 1 .75-.75h.895l1.568-1.917a.75.75 0 0 1 .799-.244q.43.133.908.135a3.11 3.11 0 0 0 3.111-3.112.75.75 0 0 1 1.5 0 4.612 4.612 0 0 1-5.456 4.535l-1.494 1.828a.75.75 0 0 1-.581.275h-.5v1A.75.75 0 0 1 6 16H3.25a.75.75 0 0 1-.75-.75V14H.75a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 1 .21-.52l3.208-3.328a4.613 4.613 0 0 1 6.327-5.91zM7.67 2.5a3.113 3.113 0 0 0-2.835 4.398 1.3 1.3 0 0 1-.232 1.437L1.5 11.552v.948h1.432l2.986-3.098a4.613 4.613 0 0 1 3.549-6.349 1 1 0 0 1-.118-.061 3.1 3.1 0 0 0-1.68-.492M10.375 7a.625.625 0 1 0 0 1.25.625.625 0 0 0 0-1.25m2.19-5.3a1.21 1.21 0 0 0-1.366.377l-.746.931c.89.054 1.711.36 2.394.848l.197-.223a1.207 1.207 0 0 0-.479-1.932"
                />
            </svg>
        );
    }
);
