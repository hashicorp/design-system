import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconDiscussionSquare24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = title
            ? 'title-' + Math.random().toString(36).substr(2, 9)
            : undefined;
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
                    <path d="M14.25 2A2.75 2.75 0 0117 4.75v.5a.75.75 0 01-1.5 0v-.5c0-.69-.56-1.25-1.25-1.25H3.75c-.69 0-1.25.56-1.25 1.25v10.94l2.531-2.026a.75.75 0 01.938 1.172l-3.75 3A.75.75 0 011 17.25V4.75A2.75 2.75 0 013.75 2h10.5z" />
                    <path
                        fillRule="evenodd"
                        d="M9.75 7A2.75 2.75 0 007 9.75v7.5A2.75 2.75 0 009.75 20h8.048c.284 0 .56.097.781.274l3.203 2.562A.75.75 0 0023 22.25V9.75A2.75 2.75 0 0020.25 7H9.75zM8.5 9.75c0-.69.56-1.25 1.25-1.25h10.5c.69 0 1.25.56 1.25 1.25v10.94l-1.984-1.587a2.75 2.75 0 00-1.718-.603H9.75c-.69 0-1.25-.56-1.25-1.25v-7.5z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
