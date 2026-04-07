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
                    fillRule="evenodd"
                    d="M.22.22a.75.75 0 0 1 .702-.2l10.432 2.476a.75.75 0 0 1 .564.587l.821 4.245a.75.75 0 0 1 .865.141l2.175 2.175c.14.14.22.332.22.53s-.08.39-.22.53l-5.075 5.075a.76.76 0 0 1-.53.22.76.76 0 0 1-.53-.22l-2.175-2.174a.75.75 0 0 1-.142-.866l-4.245-.82a.75.75 0 0 1-.586-.564L.02.923A.75.75 0 0 1 .22.22m8.84 12.855 1.114 1.114 4.014-4.015-1.114-1.114zM6.23 5.17A2.252 2.252 0 0 1 9.45 7.2 2.253 2.253 0 0 1 7.2 9.45a2.252 2.252 0 0 1-2.03-3.22L2.09 3.15l1.753 7.387 4.719.913 2.89-2.889-.915-4.718L3.151 2.09zm.97 1.28a.75.75 0 0 0 0 1.5.753.753 0 0 0 .75-.75.75.75 0 0 0-.75-.75"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
