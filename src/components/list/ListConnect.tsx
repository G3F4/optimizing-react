import React, { useCallback, useContext, useEffect, useState } from 'react';
import update, { Spec } from 'immutability-helper';
import { name, random } from 'faker';
import AppContext from '../../AppContext';
import List from './List';

const addRenderTime = (time: number): void => {
  {
    // @ts-ignore
    const timesNode = window.document.querySelector('#times');
    // @ts-ignore
    const clone = window.document.querySelector('#time').cloneNode( true );
    clone.textContent = `${time} ms`;
    // @ts-ignore
    timesNode.prepend(clone);
    Array.from(timesNode!.children).forEach((child, index) => {
      // @ts-ignore
      child.style.fontSize = `${48 - index * 4}px`;
    });
  }
};

export interface Invitation {
  id: string;
  expanded: boolean;
  guestInfo: GuestInfo;
}

export interface GuestInfo {
  name: string;
  lastName: string;
  table: number;
  plusOne: boolean;
  sex: number;
  sendBy: number;
}

const generateInvitation = (_: any, id: number): Invitation => ({
  id: id.toString(),
  expanded: false,
  guestInfo: {
    name: name.firstName(random.number({ min: 0, max: 1 })),
    lastName: name.lastName(random.number({ min: 0, max: 1 })),
    table: random.number({ min: 1, max: 10 }),
    plusOne: random.boolean(),
    sex: random.number({ min: 1, max: 3 }),
    sendBy: random.number({ min: 1, max: 4 }),
  },
});

let timer = Date.now();

const ListConnect = () => {
  const { value: { invitationsCount } } = useContext(AppContext);
  const [invitations, setInvitations] = useState(Array.from({ length: invitationsCount }, generateInvitation));

  useEffect(() => {
    addRenderTime(Date.now() - timer);
  }, [invitations]);

  useEffect(() => {
    setInvitations(Array.from({ length: invitationsCount }, generateInvitation));
  }, [invitationsCount]);

  const handleSaveAll = useCallback((): void => {
    setInvitations(update(invitations, {
      $apply: (it: Invitation[]) => it.map(invitation => ({ ...invitation, expanded: false })),
    }));
  }, [invitations]);
  const handleEditAll = useCallback((): void => {
    setInvitations(update(invitations, {
      $apply: (it: Invitation[]) => it.map(invitation => ({ ...invitation, expanded: true })),
    }));
  }, [invitations]);
  const updateInvitations = useCallback((spec: Spec<Invitation[]>) => {
    timer = Date.now();
    setInvitations(value => update(value, spec));
  }, [invitationsCount]);

  console.log(['ListConnect.render'])

  return (
    <List
      invitations={invitations}
      updateInvitations={updateInvitations}
      onSaveAll={handleSaveAll}
      onEditAll={handleEditAll}
    />
  );
};

export default ListConnect;
