import styles from "./style.module.css";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error | Recoz",
  description: "Error",
};

export default async function Error({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const message = (await searchParams).message;
  const randomDuration = () => `${Math.random() + 1}s`;
  return (
    <div className={styles.page}>
      <main>
        <p className={styles.title}>
          <span style={{ animationDuration: randomDuration() }}>O</span>
          <span style={{ animationDuration: randomDuration() }}>O</span>
          <span style={{ animationDuration: randomDuration() }}>P</span>
          <span style={{ animationDuration: randomDuration() }}>S</span>
          <span style={{ animationDuration: randomDuration() }}>!</span>
        </p>
        <p className={styles.message}>{message}</p>
        <a href={"/"}>back</a>
      </main>
    </div>
  );
}
