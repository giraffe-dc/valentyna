"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function QuestPage() {
    const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds
    const [inputs, setInputs] = useState(["", "", "", "", "", ""]);
    const router = useRouter();
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;

        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !inputs[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputs.every((val) => val !== "")) {
            router.push("/finale");
        }
    };

    const isComplete = inputs.every((val) => val !== "");

    return (
        <main className={styles.main}>
            <div className={styles.timer}>{formatTime(timeLeft)}</div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGrid}>
                    {inputs.map((digit, idx) => (
                        <input
                            key={idx}
                            ref={(el) => { inputRefs.current[idx] = el; }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(idx, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(idx, e)}
                            className={`${styles.cell} ${styles[`cell${idx + 1}`]}`}
                            autoFocus={idx === 0}
                        />
                    ))}
                </div>

                <button type="submit" className={styles.button} disabled={!isComplete}>
                    Ввести пароль
                </button>
            </form>
        </main>
    );
}
