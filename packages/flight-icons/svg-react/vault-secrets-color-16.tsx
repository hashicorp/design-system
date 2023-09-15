import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconVaultSecretsColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#000"
                    d="M7.543 12v-1.662c0-.39.025-.78.074-1.165l.044-.357-.222.284a9.324 9.324 0 01-.772.876L5.492 11.15l-.645-.644L6.023 9.33c.273-.275.569-.533.876-.771l.286-.222-.358.044a9.288 9.288 0 01-1.164.074H4v-.912h3.545V4h.912v1.662c0 .39-.025.78-.074 1.165l-.044.357.222-.286c.238-.307.498-.6.772-.876l1.175-1.175.645.644-1.176 1.176a9.29 9.29 0 01-.876.77l-.286.223.358-.044a9.287 9.287 0 011.164-.074H12v.911H8.455v3.545h-.912V12zM9.34 9.984V9.34h.645l1.167 1.167-.645.644L9.34 9.984zM6.014 6.66L4.847 5.493l.645-.644 1.167 1.167v.644h-.645z"
                />
                <path
                    fill="#FFD814"
                    fillRule="evenodd"
                    d="M.25 2.5A2.25 2.25 0 012.5.25h11a2.25 2.25 0 012.25 2.25v11a2.25 2.25 0 01-2.25 2.25h-11A2.25 2.25 0 01.25 13.5v-11zm2.25-.75a.75.75 0 00-.75.75v11c0 .414.336.75.75.75h11a.75.75 0 00.75-.75v-11a.75.75 0 00-.75-.75h-11z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
