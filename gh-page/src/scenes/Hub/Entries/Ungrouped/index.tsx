import React from 'react';
import { EntryPreviews, PreviewContext } from '../../../../components';
import { IEntry } from '../../../../models/entry';

export type UngroupedProps = {
    onEntrySelect: (entry: IEntry) => void;
    unfilteredEntries: IEntry[];
    context?: PreviewContext;
};

export const Ungrouped: React.FC<UngroupedProps> = ({ onEntrySelect, unfilteredEntries, context }) => {
    return(
        <EntryPreviews
                title={"Relevant Entries"}
                onEntrySelect={onEntrySelect}
                entries={unfilteredEntries}
                context={context}
            />
    );
};
