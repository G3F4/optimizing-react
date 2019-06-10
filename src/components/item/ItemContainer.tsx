import React, { ChangeEvent, useCallback } from 'react';
import { Spec } from 'immutability-helper';
import { Invitation } from '../App';
import { GuestInfo } from '../list/ListConnect';
import Item from './Item';

interface ItemContainerProps {
  invitation: Invitation;

  updateInvitations(spec: Spec<Invitation[]>): void;
}

const ItemContainer = (props: ItemContainerProps) => {
  const { updateInvitations, invitation } = props;
  const { id, expanded } = invitation;
  const updateGuestInfo = useCallback((guestInfo: Spec<GuestInfo>) => {
    // @ts-ignore
    updateInvitations({
      [id]: { guestInfo },
    });
  }, [id, updateInvitations]);
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
    updateGuestInfo({
      name: {
        $set: event.target.value,
      },
    });
  }, [updateGuestInfo]);
  const handleLastNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    updateGuestInfo({
      lastName: {
        $set: event.target.value,
      },
    });
  }, [updateGuestInfo]);
  const handlePlusOneChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    updateGuestInfo({
      plusOne: {
        $set: event.target.checked,
      },
    });
  }, [updateGuestInfo]);
  const handleSexChange = useCallback((event: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
    // @ts-ignore
    updateGuestInfo({
      sex: {
        $set: event.target.value,
      },
    });
  }, [updateGuestInfo]);
  const handleTableChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    updateGuestInfo({
      table: {
        $set: event.target.value,
      },
    });
  }, [updateGuestInfo]);
  const handleSendByChange = useCallback((_event: ChangeEvent<{}>, value: string) => {
    // @ts-ignore
    updateGuestInfo({
      sendBy: {
        $set: value,
      },
    });
  }, [updateGuestInfo]);

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
