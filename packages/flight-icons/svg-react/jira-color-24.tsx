import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconJiraColor24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#2684FF"
                    d="M22.252 11.392L11.985 1 1.748 11.362c-.33.334-.33.881 0 1.246l6.424 6.502L11.985 23l10.267-10.392a.87.87 0 000-1.216zm-10.267 3.86L8.773 12l3.212-3.251L15.197 12l-3.212 3.251z"
                />
                <path
                    fill="url(#jira-color-24__paint0_linear_4403_89)"
                    d="M11.985 8.749c-2.102-2.127-2.101-5.591-.03-7.719L4.93 8.14 8.743 12l3.242-3.251z"
                />
                <path
                    fill="url(#jira-color-24__paint1_linear_4403_89)"
                    d="M15.197 12l-3.212 3.251c2.101 2.127 2.101 5.592 0 7.749l7.055-7.14L15.197 12z"
                />
                <defs>
                    <linearGradient
                        id="jira-color-24__paint0_linear_4403_89"
                        x1={20.794}
                        x2={12.316}
                        y1={9.873}
                        y2={22.304}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset={0.176} stopColor="#0052CC" />
                        <stop offset={1} stopColor="#2684FF" />
                    </linearGradient>
                    <linearGradient
                        id="jira-color-24__paint1_linear_4403_89"
                        x1={12.6}
                        x2={17.131}
                        y1={18.498}
                        y2={14.022}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset={0.176} stopColor="#0052CC" />
                        <stop offset={1} stopColor="#2684FF" />
                    </linearGradient>
                </defs>
            </svg>
        );
    }
);
