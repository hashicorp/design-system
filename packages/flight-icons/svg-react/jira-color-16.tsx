import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconJiraColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#2684ff"
                    d="M15.323 7.558 7.99 0 .677 7.536c-.236.243-.236.64 0 .906l4.589 4.73L7.989 16l7.334-7.558a.64.64 0 0 0 0-.884M7.99 10.365 5.695 8l2.294-2.365L10.284 8z"
                />
                <path
                    fill="url(#jira-color-16__a)"
                    d="M7.99 5.635C6.487 4.088 6.487 1.57 7.967.022L2.95 5.193 5.673 8z"
                />
                <path
                    fill="url(#jira-color-16__b)"
                    d="m10.284 8-2.295 2.365C9.49 11.912 9.49 14.43 7.99 16l5.04-5.193z"
                />
                <defs>
                    <linearGradient
                        id="jira-color-16__a"
                        x1={14.282}
                        x2={8.076}
                        y1={6.453}
                        y2={15.39}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset={0.176} stopColor="#0052cc" />
                        <stop offset={1} stopColor="#2684ff" />
                    </linearGradient>
                    <linearGradient
                        id="jira-color-16__b"
                        x1={8.428}
                        x2={11.722}
                        y1={12.726}
                        y2={9.53}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset={0.176} stopColor="#0052cc" />
                        <stop offset={1} stopColor="#2684ff" />
                    </linearGradient>
                </defs>
            </svg>
        );
    }
);
