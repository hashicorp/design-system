import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMessageCircle24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12.343 2C17.676 2 22 6.324 22 11.657s-4.324 9.657-9.657 9.657a9.6 9.6 0 0 1-4.4-1.057h-.029q-.12 0-.368.047c-.331.064-.757.185-1.228.341a37 37 0 0 0-2.619 1.01l-.002.001-.648.282a.751.751 0 0 1-.981-.998l.003-.01.013-.029.052-.114.184-.425a37 37 0 0 0 1.025-2.628c.16-.478.286-.914.352-1.255a2.3 2.3 0 0 0 .048-.418 9.6 9.6 0 0 1-1.06-4.404C2.685 6.324 7.009 2 12.343 2m0 1.5a8.158 8.158 0 0 0-7.24 11.922c.129.246.145.514.142.7a4 4 0 0 1-.075.643 12 12 0 0 1-.403 1.447c-.185.55-.402 1.12-.606 1.63.527-.209 1.119-.431 1.684-.62.494-.164.991-.309 1.417-.39.211-.042.428-.072.628-.075.18-.003.445.013.688.14A8.158 8.158 0 1 0 12.343 3.5"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
