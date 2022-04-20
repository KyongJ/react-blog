import { useRef } from 'react';
import { debounce } from 'lodash';

export function useDebounce<T extends Function>(fn: T, wait = 1000) {
  const func = useRef(fn);
  func.current = fn
  const debounceWrapper = useRef(debounce((args:any) => func.current?.(args), wait));
  return (debounceWrapper.current as unknown) as T;
}
