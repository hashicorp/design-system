import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPhone24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M6.898 1a2.81 2.81 0 0 1 2.808 2.414v.007c.124.93.352 1.845.68 2.724l-.702.265.703-.263.064.189a2.81 2.81 0 0 1-.697 2.772l-.003.003-.897.895a15.7 15.7 0 0 0 5.124 5.112l.9-.9a2.82 2.82 0 0 1 2.964-.63c.882.328 1.8.556 2.732.678l.007.001a2.81 2.81 0 0 1 2.418 2.85c-.011.452-.003 2.419 0 2.959v.105a2.81 2.81 0 0 1-3.064 2.808l-.013-.002a21.2 21.2 0 0 1-9.222-3.273c-2.764-1.79-4.607-3.622-6.406-6.394a21.1 21.1 0 0 1-3.282-9.248V4.06A2.81 2.81 0 0 1 3.808 1zM3.81 2.5a1.33 1.33 0 0 0-.968.426 1.31 1.31 0 0 0-.337.994c.326 3.06 1.37 6 3.046 8.583 1.684 2.594 3.375 4.276 5.963 5.95a19.7 19.7 0 0 0 8.562 3.042c.18.015.362-.006.533-.064a1.32 1.32 0 0 0 .781-.716c.073-.166.11-.346.11-.528l-.001-.1c-.003-.529-.011-2.528 0-3.007a1.31 1.31 0 0 0-1.124-1.327 14 14 0 0 1-3.057-.76l-.001-.001a1.32 1.32 0 0 0-1.384.293v.002l-1.307 1.303a.75.75 0 0 1-.9.122 17.23 17.23 0 0 1-6.466-6.453.75.75 0 0 1 .122-.903L8.69 8.051a1.308 1.308 0 0 0 .294-1.377v-.001a14 14 0 0 1-.763-3.051A1.31 1.31 0 0 0 6.91 2.5z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
