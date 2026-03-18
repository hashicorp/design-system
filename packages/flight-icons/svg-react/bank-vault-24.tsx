import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconBankVault24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path
                        fillRule="evenodd"
                        d="M8 12a6 6 0 1 1 12 0 6 6 0 0 1-12 0m2.332-2.607A4.5 4.5 0 0 0 9.5 12c0 .972.308 1.872.832 2.607l1.45-1.45A2.5 2.5 0 0 1 11.5 12c0-.417.102-.81.283-1.156zm1.06-1.061 1.452 1.45A2.5 2.5 0 0 1 14 9.5c.417 0 .81.102 1.156.283l1.451-1.451A4.5 4.5 0 0 0 14 7.5a4.5 4.5 0 0 0-2.607.832m1.452 5.885-1.451 1.451A4.5 4.5 0 0 0 14 16.5a4.5 4.5 0 0 0 2.607-.832l-1.45-1.45A2.5 2.5 0 0 1 14 14.5a2.5 2.5 0 0 1-1.156-.283M18.5 12a4.5 4.5 0 0 1-.832 2.607l-1.45-1.45c.18-.346.282-.74.282-1.157s-.102-.81-.283-1.156l1.451-1.451A4.5 4.5 0 0 1 18.5 12M13 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0"
                        clipRule="evenodd"
                    />
                    <path d="M4.75 5a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-2.5A.75.75 0 0 1 4.75 5M5.5 15.75a.75.75 0 0 0-1.5 0v2.5a.75.75 0 0 0 1.5 0z" />
                    <path
                        fillRule="evenodd"
                        d="M1 4.75A2.75 2.75 0 0 1 3.75 2h16.5A2.75 2.75 0 0 1 23 4.75v14.5A2.75 2.75 0 0 1 20.25 22h-.125v1a.875.875 0 0 1-1.75 0v-1H5.625v1a.875.875 0 0 1-1.75 0v-1H3.75A2.75 2.75 0 0 1 1 19.25zM3.75 3.5c-.69 0-1.25.56-1.25 1.25v14.5c0 .69.56 1.25 1.25 1.25h16.5c.69 0 1.25-.56 1.25-1.25V4.75c0-.69-.56-1.25-1.25-1.25z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
