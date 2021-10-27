import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconAwsEc2Color24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#9D5025"
                    d="M3.003 4.47L2 4.967v14.064l1.003.499 4.06-7.167-4.06-7.895z"
                />
                <path
                    fill="#F58536"
                    d="M5.341 18.985l-2.338.546V4.469L5.341 5v13.985z"
                />
                <path
                    fill="#9D5025"
                    d="M4.11 3.918L5.34 3.31l5.852 9.324-5.852 8.058-1.232-.61V3.919z"
                />
                <path
                    fill="#F58536"
                    d="M8.257 19.872l-2.916.819V3.309l2.916.822v15.74z"
                />
                <path
                    fill="#9D5025"
                    d="M6.714 2.624l1.543-.767 8.633 11.796-8.633 8.49-1.543-.767V2.624z"
                />
                <path
                    fill="#F58536"
                    d="M11.997 20.784l-3.74 1.359V1.857l3.74 1.362v17.565z"
                />
                <path
                    fill="#9D5025"
                    d="M10.002.991L11.997 0l9.34 12.68L11.997 24l-1.995-.991V.99z"
                />
                <path fill="#F58536" d="M22 19.03L11.997 24V0L22 4.97v14.06z" />
            </svg>
        );
    }
);
