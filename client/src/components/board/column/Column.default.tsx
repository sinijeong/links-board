import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { ColumnInner } from '..';
import { Card, Element, List } from '../../../types';

export const ColumnDefaultOuter = styled.div`
  width: 340px;
  flex: 0 0 auto;
`;

export const ColumnDefaultInner = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  background: ${(p) => p.theme.palette['grey1']};
  border-radius: ${(p) => p.theme.radii['small']}px;
`;

export interface ColumnDefaultProps {
  index: number;
  list: List;
  cards: Card[];
  isLoading: boolean;
  code: string;
  onEditTitle: (title: string, id?: string) => void;
  onDeleteElement: (payload: Element) => void;
  onAddElement: (payload: Element) => void;
  onInputBlurred: (payload: React.ChangeEvent<HTMLInputElement>) => void;
}

const ColumnDefault = ({
  index,
  list,
  cards,
  isLoading,
  code,
  onEditTitle,
  onDeleteElement,
  onAddElement,
  onInputBlurred,
}: ColumnDefaultProps) => {
  const children = (
    <ColumnInner
      index={index}
      list={list}
      cards={cards}
      isLoading={isLoading}
      code={code}
      onEditTitle={onEditTitle}
      onDeleteElement={onDeleteElement}
      onAddElement={onAddElement}
      onInputBlurred={onInputBlurred}
    />
  );

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <ColumnDefaultOuter
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <ColumnDefaultInner {...provided.dragHandleProps}>
            {children}
          </ColumnDefaultInner>
        </ColumnDefaultOuter>
      )}
    </Draggable>
  );
};

export default ColumnDefault;
