import React from 'react';
import { useSelector } from 'react-redux';
import { EntryPreviews, PreviewContext } from '../../../../components';
import { IEntry } from '../../../../models/entry';
import { selectLanguages } from '../../../../selectors';

export type ByLanguageProps = {
    onEntrySelect: (entry: IEntry) => void;
    unfilteredEntries: IEntry[];
    context?: PreviewContext;
};

export const ByLanguage: React.FC<ByLanguageProps> = ({
    onEntrySelect,
    unfilteredEntries,
    context
}) => {
    const languages = useSelector(selectLanguages);

    return (
        <>
            <EntryPreviews
                title='Language-Agnostic Concepts'
                onEntrySelect={onEntrySelect}
                entries={unfilteredEntries.filter((e) => !e.language)}
                context={context}
            />

            {Object.keys(languages).map((l) =>
                l ? (
                    <EntryPreviews
                        key={`previews-${l}`}
                        title={l}
                        onEntrySelect={onEntrySelect}
                        entries={unfilteredEntries.filter(
                            (e) => e.language === languages[l]
                        )}
                        context={context}
                    />
                ) : null
            )}
        </>
    );
};
