import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconConsulFill24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M2 0a2 2 0 00-2 2v20a2 2 0 002 2h20a2 2 0 002-2V2a2 2 0 00-2-2H2zm10.006 19A7 7 0 1116.74 6.85l-1.66 1.738a4.6 4.6 0 100 6.828l1.66 1.738A6.98 6.98 0 0112.006 19zm5.632-3.501a.573.573 0 110-1.147.573.573 0 010 1.147zm-5.677-1.982a1.517 1.517 0 11-.013-3.034 1.517 1.517 0 01.013 3.034zm6.336.027a.574.574 0 110-1.148.574.574 0 010 1.148zm-1.706-.072a.573.573 0 110-1.147.573.573 0 010 1.147zm1.706-1.862a.573.573 0 110-1.146.573.573 0 010 1.146zm-1.706.065a.574.574 0 110-1.147.574.574 0 010 1.147zm1.08-1.994a.574.574 0 11-.002-1.148.574.574 0 01.003 1.148z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
