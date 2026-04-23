import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMap24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M6.927 1.607a1.75 1.75 0 0 1 1.613-.064L16.099 5.1c.073.035.16.031.23-.01l5.053-2.886c1.166-.666 2.617.177 2.618 1.52V17.42c0 .627-.337 1.208-.882 1.52l-6.045 3.453a1.75 1.75 0 0 1-1.613.065L7.901 18.9a.25.25 0 0 0-.23.01l-5.053 2.887C1.452 22.463.001 21.62 0 20.277V6.581c0-.627.337-1.208.882-1.52zM8.5 17.525l.04.018 6.96 3.275V6.475l-.04-.017L8.5 3.183zm14-13.801a.25.25 0 0 0-.374-.217l-5.053 2.886-.073.04v14.275l5.374-3.071a.25.25 0 0 0 .126-.217zM1.626 6.364a.25.25 0 0 0-.126.217v13.696a.25.25 0 0 0 .374.217l5.053-2.887.073-.04V3.293z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
