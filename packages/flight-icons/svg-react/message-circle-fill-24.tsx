import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMessageCircleFill24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M13.75 14a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1 0-1.5zM11.75 11a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1 0-1.5zM15.75 8a.75.75 0 0 1 0 1.5h-7a.75.75 0 0 1 0-1.5z" />
                    <path
                        fillRule="evenodd"
                        d="M12.343 2C17.676 2 22 6.324 22 11.657s-4.324 9.657-9.657 9.657a9.6 9.6 0 0 1-4.4-1.057 2 2 0 0 0-.397.047c-.331.064-.757.185-1.228.341-1.113.37-2.194.825-3.27 1.293a.751.751 0 0 1-.981-.998q.13-.288.253-.578a37 37 0 0 0 1.025-2.628c.16-.478.286-.914.352-1.255a2.3 2.3 0 0 0 .048-.418 9.6 9.6 0 0 1-1.06-4.404C2.685 6.324 7.009 2 12.343 2m0 1.5a8.158 8.158 0 0 0-7.24 11.922c.129.246.145.514.142.7a4 4 0 0 1-.075.643 12 12 0 0 1-.403 1.447 32 32 0 0 1-.606 1.63c.527-.209 1.119-.431 1.684-.62.494-.164.991-.309 1.417-.39.211-.042.428-.072.628-.075.18-.003.445.013.688.14A8.158 8.158 0 1 0 12.343 3.5"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
