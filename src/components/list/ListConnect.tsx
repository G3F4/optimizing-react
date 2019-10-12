import { name, random } from 'faker';
import produce from 'immer';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import AppContext from '../../AppContext';
import List from './List';

const getNode = (selector: string) => document.querySelector(selector);

const addRenderTime = (time: number): void => {
  const timesNode = getNode('#times');
  const timeNode = getNode('#time');
  const timeNodeClone = timeNode && timeNode.cloneNode(true);

  if (timesNode && timeNodeClone) {
    timeNodeClone.textContent = `${time} ms`;
    timesNode.prepend(timeNodeClone);
    Array.from(timesNode.children).forEach((child: any, index) => {
      child.style.fontSize = `${48 - index * 4}px`;
    });
  }
};

export interface Invitation {
  id: string;
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
  guestInfo: {
    name: name.firstName(random.number({ min: 0, max: 1 })),
    lastName: name.lastName(random.number({ min: 0, max: 1 })),
    table: random.number({ min: 1, max: 10 }),
    plusOne: random.boolean(),
    sex: random.number({ min: 0, max: 2 }),
    sendBy: random.number({ min: 1, max: 4 }),
  },
});

let timer = Date.now();

const ListConnect = () => {
  const {
    value: { invitationsCount },
  } = useContext(AppContext);
  const [invitations, setInvitations] = useState(
    Array.from({ length: invitationsCount }, generateInvitation),
  );

  useEffect(() => {
    addRenderTime(Date.now() - timer);
  }, [invitations]);

  useEffect(() => {
    setInvitations(
      Array.from({ length: invitationsCount }, generateInvitation),
    );
  }, [invitationsCount]);

  const updateInvitation = useCallback((id: string, guestInfo: GuestInfo) => {
    timer = Date.now();
    setInvitations(value =>
      produce(value, draftValue => {
        draftValue[
          draftValue.findIndex(item => item.id === id)
        ].guestInfo = guestInfo;
      }),
    );
  }, []);

  return <List invitations={invitations} updateInvitation={updateInvitation} />;
};

export default ListConnect;
