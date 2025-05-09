import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconGoogleDriveColor24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#0066DA"
                    d="M3.512 18.427l.882 1.535c.183.323.447.576.756.761l3.15-5.492H2c0 .357.092.715.275 1.038l1.237 2.158z"
                />
                <path
                    fill="#00AC47"
                    d="M12 8.77L8.85 3.276c-.31.184-.573.438-.756.761l-5.82 10.154c-.179.316-.274.674-.274 1.039h6.3L12 8.769z"
                />
                <path
                    fill="#EA4335"
                    d="M18.85 20.723c.31-.185.573-.438.756-.761l.366-.635 1.753-3.058c.183-.323.275-.68.275-1.038h-6.3l1.34 2.654 1.81 2.838z"
                />
                <path
                    fill="#00832D"
                    d="M12 8.77l3.15-5.493A2.003 2.003 0 0014.119 3H9.881a2.12 2.12 0 00-1.031.277L12 8.769z"
                />
                <path
                    fill="#2684FC"
                    d="M15.7 15.23H8.3l-3.15 5.493c.31.185.665.277 1.031.277H17.82a2.12 2.12 0 001.031-.277l-3.15-5.492z"
                />
                <path
                    fill="#FFBA00"
                    d="M18.816 9.115l-2.91-5.077a2.089 2.089 0 00-.756-.761L12 8.769l3.7 6.462h6.288c0-.358-.091-.716-.274-1.039l-2.898-5.077z"
                />
            </svg>
        );
    }
);
