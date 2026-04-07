import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSkipBack24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M17.235 4.512C18.394 3.688 20 4.516 20 5.937v12.125c-.001 1.42-1.606 2.248-2.765 1.425l-8.524-6.061a1.75 1.75 0 0 1 0-2.853zM5.25 4.25A.75.75 0 0 1 6 5v14c0 .413-.336.75-.75.75A.75.75 0 0 1 4.5 19V5a.75.75 0 0 1 .75-.75M18.5 5.937a.25.25 0 0 0-.395-.203l-8.524 6.062a.25.25 0 0 0 0 .407l8.525 6.063a.25.25 0 0 0 .394-.204z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
