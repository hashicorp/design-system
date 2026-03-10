import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAlertDiamond16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M6.407.752a2.253 2.253 0 013.183 0l5.656 5.657a2.252 2.252 0 010 3.182L9.59 15.247a2.253 2.253 0 01-3.183 0L.751 9.591a2.252 2.252 0 010-3.182L6.407.752zm2.122 1.06a.752.752 0 00-1.06 0L1.812 7.47a.752.752 0 000 1.06l5.657 5.657a.752.752 0 001.06 0l5.656-5.657a.752.752 0 000-1.06L8.53 1.813zM8.007 10c.551 0 .999.449 1 1 0 .551-.449 1-1 1H8c-.551 0-1-.449-1-1 0-.551.449-.999 1-1h.007zm-.007-5c.413 0 .75.337.75.75v2.5c0 .413-.337.75-.75.75a.752.752 0 01-.75-.75v-2.5c0-.413.337-.749.75-.75z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
