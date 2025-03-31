/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference types="next" />
/// <reference types="framer-motion" />
/// <reference types="gsap" />

declare namespace React {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    [key: string]: any;
  }
  
  type ChangeEvent<T> = {
    target: T;
    preventDefault(): void;
  };
  
  type FormEvent = {
    preventDefault(): void;
  };
  
  type ReactNode = any;
  type RefObject<T> = { current: T | null };
}

declare namespace JSX {
  interface Element {}
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module 'react' {
  export function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
  export function useRef<T>(initialValue: T): React.RefObject<T>;
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  export type ReactNode = React.ReactNode;
  export type ChangeEvent<T> = React.ChangeEvent<T>;
  export type FormEvent = React.FormEvent;
  export default React;
}

declare module 'framer-motion' {
  export const motion: any;
}

declare module 'gsap' {
  export default gsap;
  const gsap: any;
}

declare module 'next/link' {
  const Link: any;
  export default Link;
}

declare module 'next/font/google' {
  export const Inter: any;
}

declare module 'next' {
  export type Metadata = {
    title?: string;
    description?: string;
    [key: string]: any;
  };
} 