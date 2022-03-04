import * as React from 'react';

/**
 * Due to the internals of the SelectMenu provided by react-figma-ui
 * getting access to change events is non trivial, and setting default values
 * is tricky once you have multiple selects on a page
 *
 * This is a custom version of that component, where we've borrowed some styling,
 * but use the native html select and options elements
 */

interface VendoredSelectMenuProps<Value extends string> extends Readonly<React.HTMLProps<HTMLSelectElement>> {
    readonly id: string;
    readonly options: { value: Value; label: string; selected?: boolean }[];
    readonly handleChange: (value: Value) => void;
    // render(...optionData: [any, number, any[]]): React.ReactElement;
}

export function VendoredSelectMenu<Value extends string>({ handleChange, ...passThroughProps }: VendoredSelectMenuProps<Value>) {
    return (
        <>
            <select
                className={'select-menu__button'}
                style={{ fontSize: '11px' }}
                // we need to set the value here or React will complain
                value={passThroughProps.value}
                onChange={(event) => {
                    handleChange(event.target.value as any);
                }}
            >
                {passThroughProps.options.map((option) => {
                    return (
                        <option key={option.value} value={option.value} className="select-menu__label">
                            {option.label}
                        </option>
                    );
                })}
            </select>
        </>
    );
}
