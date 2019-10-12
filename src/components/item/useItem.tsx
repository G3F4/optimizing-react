import produce from 'immer';
import { ChangeEvent, useCallback } from 'react';
import { GuestInfo, Invitation } from '../list/useList';

interface UseItem {
  (
    invitation: Invitation,
    updateInvitation: (id: string, guestInfo: GuestInfo) => void,
  ): {
    invitation: Invitation;

    onNameChange(event: ChangeEvent<HTMLInputElement>): void;
    onLastNameChange(event: ChangeEvent<HTMLInputElement>): void;
    onPlusOneChange(event: ChangeEvent<HTMLInputElement>): void;
    onSexChange(
      event: ChangeEvent<{ name?: string | undefined; value: unknown }>,
    ): void;
    onTableChange(event: ChangeEvent<HTMLInputElement>): void;
    onSendByChange(_event: ChangeEvent<{}>, value: string): void;
  };
}

const useItem: UseItem = (invitation, updateInvitation) => {
  const { id } = invitation;
  const updateGuestInfo = useCallback(
    (guestInfo: GuestInfo) => {
      updateInvitation(id, guestInfo);
    },
    [id, updateInvitation],
  );
  const onNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      updateGuestInfo(
        produce(invitation.guestInfo, draft => {
          draft.name = event.target.value;
        }),
      );
    },
    [updateGuestInfo, invitation.guestInfo],
  );
  const onLastNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      updateGuestInfo(
        produce(invitation.guestInfo, draft => {
          draft.lastName = event.target.value;
        }),
      );
    },
    [updateGuestInfo, invitation.guestInfo],
  );
  const onPlusOneChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      updateGuestInfo(
        produce(invitation.guestInfo, draft => {
          draft.plusOne = event.target.checked;
        }),
      );
    },
    [updateGuestInfo, invitation.guestInfo],
  );
  const onSexChange = useCallback(
    (event: ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
      updateGuestInfo(
        produce(invitation.guestInfo, draft => {
          draft.sex = parseInt(event.target.value as string, 10);
        }),
      );
    },
    [updateGuestInfo, invitation.guestInfo],
  );
  const onTableChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      updateGuestInfo(
        produce(invitation.guestInfo, draft => {
          draft.table = parseInt(event.target.value, 10);
        }),
      );
    },
    [updateGuestInfo, invitation.guestInfo],
  );
  const onSendByChange = useCallback(
    (_event: ChangeEvent<{}>, value: string) => {
      updateGuestInfo(
        produce(invitation.guestInfo, draft => {
          draft.sendBy = parseInt(value, 10);
        }),
      );
    },
    [updateGuestInfo, invitation.guestInfo],
  );

  return {
    invitation,
    onLastNameChange,
    onNameChange,
    onPlusOneChange,
    onSendByChange,
    onSexChange,
    onTableChange,
  };
};

export default useItem;
