"use client";

import { useEffect, useState } from "react";

export default function ToastOnce({ id, message }: { id: string; message: string }) {
  const key = `toast_once_${id}`;
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const seen = window.localStorage.getItem(key);
      if (seen) return;
      setShow(true);
      const t1 = window.setTimeout(() => setShow(false), 900);
      const t2 = window.setTimeout(() => window.localStorage.setItem(key, "1"), 1100);
      return () => {
        window.clearTimeout(t1);
        window.clearTimeout(t2);
      };
    } catch {
      // ignore
    }
  }, []);

  if (!show) return null;
  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-[132px] px-4 z-50">
      <div className="px-4 py-3 rounded-xl bg-black/80 text-white text-[12px]">{message}</div>
    </div>
  );
}
