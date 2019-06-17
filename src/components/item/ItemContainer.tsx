import { Spec } from 'immutability-helper';
import React, { ChangeEvent, useCallback } from 'react';
import { GuestInfo, Invitation } from '../list/ListConnect';
import Item from './Item';

interface ItemContainerProps {
  invitation: Invitation;

  updateInvitations(spec: Spec<Invitation[]>): void;
}

const ItemContainer = (props: ItemContainerProps) => {
  const { updateInvitations, invitation } = props;
  const { id } = invitation;
  const updateGuestInfo = useCallback((guestInfo: Spec<GuestInfo>) => {
    // @ts-ignore
    updateInvitations({
      [id]: { guestInfo },
    });
  }, [id, updateInvitations]);
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

  return (
    <Item
      invitation={invitation}
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
