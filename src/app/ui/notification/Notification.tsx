"use client";

import { useNotification, useNotify } from "./NotificationContext";
import { useRef } from "react";
import styles from "./style.module.css";

const iconSuccess = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M9 12l2 2l4 -4" />
  </svg>
);

const iconInfo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
    <path d="M12 9h.01" />
    <path d="M11 12h1v4h1" />
  </svg>
);

const iconError = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </svg>
);

const iconClose = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </svg>
);

const Notification = () => {
  const notif = useNotification();
  const notify = useNotify();
  const k = useRef(0); // different key to retrigger animation by re-rendering the div on content change
  k.current++;

  if (!notif) return null;

  return (
    <div className={styles.notificationContainer}>
      <div
        key={"notification-" + k.current}
        // className={`notification ${notif.type ? notif.type : "info"}`}
        className={`${styles.notification} ${
          styles[notif.type ? notif.type : "info"]
        }`}
      >
        {notif.type && notif.type === "error"
          ? iconError()
          : notif.type === "success"
          ? iconSuccess()
          : iconInfo()}
        {notif.message}
        <button className={styles.close} onClick={() => notify(null)}>
          {iconClose()}{" "}
        </button>
      </div>
    </div>
  );
};

export default Notification;
