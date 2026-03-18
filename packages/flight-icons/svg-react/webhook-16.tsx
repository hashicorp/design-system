import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconWebhook16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M.703 9.677a.75.75 0 0 1 1.299.752 1.884 1.884 0 0 0 1.634 2.821 1.884 1.884 0 0 0 1.885-1.882.75.75 0 0 1 .75-.75h5.087c.228-.303.592-.499 1-.499h.007a1.25 1.25 0 0 1 0 2.5h-.007a1.25 1.25 0 0 1-1-.5h-4.42a3.387 3.387 0 0 1-6.688-.75c0-.615.165-1.194.453-1.692m7.222-6.795A1.25 1.25 0 0 1 9.08 4.606l2.16 3.572a3.383 3.383 0 0 1 4.51 3.19 3.384 3.384 0 0 1-4.232 3.276.75.75 0 0 1 .374-1.454 1.89 1.89 0 0 0 2.357-1.822c0-1.038-.844-1.88-1.886-1.88-.373 0-.72.107-1.012.292a.75.75 0 0 1-1.044-.244L7.793 5.375a1.25 1.25 0 0 1 .125-2.493zM7.918.75c1.275 0 2.384.705 2.96 1.742a.75.75 0 1 1-1.31.729 1.89 1.89 0 0 0-1.65-.971 1.884 1.884 0 0 0-1.886 1.882c0 .666.346 1.252.873 1.588a.75.75 0 0 1 .248 1.005l-2.368 4.144a1.25 1.25 0 0 1-1.146 1.75h-.007a1.25 1.25 0 0 1-.152-2.491l2.055-3.595a3.37 3.37 0 0 1-1.003-2.401A3.384 3.384 0 0 1 7.918.75"
                />
            </svg>
        );
    }
);
