"use client";

import { createContext, useReducer, useContext } from "react";
import { useRef } from "react";

type NotificationType = "success" | "error" | "info";

type State = {
  message: string;
  type?: NotificationType;
} | null;

type NotificationContextType = [State, React.Dispatch<ActionType>];

type ActionType = {
  message: string;
  type?: NotificationType;
  duration?: number;
} | null;

const NotificationContext = createContext<NotificationContextType>([
  null,
  () => {},
]);

export const NotificationProvider = (props: React.PropsWithChildren) => {
  const timeout = useRef<null | ReturnType<typeof setTimeout>>(null);

  const [Notification, NotificationDispatcher] = useReducer(
    (state: State, action: ActionType) => {
      if (timeout.current) {
        clearTimeout(timeout.current);
        timeout.current = null;
      }
      if (!action) return null;
      if (action.duration !== Infinity) {
        timeout.current = setTimeout(
          () => NotificationDispatcher(null),
          action.duration ? action.duration * 1000 : 5000
        );
      }
      return { type: action.type, message: action.message };
    },
    null
  );

  return (
    <NotificationContext.Provider
      value={[Notification, NotificationDispatcher]}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext)[0];
export const useNotify = () => useContext(NotificationContext)[1];

export default NotificationContext;
