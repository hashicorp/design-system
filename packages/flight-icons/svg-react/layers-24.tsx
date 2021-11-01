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
                <g fill={color}>
                    <path
                        fillRule="evenodd"
                        d="M11.658 1.082a.75.75 0 01.684 0l10.25 5.25a.75.75 0 010 1.336l-10.25 5.25a.75.75 0 01-.684 0l-10.25-5.25a.75.75 0 010-1.336l10.25-5.25zM3.395 7L12 11.407 20.605 7 12 2.593 3.395 7z"
                        clipRule="evenodd"
                    />
                    <path d="M1.089 16.395a.75.75 0 011.016-.306L12 21.399l9.895-5.31a.75.75 0 01.71 1.322l-10.25 5.5a.75.75 0 01-.71 0l-10.25-5.5a.75.75 0 01-.306-1.016z" />
                    <path d="M2.105 11.089a.75.75 0 00-.71 1.322l10.25 5.5a.75.75 0 00.71 0l10.25-5.5a.75.75 0 00-.71-1.322L12 16.399l-9.895-5.31z" />
                </g>
            </svg>
        );
    }
);
