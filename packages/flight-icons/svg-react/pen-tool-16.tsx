import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPenTool16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M.219.22a.75.75 0 0 1 .703-.2l10.432 2.476a.75.75 0 0 1 .563.587l.822 4.245a.75.75 0 0 1 .865.141l2.174 2.175c.14.14.22.332.22.53s-.08.39-.22.53l-5.075 5.075a.754.754 0 0 1-1.06 0l-2.175-2.174a.75.75 0 0 1-.141-.866l-4.245-.82a.75.75 0 0 1-.587-.564L.02.923A.75.75 0 0 1 .219.22m8.84 12.854 1.114 1.115 4.015-4.015-1.115-1.114zM6.229 5.17A2.252 2.252 0 0 1 9.45 7.2 2.253 2.253 0 0 1 7.2 9.45a2.252 2.252 0 0 1-2.03-3.22l-3.08-3.08 1.754 7.386 4.718.914 2.89-2.889-.915-4.718L3.15 2.09zm.97 1.28a.75.75 0 0 0 0 1.5c.414 0 .75-.336.75-.75a.75.75 0 0 0-.75-.75"
                />
            </svg>
        );
    }
);
