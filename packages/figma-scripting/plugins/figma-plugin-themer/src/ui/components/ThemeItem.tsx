import * as React from 'react';
import classnames from 'classnames';
import { Icon, Type } from 'react-figma-ui';

import { Theme } from '../../types/types';

export function ThemeItem({ theme, selected, onClickItem }: { theme: Theme; selected: boolean; onClickItem: Function; }) {
    const itemClassNames = classnames({
        'flex items-center gap-1 h-8 cursor-pointer': true,
        // light
        'text-gray-900': theme === 'light',
        'hover:text-black': theme === 'light',
        'bg-gray-100': theme === 'light',
        'hover:bg-gray-200': theme === 'light',
        // dark
        'text-gray-100': theme === 'dark',
        'hover:text-white': theme === 'dark',
        'bg-gray-700': theme === 'dark',
        'hover:bg-gray-900': theme === 'dark',
    });

    return (
        <div className={itemClassNames} onClick={() => { onClickItem(); }}>
            {selected ? (
                <Icon iconName="resolve-filled" colorName="blue" />
            ) : (
                <Icon iconName="theme" colorName="black3" />
            )}
            <Type size="small" className="flex-auto">{theme}</Type>
        </div>
    );
}
