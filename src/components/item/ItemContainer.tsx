import produce from 'immer';
import React, { ChangeEvent, useCallback } from 'react';
import { GuestInfo, Invitation } from '../list/ListConnect';
import Item from './Item';

interface ItemContainerProps {
  invitation: Invitation;

  updateInvitation(id: string, guestInfo: GuestInfo): void;
}

const ItemContainer = (props: ItemContainerProps) => {
  const { updateInvitation, invitation } = props;
  const { id } = invitation;
  const updateGuestInfo = useCallback(
    (guestInfo: GuestInfo) => {
      updateInvitation(id, guestInfo);
    },
    [id, updateInvitation],
  );
  const handleNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      updateGuestInfo(
        produce(invitation.guestInfo, draft => {
          draft.name = event.target.value;
        }),
      );
    },
    [updateGuestInfo, invitation.guestInfo],
  );
  const handleLastNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      updateGuestInfo(
        produce(invitation.guestInfo, draft => {
          draft.lastName = event.target.value;
        }),
      );
    },
    [updateGuestInfo, invitation.guestInfo],
  );
  const handlePlusOneChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      updateGuestInfo(
        produce(invitation.guestInfo, draft => {
          draft.plusOne = event.target.checked;
        }),
      );
    },
    [updateGuestInfo, invitation.guestInfo],
  );
  const handleSexChange = useCallback(
    (event: ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
      updateGuestInfo(
        produce(invitation.guestInfo, draft => {
          draft.sex = parseInt(event.target.value as string, 10);
        }),
      );
    },
    [updateGuestInfo, invitation.guestInfo],
  );
  const handleTableChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      updateGuestInfo(
        produce(invitation.guestInfo, draft => {
          draft.table = parseInt(event.target.value, 10);
        }),
      );
    },
    [updateGuestInfo, invitation.guestInfo],
  );
  const handleSendByChange = useCallback(
    (_event: ChangeEvent<{}>, value: string) => {
      updateGuestInfo(
        produce(invitation.guestInfo, draft => {
          draft.sendBy = parseInt(value, 10);
        }),
      );
    },
    [updateGuestInfo, invitation.guestInfo],
  );

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
