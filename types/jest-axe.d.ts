import 'jest';

declare module 'jest' {
  interface Matchers<R> {
    toHaveNoViolations(): R;
  }
}

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveNoViolations(): R;
    }
  }
}

export {};

// Provide a lightweight module declaration for the runtime 'jest-axe' package
declare module 'jest-axe' {
  export interface AxeResults {
    violations?: any[];
    passes?: any[];
    inapplicable?: any[];
    incomplete?: any[];
  }

  export function axe(node: HTMLElement | Document, options?: any): Promise<AxeResults>;
  export function toHaveNoViolations(results: AxeResults): { pass: boolean; message: () => string };

  export {};
}
