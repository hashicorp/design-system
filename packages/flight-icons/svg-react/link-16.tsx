import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconLink16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M7.019 5.365c.555.04 1.1.2 1.589.467.488.267.916.638 1.25 1.084a.75.75 0 11-1.202.898 2.408 2.408 0 00-1.745-.953 2.414 2.414 0 00-1.007.145c-.32.12-.613.309-.855.55l-1.88 1.881a2.402 2.402 0 00-.669 1.68c.006.625.26 1.227.701 1.67a2.404 2.404 0 001.671.7 2.4 2.4 0 001.679-.667l1.07-1.07a.75.75 0 011.06 1.06l-1.083 1.085a3.9 3.9 0 01-2.738 1.092 3.904 3.904 0 01-2.72-1.14A3.902 3.902 0 011 11.13 3.902 3.902 0 012.093 8.39l1.894-1.894c.394-.394.872-.7 1.393-.896a3.915 3.915 0 011.639-.235zM11.142 1a3.895 3.895 0 012.766 6.598l-1.895 1.894c-.394.394-.87.7-1.393.896a3.912 3.912 0 01-1.638.235c-.555-.04-1.1-.2-1.588-.467a3.914 3.914 0 01-1.251-1.084.756.756 0 01.151-1.05.753.753 0 011.05.15c.204.274.469.503.768.668.3.163.636.262.977.287.34.024.687-.026 1.007-.145.32-.12.614-.309.856-.55l1.881-1.881A2.393 2.393 0 009.45 3.168L8.372 4.239a.752.752 0 01-1.06-.003.756.756 0 01.003-1.06l1.088-1.083A3.905 3.905 0 0111.142 1z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
