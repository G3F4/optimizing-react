import React, { ChangeEvent, useCallback } from 'react';
import { Spec } from 'immutability-helper';
import { Invitation } from '../App';
import Item from './Item';

interface ItemContainerProps {
  invitation: Invitation;

  updateInvitations(spec: Spec<Invitation[]>): void;
}

const ItemContainer = (props: ItemContainerProps) => {
  const { updateInvitations, invitation } = props;
  const { id, expanded } = invitation;
  const handleInvitationToggle = useCallback(() => {
    updateInvitations({
      [id]: {
        expanded: {
          $set: !expanded,
        },
      },
    });
  }, [expanded, id, updateInvitations]);
  const handleNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    updateInvitations({
      [id]: {
        guestInfo: {
          name: {
            $set: event.target.value,
          },
        },
      },
    });
  }, [id, updateInvitations]);
  const handleLastNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    updateInvitations({
      [id]: {
        guestInfo: {
          lastName: {
            $set: event.target.value,
          },
        },
      },
    });
  }, [id, updateInvitations]);
  const handlePlusOneChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    updateInvitations({
      [id]: {
        guestInfo: {
          plusOne: {
            $set: event.target.checked,
          },
        },
      },
    });
  }, [id, updateInvitations]);
  const handleSexChange = useCallback((event: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
    // @ts-ignore
    updateInvitations({
      [id]: {
        guestInfo: {
          sex: {
            $set: event.target.value,
          },
        },
      },
    });
  }, [id, updateInvitations]);
  const handleTableChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    updateInvitations({
      [id]: {
        guestInfo: {
          table: {
            $set: event.target.value,
          },
        },
      },
    });
  }, [id, updateInvitations]);
  const handleSendByChange = useCallback((_event: ChangeEvent<{}>, value: string) => {
    // @ts-ignore
    updateInvitations({
      [id]: {
        guestInfo: {
          sendBy: {
            $set: value,
          },
        },
      },
    });
  }, [id, updateInvitations]);

  console.log(['ItemContainer.render'])

  return (
    <Item
      invitation={invitation}
      onInvitationToggle={handleInvitationToggle}
      onLastNameChange={handleLastNameChange}
      onNameChange={handleNameChange}
      onPlusOneChange={handlePlusOneChange}
      onSendByChange={handleSendByChange}
      onSexChange={handleSexChange}
      onTableChange={handleTableChange}
    />
  );
};

export default ItemContainer;
