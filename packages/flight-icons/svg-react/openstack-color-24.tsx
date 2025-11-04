import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconOpenstackColor24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#DA1A32"
                    d="M6.517 15.627v.731c0 .567.45 1.027 1.005 1.027h8.957c.555 0 1.005-.46 1.005-1.027v-.73H22v4.474C22 21.146 21.164 22 20.142 22H3.858C2.836 22 2 21.146 2 20.102v-4.475h4.517zm0-5.935v4.615H2V9.692h4.516zm15.483 0v4.615h-4.516V9.692H22zM20.142 2C21.164 2 22 2.854 22 3.9v4.473h-4.516v-.731c0-.567-.45-1.027-1.005-1.027H7.52c-.555 0-1.005.46-1.005 1.027v.73H2V3.9C2 2.854 2.836 2 3.858 2h16.284z"
                />
            </svg>
        );
    }
);
