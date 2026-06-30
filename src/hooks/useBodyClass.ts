"use client";

import { useEffect } from "react";

/**
 * Toggles a class on the document root while `active` is true. Used to raise the
 * DISK's recovery aura across the whole interface from any component.
 */
export function useBodyClass(className: string, active: boolean) {
  useEffect(() => {
    const root = document.documentElement;
    if (active) root.classList.add(className);
    else root.classList.remove(className);

    return () => root.classList.remove(className);
  }, [className, active]);
}
