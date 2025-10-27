import { Dialogs } from '@nativescript/core';

export interface AlertOptions {
  title: string;
  message: string;
  okButtonText?: string;
}

export interface ConfirmOptions {
  title: string;
  message: string;
  okButtonText?: string;
  cancelButtonText?: string;
}

export interface PromptOptions {
  title: string;
  message?: string;
  okButtonText?: string;
  cancelButtonText?: string;
  defaultText?: string;
  inputType?: 'text' | 'password' | 'email';
}

export function useDialog() {
  const showAlert = async (options: AlertOptions): Promise<void> => {
    await Dialogs.alert({
      title: options.title,
      message: options.message,
      okButtonText: options.okButtonText || 'OK',
    });
  };

  const showConfirm = async (options: ConfirmOptions): Promise<boolean> => {
    return await Dialogs.confirm({
      title: options.title,
      message: options.message,
      okButtonText: options.okButtonText || 'OK',
      cancelButtonText: options.cancelButtonText || 'Cancel',
    });
  };

  const showPrompt = async (options: PromptOptions): Promise<string | null> => {
    const result = await Dialogs.prompt({
      title: options.title,
      message: options.message || '',
      okButtonText: options.okButtonText || 'OK',
      cancelButtonText: options.cancelButtonText || 'Cancel',
      defaultText: options.defaultText || '',
    });

    return result.result ? result.text : null;
  };

  const showActionSheet = async (
    title: string,
    cancelButtonText: string,
    actions: string[]
  ): Promise<string | null> => {
    const result = await Dialogs.action({
      title,
      cancelButtonText,
      actions,
    });

    return result;
  };

  return {
    showAlert,
    showConfirm,
    showPrompt,
    showActionSheet,
  };
}
