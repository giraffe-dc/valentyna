"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();

  const handleVideoEnd = () => {
    router.push("/quest");
  };

  return (
    <main className={styles.main}>
      <div className={styles.videoContainer}>
        {/* Using a placeholder video if the user hasn't provided one yet */}
        <video
          className={styles.video}
          controls={true}
          autoPlay
          onEnded={handleVideoEnd}
          src="/history.mp4"
        >
          Your browser does not support the video tag.
        </video>
        {/* <div className={styles.overlay}>
           <p>Дивимося історію свята...</p>
        </div> */}
      </div>
    </main>
  );
}
