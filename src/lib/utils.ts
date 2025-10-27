export type ClassValue = string | number | boolean | undefined | null | ClassValue[];

export function cn(...classes: ClassValue[]): string {
  return classes
    .flat()
    .filter((c) => typeof c === 'string' && c.length > 0)
    .join(' ');
}

export function isIOS(): boolean {
  return global.isIOS || false;
}

export function isAndroid(): boolean {
  return global.isAndroid || false;
}

export function getPlatformClass(): string {
  return isIOS() ? 'ios' : isAndroid() ? 'android' : '';
}
