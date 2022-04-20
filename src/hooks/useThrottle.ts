/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef } from 'react';

// 节流
export default function useThrottle(fn: () => void, delay: number, dep = []) {
    const { current } = useRef<any>({ fn, timer: null });
    useEffect(() => {
        current.fn = fn;
    }, [fn]);

    return useCallback((...args) => {
        if (!current.timer) {
            current.timer = setTimeout(() => {
                delete current.timer;
            }, delay);
            current.fn(...args);
        }
    }, dep);
}
