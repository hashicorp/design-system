import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconVaultSecrets16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M7.543 10.338v1.66h.912V8.453H12v-.91h-1.663c-.386 0-.78.024-1.164.073l-.358.044.286-.222c.307-.238.6-.496.876-.771l1.176-1.176-.645-.644-1.175 1.175a9.613 9.613 0 00-.772.876l-.222.286.044-.357c.05-.385.074-.776.074-1.165V4h-.912v3.544H4v.912h1.663c.386 0 .78-.025 1.164-.074l.358-.044-.286.222a9.019 9.019 0 00-.876.771l-1.176 1.176.645.644 1.175-1.175c.274-.274.534-.57.772-.876l.222-.284-.044.357a9.254 9.254 0 00-.074 1.165z" />
                    <path d="M9.34 9.34v.644l1.166 1.167.645-.644L9.984 9.34h-.645zM4.847 5.493L6.014 6.66h.645v-.644L5.492 4.849l-.645.644z" />
                    <path
                        fillRule="evenodd"
                        d="M2.5.25A2.25 2.25 0 00.25 2.5v11a2.25 2.25 0 002.25 2.25h11a2.25 2.25 0 002.25-2.25v-11A2.25 2.25 0 0013.5.25h-11zM1.75 2.5a.75.75 0 01.75-.75h11a.75.75 0 01.75.75v11a.75.75 0 01-.75.75h-11a.75.75 0 01-.75-.75v-11z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
