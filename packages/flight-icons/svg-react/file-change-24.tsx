import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconFileChange24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M8.458 15.328c.218-.26.487-.58.899-.745a1.12 1.12 0 0 1 .778-.026c.324.1.766.356 1.313.95.667.726 1.325 1.17 1.979 1.37.667.204 1.27.135 1.774-.067a3.4 3.4 0 0 0 1.127-.768 5 5 0 0 0 .41-.459l.02-.022.032-.04.012-.013a.75.75 0 1 0-1.104-1.016q-.074.082-.156.18c-.218.26-.487.58-.899.745a1.12 1.12 0 0 1-.778.026c-.324-.1-.766-.356-1.313-.95-.667-.726-1.325-1.17-1.979-1.37a2.62 2.62 0 0 0-1.774.067 3.4 3.4 0 0 0-1.127.768 5 5 0 0 0-.326.356l-.085.103-.018.022-.045.053a.75.75 0 1 0 1.104 1.016q.074-.082.156-.18" />
                    <path
                        fillRule="evenodd"
                        d="M3 3.75A2.75 2.75 0 0 1 5.75 1h7.586c.464 0 .909.184 1.237.513l5.914 5.914c.329.328.513.773.513 1.237V20.25A2.75 2.75 0 0 1 18.25 23H5.75A2.75 2.75 0 0 1 3 20.25zM5.75 2.5c-.69 0-1.25.56-1.25 1.25v16.5c0 .69.56 1.25 1.25 1.25h12.5c.69 0 1.25-.56 1.25-1.25V9h-5.75a.75.75 0 0 1-.75-.75V2.5zm8.75 1.06 3.94 3.94H14.5z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
