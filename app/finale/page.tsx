"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function FinalePage() {
    const [showDelayedVideo, setShowDelayedVideo] = useState(false);
    const [showNextButton, setShowNextButton] = useState(false);
    const [showFinalVideo, setShowFinalVideo] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowDelayedVideo(true);
        }, 10000); // 10 seconds

        return () => clearTimeout(timer);
    }, []);

    const handleDelayedVideoEnd = () => {
        setShowNextButton(true);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowFinalVideo(true);
        }, 300000); // 5 minute

        return () => clearTimeout(timer);
    }, []);



    return (
        <main className={styles.main}>
            <video
                autoPlay
                muted
                loop
                playsInline
                className={styles.videoBackground}
                src="/finale.mp4"
            >
                Your browser does not support the video tag.
            </video>

            {/* {!showDelayedVideo && (
                <div className={styles.content}>
                    <h1 className={styles.title}>Вітаємо!</h1>
                    <p className={styles.subtitle}>Ви впоралися з завданням! ❤️</p>
                    <p className={styles.info}>Зачекайте, зараз щось з&apos;явиться...</p>
                </div>
            )} */}

            {showDelayedVideo && (
                <div className={styles.videoOverlay}>
                    <video
                        className={styles.overlayVideo}
                        controls
                        // autoPlay
                        onEnded={handleDelayedVideoEnd}
                        src={showFinalVideo ? "/final.mp4" : "/bonus-story.mp4"}
                    >
                        Your browser does not support the video tag.
                    </video>

                    {/* {showNextButton && (
                        <button
                            className={styles.nextButton}
                            onClick={() => alert("Дякуємо за гру!")}
                        >
                            Далі
                        </button>
                    )} */}
                </div>
            )}
        </main>
    );
}
