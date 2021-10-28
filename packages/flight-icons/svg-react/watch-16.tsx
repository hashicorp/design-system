import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconWatch16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = title
            ? 'title-' + Math.random().toString(36).substr(2, 9)
            : undefined;
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
                <g fill={color}>
                    <path d="M9 6.25a.75.75 0 00-1.5 0V8.5c0 .323.207.61.513.712l1.5.5a.75.75 0 10.474-1.424L9 7.96V6.25z" />
                    <path
                        fillRule="evenodd"
                        d="M4.574 1.932A2.25 2.25 0 016.8 0h2.398c1.12 0 2.07.823 2.227 1.932l.288 2.011A5.485 5.485 0 0113.5 8a5.485 5.485 0 01-1.786 4.057l-.288 2.011A2.25 2.25 0 019.2 16H6.801a2.25 2.25 0 01-2.227-1.932l-.288-2.011A5.485 5.485 0 012.5 8c0-1.606.688-3.051 1.786-4.057l.288-2.011zM5.95 13.106l.107.75a.75.75 0 00.743.644h2.398a.75.75 0 00.742-.644l.108-.75A5.485 5.485 0 018 13.5c-.724 0-1.416-.14-2.049-.394zm3.99-10.962l.108.75A5.485 5.485 0 008 2.5c-.724 0-1.416.14-2.049.394l.107-.75a.75.75 0 01.743-.644h2.398a.75.75 0 01.742.644zM4 8a4 4 0 118 0 4 4 0 01-8 0z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
