import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPin24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13.616 3.483a1.753 1.753 0 012.463.011l4.425 4.425c.681.683.681 1.793 0 2.476l-2.612 2.611a.759.759 0 01-.53.22h-1.634l-2.024 2.025-.276 2.48c-.145 1.293-1.623 2.003-2.713 1.218-.772-.558-1.768-1.31-2.572-2.026l-3.861 3.861a.753.753 0 01-1.061 0 .751.751 0 010-1.06l3.861-3.861c-.716-.804-1.468-1.8-2.026-2.574-.786-1.09-.076-2.567 1.218-2.712l2.48-.275 1.963-1.964V6.643c0-.2.082-.395.225-.535l2.674-2.625zm1.403 1.072a.253.253 0 00-.353-.002l-2.449 2.405v1.69c0 .198-.08.39-.22.53l-2.369 2.37a.76.76 0 01-.447.215l-2.741.305c-.194.022-.257.219-.168.343.692.958 1.622 2.175 2.385 2.938.763.762 1.98 1.693 2.937 2.385a.22.22 0 00.343-.168l.305-2.742a.755.755 0 01.214-.448l2.431-2.43c.14-.14.332-.22.53-.22h1.634l2.393-2.393a.255.255 0 000-.353l-4.425-4.425z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
