import { Heading, Text } from '@codecademy/gamut';
import styled from '@emotion/styled';
import {
    Spacing,
    EntryPreviews,
    Search,
    PreviewContext,
} from '../../../components';
import React, { useCallback, useMemo, useState } from 'react';
import {
    selectConcepts,
    selectEntriesForConceptAndLanugage,
    selectLanguages,
} from '../../../selectors';
import { useSelector } from 'react-redux';
import { IStore } from '../../../models';
import { isValidForFilter } from '../../../helpers/filter';
import { useNavigate } from '@reach/router';
import { IEntry } from '../../../models/entry';
import { navigateToEntry } from '../../../helpers/navigate';
import { ByLanguage } from './ByLanguage';
import { Ungrouped } from './Ungrouped';
import { ByConcept } from './ByConcept';

export type HubEntriesProps = {
    concept: string;
    language: string;
};

export const HubEntries: React.FC<HubEntriesProps> = ({
    concept,
    language,
}) => {
    const languages = useSelector(selectLanguages);
    const concepts = useSelector(selectConcepts);
    const entries = useSelector((s: IStore) =>
        selectEntriesForConceptAndLanugage(s, concept, language)
    );

    // ==> Handle filtering
    const [filterTxt, setFilterTxt] = useState('');
    const unfilteredEntries = useMemo(() => {
        return entries.filter((e) =>
            isValidForFilter(e, filterTxt, languages, concepts)
        );
    }, [entries, filterTxt]);

    // ==> Handle navigation
    const navigate = useNavigate();
    const onEntrySelect = useCallback((entry: IEntry) => {
        navigateToEntry(navigate, entry);
    }, []);

    let previewContext = PreviewContext.NONE;

    if (concept) {
        previewContext |= PreviewContext.TITLE_WITH_LANGUAGE;
    }

    if (filterTxt) {
        previewContext |= PreviewContext.TAG_WITH_LANGUAGE;
        previewContext |= PreviewContext.TAG_WITH_KEYWORDS;
    }

    return (
        <EntrySection>
            <Heading as='h1' fontSize='xl'>
                Codepedia
            </Heading>

            <Search
                value={filterTxt}
                onChange={(e) => setFilterTxt(e.target.value)}
            />

            <Spacing size={1} />

            <Intro as='p' fontSize='md'>
                👋 Welcome to Codepedia! Community-driven code documentations
                and glossary for popular programming languages and frameworks.
                If you're interested in contributing, check out our&nbsp;
                <a href='https://github.com/codecademy/codepedia/blob/main/contribute.md'>
                    {`Contribution Guide.`}
                </a>
            </Intro>

            <Spacing size={2} />

            {concept ? (
                <ByConcept
                    onEntrySelect={onEntrySelect}
                    unfilteredEntries={unfilteredEntries}
                    context={previewContext}
                />
            ) : filterTxt ? (
                <Ungrouped
                    onEntrySelect={onEntrySelect}
                    unfilteredEntries={unfilteredEntries}
                    context={previewContext}
                />
            ) : (
                <ByLanguage
                    onEntrySelect={onEntrySelect}
                    unfilteredEntries={unfilteredEntries}
                    context={previewContext}
                />
            )}
        </EntrySection>
    );
};

const EntrySection = styled.div`
    padding: 2rem;
    overflow-y: auto;
    height: 100%;
    flex-grow: 1;
`;

const Intro = styled(Text)`
  line-height: 1.2
`;
