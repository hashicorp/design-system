import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMicrosoftTeamsColor24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#5059c9"
                    d="M15.95 9.75h5.166c.488 0 .884.383.884.855v4.553c0 1.735-1.454 3.142-3.248 3.142h-.015c-1.794 0-3.248-1.406-3.249-3.142v-4.961c0-.247.207-.447.462-.447M19.442 8.85c1.156 0 2.093-.907 2.093-2.025S20.598 4.8 19.442 4.8s-2.093.907-2.093 2.025.937 2.025 2.093 2.025"
                />
                <path
                    fill="#7b83eb"
                    d="M12.93 8.85c1.67 0 3.024-1.31 3.024-2.925S14.6 3 12.93 3 9.907 4.31 9.907 5.925 11.261 8.85 12.93 8.85M16.961 9.75H8.434c-.482.012-.864.399-.853.865v5.193c-.067 2.8 2.223 5.124 5.117 5.192 2.893-.069 5.183-2.392 5.116-5.192v-5.193c.011-.466-.37-.853-.853-.865"
                />
                <path
                    fill="#000"
                    d="M13.163 9.75v7.276a.83.83 0 0 1-.53.761.9.9 0 0 1-.321.063H7.99a5.316 5.316 0 0 1-.41-2.043v-5.193c-.01-.466.37-.852.851-.864z"
                    opacity={0.1}
                />
                <path
                    fill="#000"
                    d="M12.698 9.75v7.727a.8.8 0 0 1-.066.31.86.86 0 0 1-.786.513H8.21a6 6 0 0 1-.218-.45 5.316 5.316 0 0 1-.41-2.043v-5.193c-.01-.466.37-.852.851-.864z"
                    opacity={0.2}
                />
                <path
                    fill="#000"
                    d="M12.698 9.75v6.826a.844.844 0 0 1-.852.824H7.828a5.3 5.3 0 0 1-.247-1.593v-5.193c-.01-.466.37-.852.851-.864z"
                    opacity={0.2}
                />
                <path
                    fill="#000"
                    d="M12.233 9.75v6.826a.844.844 0 0 1-.852.824H7.828a5.3 5.3 0 0 1-.247-1.593v-5.193c-.01-.466.37-.852.851-.864z"
                    opacity={0.2}
                />
                <path
                    fill="#000"
                    d="M13.163 7.424V8.84c-.08.005-.154.01-.233.01s-.153-.005-.232-.01a2.6 2.6 0 0 1-.465-.072A3 3 0 0 1 10.14 7.05a2.4 2.4 0 0 1-.15-.45h2.322c.469.002.849.37.85.824"
                    opacity={0.1}
                />
                <path
                    fill="#000"
                    d="M12.698 7.874v.967a2.6 2.6 0 0 1-.465-.072A3 3 0 0 1 10.14 7.05h1.707c.469.002.849.37.85.824"
                    opacity={0.2}
                />
                <path
                    fill="#000"
                    d="M12.698 7.874v.967a2.6 2.6 0 0 1-.465-.072A3 3 0 0 1 10.14 7.05h1.707c.469.002.849.37.85.824"
                    opacity={0.2}
                />
                <path
                    fill="#000"
                    d="M12.233 7.874v.895A3 3 0 0 1 10.14 7.05h1.242c.469.002.849.37.85.824"
                    opacity={0.2}
                />
                <path
                    fill="url(#microsoft-teams-color-24__a)"
                    d="M2.853 7.05h8.527c.47 0 .852.37.852.825v8.25c0 .456-.381.825-.852.825H2.853c-.471 0-.853-.37-.853-.825v-8.25c0-.456.382-.825.853-.825"
                />
                <path
                    fill="#fff"
                    d="M9.36 10.19H7.655v4.491H6.57v-4.49H4.873v-.872H9.36z"
                />
                <defs>
                    <linearGradient
                        id="microsoft-teams-color-24__a"
                        x1={3.778}
                        x2={10.13}
                        y1={6.406}
                        y2={17.776}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#5a62c3" />
                        <stop offset={0.5} stopColor="#4d55bd" />
                        <stop offset={1} stopColor="#3940ab" />
                    </linearGradient>
                </defs>
            </svg>
        );
    }
);
