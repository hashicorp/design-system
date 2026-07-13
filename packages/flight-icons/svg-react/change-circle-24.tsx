import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconChangeCircle24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1m0 1.5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19M7.92 9.753a3 3 0 0 1 2.185-.089c.805.267 1.626.861 2.466 1.85.731.859 1.336 1.246 1.795 1.398a1.5 1.5 0 0 0 1.117-.04c.587-.255.98-.763 1.264-1.13q.099-.129.182-.228a.75.75 0 0 1 1.142.972l-.06.079c-.217.294-.92 1.244-1.932 1.682a3 3 0 0 1-2.184.089c-.805-.267-1.626-.861-2.466-1.85-.73-.859-1.335-1.246-1.794-1.398a1.5 1.5 0 0 0-1.118.04c-.587.255-.98.763-1.264 1.13q-.099.129-.182.228a.75.75 0 0 1-1.142-.972l.06-.079c.217-.293.92-1.244 1.932-1.682"
                />
            </svg>
        );
    }
);
