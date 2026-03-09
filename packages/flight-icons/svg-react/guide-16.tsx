import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconGuide16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M5 2c1.154 0 2.106.353 2.772 1 .082.079.157.161.228.246.07-.085.146-.167.228-.246.666-.647 1.618-1 2.772-1h3.75c.69 0 1.25.56 1.25 1.25v8.5c0 .69-.56 1.25-1.25 1.25H11c-.896 0-1.475.205-1.809.448-.316.23-.441.51-.441.802a.75.75 0 11-1.5 0c0-.292-.125-.571-.441-.802C6.475 13.205 5.896 13 5 13H1.25C.56 13 0 12.44 0 11.75v-8.5C0 2.56.56 2 1.25 2H5zm-3.5 9.5H5c.878 0 1.64.159 2.25.467v-6.55c0-.552-.188-1.015-.522-1.34C6.394 3.754 5.846 3.5 5 3.5H1.5v8zm9.5-8c-.846 0-1.394.254-1.728.577-.334.325-.522.788-.522 1.34v6.55c.61-.309 1.372-.467 2.25-.467h3.5v-8H11z"
                />
            </svg>
        );
    }
);
