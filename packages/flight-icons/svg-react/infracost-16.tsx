import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconInfracost16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M3.8 1h8.4A2.8 2.8 0 0115 3.8v8.4a2.8 2.8 0 01-2.8 2.8H3.8A2.8 2.8 0 011 12.2V3.8A2.8 2.8 0 013.8 1zm1.05 4.018c0-.093.075-.168.168-.168h.21c.093 0 .168.075.168.168v1.764a.168.168 0 01-.168.168h-.21a.168.168 0 01-.168-.168V5.018zm.945-.168a.168.168 0 00-.168.168v1.764c0 .093.075.168.168.168h.21a.168.168 0 00.168-.168V5.018a.168.168 0 00-.168-.168h-.21zm.61.168c0-.093.074-.168.167-.168h.21c.093 0 .168.075.168.168V6.95h-.378a.168.168 0 01-.168-.168V5.018zM6.95 6.95l2.1-2.1c1.008 0 2.1.808 2.1 2.1 0 .862-.004 1.873-.007 2.724a500.5 500.5 0 00-.004 1.476H9.05V8c0-.378-.326-1.05-1.04-1.05H6.95zm0 0v4.032a.168.168 0 01-.168.168h-.21a.168.168 0 01-.168-.168V7.635c0-.089.036-.174.099-.237l.447-.448zm-2.1 2.24c0-.09.036-.175.099-.238l.375-.376a.042.042 0 01.072.03v2.376a.168.168 0 01-.168.168h-.21a.168.168 0 01-.168-.168V9.189zm.777-.778c0-.089.035-.174.098-.237l.376-.376a.042.042 0 01.072.03v3.153a.168.168 0 01-.168.168h-.21a.168.168 0 01-.168-.168v-2.57z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
