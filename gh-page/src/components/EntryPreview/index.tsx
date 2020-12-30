import { IEntry } from '../../models/entry';
import React from 'react';
import { Card } from '@codecademy/gamut-labs';
import { Box, ButtonDeprecatedBase, Container } from '@codecademy/gamut';
import styled from '@emotion/styled';
import { toTitleCase } from '../../helpers/title';
import { Heading } from '../Heading';
import { Tag } from '../Tag';
import { colors } from '@codecademy/gamut-styles';

export enum PreviewContext {
    NONE = 0,
    TITLE_WITH_LANGUAGE = 1,
    TAG_WITH_LANGUAGE = 2,
    TAG_WITH_KEYWORDS = 4,
}

export type EntryPreviewProps = {
    entry: IEntry;
    onClick: () => void;
    context?: PreviewContext;
};

export const EntryPreview: React.FC<EntryPreviewProps> = ({
    entry,
    onClick,
    context = PreviewContext.NONE,
}) => {

    let title = toTitleCase(entry.title || entry.concept);
    if (context & PreviewContext.TITLE_WITH_LANGUAGE) {
        title = entry.language || 'Multiple Languages';
    }

    const keywords = new Set<string>();
    if (entry.keywords) {
        for (let k of entry.keywords) {
            if (!k) {
                continue;
            }
            if (k.indexOf('_') !== -1) {
                continue;
            }
            keywords.add(k.toLowerCase());
        }
    }

    const hasTags =
        context & PreviewContext.TAG_WITH_KEYWORDS ||
        context & PreviewContext.TAG_WITH_LANGUAGE;

    return (
        <ButtonDeprecatedBase onClick={onClick}>
            <StyledBox padding={16} variant='white' shadowOffset={4}>
                <Container justify='center' align='center' column>
                    <Heading as='h3' fontSize='xs'>
                        <span>{title}</span>
                    </Heading>

                    {/** LANGUAGE */}
                    {context & PreviewContext.TAG_WITH_LANGUAGE ? (
                        <TagContainer>
                            Language: 
                            <Tag>{entry.language || 'Multiple Languages'}</Tag>
                        </TagContainer>
                    ) : null}

                    {/** KEYWORDS */}
                    {context & PreviewContext.TAG_WITH_KEYWORDS ? (
                        <TagContainer>
                            Keywords:
                            {[...keywords].map((k) => (
                                <Tag key={`keyword-${k}`} subtle>
                                    {k}
                                </Tag>
                            ))}
                        </TagContainer>
                    ) : null}
                </Container>
            </StyledBox>
        </ButtonDeprecatedBase>
    );
};

const StyledBox = styled(Card)`
    cursor: pointer;
    width: 25vw;
`;

const TagContainer = styled(Container)`
    justify-content: flex-end;
    align-items: baseline;
    width: 100%;
    margin-top: 8px;
    margin-bottom: 4px;
    font-size: 0.9rem;
    color: rgba(0,0,0,0.6);

    > div {
        font-size: 0.9rem !important;
        color: ${colors.navy};
    }
`;
