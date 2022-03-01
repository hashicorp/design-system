import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMusic16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M13.5 3.687a.25.25 0 00-.293-.246l-6.5 1.121a.25.25 0 00-.207.247v7.348a2.75 2.75 0 01-2.318 2.716l-.678.107a2.164 2.164 0 01-.68-4.274L5 10.36V4.809c0-.852.613-1.58 1.452-1.725l6.5-1.121A1.75 1.75 0 0115 3.687v7.47a2.75 2.75 0 01-2.318 2.716l-.678.107a2.164 2.164 0 01-.68-4.274L13.5 9.36V3.687zM5 11.88l-1.94.309a.664.664 0 10.208 1.311l.678-.108A1.25 1.25 0 005 12.157v-.278zm6.56-.691l1.94-.31v.279a1.25 1.25 0 01-1.054 1.234l-.678.108a.664.664 0 11-.208-1.312z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
