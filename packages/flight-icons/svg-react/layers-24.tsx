import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconLayers24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M21.895 16.089a.75.75 0 01.71 1.321l-10.25 5.5a.753.753 0 01-.71 0l-10.25-5.5a.752.752 0 01-.306-1.015.752.752 0 011.015-.306L12 21.399l9.896-5.31zm0-5a.75.75 0 01.71 1.321l-10.25 5.5a.753.753 0 01-.71 0l-10.25-5.5a.752.752 0 01-.306-1.015.752.752 0 011.015-.306L12 16.399l9.896-5.31zM11.657 1.082c.214-.11.47-.11.685 0l10.25 5.25a.75.75 0 010 1.335l-10.25 5.25a.754.754 0 01-.685 0l-10.25-5.25a.753.753 0 010-1.335l10.25-5.25zM3.395 7L12 11.407 20.605 7 12 2.593 3.395 7z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
