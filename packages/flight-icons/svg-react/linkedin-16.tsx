import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconLinkedin16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12.225 12.225h-1.778V9.44c0-.664-.012-1.518-.925-1.518-.926 0-1.068.723-1.068 1.47v2.833H6.676V6.499h1.707v.782h.024c.348-.594.996-.95 1.684-.925 1.802 0 2.135 1.186 2.135 2.728l-.001 3.14zM4.67 5.715a1.037 1.037 0 01-1.032-1.03c0-.567.466-1.033 1.032-1.033.566 0 1.031.466 1.032 1.032 0 .566-.466 1.032-1.032 1.032zm.889 6.51h-1.78V6.499h1.78v5.726zM13.11 2H2.885A.88.88 0 002 2.866v10.268a.88.88 0 00.885.866h10.226a.882.882 0 00.889-.866V2.865a.88.88 0 00-.889-.864z"
                />
            </svg>
        );
    }
);
