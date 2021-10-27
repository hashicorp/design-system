import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconBitbucket24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
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
                    d="M2.153 3.225A.64.64 0 012.643 3l18.715.003a.64.64 0 01.634.744L19.289 20.45a.644.644 0 01-.634.54H5.572a.874.874 0 01-.847-.717L2.008 3.743a.64.64 0 01.145-.518zm7.765 11.722h4.187l1.011-5.897H8.804l1.114 5.897z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
