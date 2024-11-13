import styles from "./not-found.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 | Page not found",
  description: "Page not found",
};

export default function Page() {
  const randomDuration = () => `${Math.random() + 1}s`;

  return (
    <div className={styles.page}>
      <main>
        <p className={styles.title}>
          <span style={{ animationDuration: randomDuration() }}>4</span>
          <span style={{ animationDuration: randomDuration() }}>0</span>
          <span style={{ animationDuration: randomDuration() }}>4</span>
        </p>
        <p>Page not found.</p>
        <a href={"/"}>back</a>
      </main>
    </div>
  );
}
