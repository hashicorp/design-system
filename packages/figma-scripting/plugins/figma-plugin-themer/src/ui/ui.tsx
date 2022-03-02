import * as React from 'react';
import * as ReactDom from 'react-dom';

import { SectionTitle, Button, SelectMenuOption, Type } from 'react-figma-ui';
import { VendoredSelectMenu } from 'figma-plugin-shared/ui/components/VendoredSelectMenu';

import { Theme, Target } from '../types/types';
import { ThemeItem } from './components/ThemeItem';

import './ui.scss';

const App = () => {
    const [theme, setTheme] = React.useState<Theme>();
    const [selectedTarget, setSelectedTarget] = React.useState<Target>('selection');

    const applyThemeToSelection = () => {
        parent.postMessage(
            {
                pluginMessage: {
                    type: 'apply-theme',
                    message: {
                        theme: theme,
                        target: selectedTarget,
                    },
                },
            },
            '*'
        );
    };

    React.useEffect(() => {
        // this is how we read messages sent from the plugin controller
        window.onmessage = (event) => {
            // notice: when we receive the message from the plugin code to the UI, the data is inside a "pluginMessage" object
            // see: https://www.figma.com/plugin-docs/creating-ui/#sending-a-message-from-the-plugin-code-to-the-ui
            const { type, message } = event.data.pluginMessage;
            // console.log('window.onmessage', JSON.stringify(event.data), type, message);
            if (type === 'apply-theme') {
                // setStatus({ type: 'has-run-successfully' });
            }
        };
    }, []);

    return (
        <div className="grid h-full">
            <div className="flex flex-col">
                <div className="flex-auto p-2">
                    <SectionTitle>Select theme to apply:</SectionTitle>
                    <div className="flex flex-col gap-1 p-2">
                        <ThemeItem theme="light" selected={theme === 'light'} onClickItem={() => setTheme('light')} />
                        <ThemeItem theme="dark" selected={theme === 'dark'} onClickItem={() => setTheme('dark')} />
                    </div>
                </div>
                <div className="flex-none flex flex-row gap-2 p-2 border-t border-gray-200">
                    <VendoredSelectMenu
                        name="productGroupValue"
                        value={selectedTarget}
                        handleChange={(value) => {
                            console.log('onClickItem', 'light');
                            setSelectedTarget(value);
                        }}
                        id={'set-selected-target'}
                        options={[
                            { value: 'selection', label: 'Apply to selection' },
                            { value: 'page', label: 'Apply to page' },
                        ]}
                        // render={({ value, label }) => (
                        //     <SelectMenuOption value={value} key={value}>
                        //         {label}
                        //     </SelectMenuOption>
                        // )}
                    />
                    <Button tint="primary" disabled={!theme} onClick={applyThemeToSelection}>
                        Apply
                    </Button>
                </div>
            </div>
        </div>
    );
};

ReactDom.render(<App />, document.getElementById('react-app'));
