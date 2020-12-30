import { IEntry } from '../../../models/entry';
import React from 'react';
import { Container, Markdown } from '@codecademy/gamut';
import styled from '@emotion/styled';
import { CodeBlock } from '../CodeBlock';
import { CrossCodepedia } from '../../../components/CrossCodepedia';
import { Loading } from '@codecademy/gamut-labs';
import { useSelector } from 'react-redux';
import { selectEntry } from '../../../selectors';
import { IStore } from '../../../models';
import { Spacing } from '../../../components';

export type EntryCardProps = {
    entry: IEntry;
};

export const EntryBody: React.FC<EntryCardProps> = ({ entry: e }) => {
    const entry = useSelector((s: IStore) =>
        selectEntry(s, e.concept, e.language || '')
    );
    const overrides = {
        code: {
            component: CodeBlock,
            allowedAttributes: ['className', 'class'],
        },
        Codepedia: {
            component: CrossCodepedia,
            allowedAttributes: ['concept', 'language'],
        },
        h1: {
            component: StyledH1,
        },
        h2: {
            component: StyledH2,
        },
        h3: {
            component: StyledH3,
        },
    };

    return (
        <FullSizeContainer column align='center' >
            {!entry?.mdBody ? (
              <>
                <Spacing size={5} />
                <Loading />
                </>
            ) : (
                <StyledCard>
                    <Markdown text={entry.mdBody} overrides={overrides} />
                </StyledCard>
            )}
        </FullSizeContainer>
    );
};

export const FullSizeContainer = styled(Container)`
  width: 100%;
  height: 100%;
`;

export const StyledCard = styled.div`
    margin: 2rem;
`;

const StyledH1 = styled.h1`
    font-size: 2.5rem;
`;
const StyledH2 = styled.h2`
    font-size: 2rem;
`;
const StyledH3 = styled.h3`
    font-size: 1.2rem;
`;
