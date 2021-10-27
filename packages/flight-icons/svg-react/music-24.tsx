import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconMusic24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
                ref={svgRef}
                aria-labelledby={titleId}
                {...props}
            >
                {title ? <title id={titleId}>{title}</title> : null}
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M20.5 4.27a.75.75 0 00-.873-.74l-9 1.5a.75.75 0 00-.627.74v13.286a2.75 2.75 0 01-2.298 2.712l-2 .334A2.75 2.75 0 012.5 19.389v-.445a2.75 2.75 0 012.298-2.712l3.702-.617V5.77c0-1.1.795-2.039 1.88-2.22l9-1.5A2.25 2.25 0 0122 4.271v12.785a2.75 2.75 0 01-2.298 2.712l-2 .334a2.75 2.75 0 01-3.202-2.713v-.445a2.75 2.75 0 012.298-2.712l3.702-.617V4.27zm0 10.865l-3.456.576A1.25 1.25 0 0016 16.944v.445c0 .773.694 1.36 1.456 1.233l2-.333a1.25 1.25 0 001.044-1.233v-1.92zM5.044 17.711l3.456-.576v1.92a1.25 1.25 0 01-1.045 1.234l-2 .333A1.25 1.25 0 014 19.39v-.445a1.25 1.25 0 011.045-1.233z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
