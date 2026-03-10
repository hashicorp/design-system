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
                    d="M17.235 4.512C18.394 3.688 20 4.516 20 5.938v12.124c-.001 1.42-1.607 2.248-2.765 1.425l-8.524-6.061a1.75 1.75 0 010-2.853l8.524-6.061zM5.25 4.25A.75.75 0 016 5v14c0 .413-.336.75-.75.75A.751.751 0 014.5 19V5a.75.75 0 01.75-.75zM18.5 5.938a.25.25 0 00-.395-.204l-8.524 6.062a.25.25 0 000 .407l8.524 6.063a.251.251 0 00.395-.204V5.938z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
