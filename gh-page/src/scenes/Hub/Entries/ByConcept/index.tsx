import React from 'react';
import { useSelector } from 'react-redux';
import { EntryPreviews, PreviewContext } from '../../../../components';
import { IEntry } from '../../../../models/entry';
import { selectConcepts } from '../../../../selectors';

export type ByConceptProps = {
    unfilteredEntries: IEntry[];
    context?: PreviewContext;
    onEntrySelect: (e: IEntry) => void;
};

export const ByConcept: React.FC<ByConceptProps> = ({ unfilteredEntries, context, onEntrySelect }) => {
    const concepts = useSelector(selectConcepts);

    return(
        <>
        {Object.keys(concepts).map((c) =>
            c ? (
                <EntryPreviews
                    key={`previews-${c}`}
                    title={c}
                    onEntrySelect={onEntrySelect}
                    entries={unfilteredEntries.filter(
                        (e) => concepts[c].indexOf(e.concept) !== -1
                    )}
                    context={context}
                />
            ) : null
        )}
        </>
    );
};
