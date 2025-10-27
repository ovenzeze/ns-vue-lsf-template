import { ref, computed } from 'nativescript-vue';

export type ValidationRule = (value: any) => string | null;

export interface FieldState {
  value: any;
  error: string | null;
  touched: boolean;
  rules: ValidationRule[];
}

export function useFormValidation() {
  const fields = ref<Record<string, FieldState>>({});

  const registerField = (name: string, rules: ValidationRule[] = []) => {
    fields.value[name] = {
      value: '',
      error: null,
      touched: false,
      rules,
    };
  };

  const validateField = (name: string): boolean => {
    const field = fields.value[name];
    if (!field) return true;

    for (const rule of field.rules) {
      const error = rule(field.value);
      if (error) {
        field.error = error;
        return false;
      }
    }

    field.error = null;
    return true;
  };

  const validateAll = (): boolean => {
    let isValid = true;
    for (const name in fields.value) {
      if (!validateField(name)) {
        isValid = false;
      }
    }
    return isValid;
  };

  const setFieldValue = (name: string, value: any) => {
    if (fields.value[name]) {
      fields.value[name].value = value;
      if (fields.value[name].touched) {
        validateField(name);
      }
    }
  };

  const setFieldTouched = (name: string, touched = true) => {
    if (fields.value[name]) {
      fields.value[name].touched = touched;
      if (touched) {
        validateField(name);
      }
    }
  };

  const getFieldError = (name: string): string | null => {
    return fields.value[name]?.error || null;
  };

  const resetForm = () => {
    for (const name in fields.value) {
      fields.value[name].value = '';
      fields.value[name].error = null;
      fields.value[name].touched = false;
    }
  };

  const isFormValid = computed(() => {
    return Object.values(fields.value).every((field) => !field.error);
  });

  return {
    registerField,
    validateField,
    validateAll,
    setFieldValue,
    setFieldTouched,
    getFieldError,
    resetForm,
    isFormValid,
    fields,
  };
}

export const ValidationRules = {
  required: (message = 'This field is required'): ValidationRule => {
    return (value: any) => {
      if (!value || (typeof value === 'string' && !value.trim())) {
        return message;
      }
      return null;
    };
  },

  minLength: (length: number, message?: string): ValidationRule => {
    return (value: any) => {
      if (value && value.length < length) {
        return message || `Must be at least ${length} characters`;
      }
      return null;
    };
  },

  maxLength: (length: number, message?: string): ValidationRule => {
    return (value: any) => {
      if (value && value.length > length) {
        return message || `Must be no more than ${length} characters`;
      }
      return null;
    };
  },

  email: (message = 'Invalid email address'): ValidationRule => {
    return (value: any) => {
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return message;
      }
      return null;
    };
  },

  pattern: (regex: RegExp, message = 'Invalid format'): ValidationRule => {
    return (value: any) => {
      if (value && !regex.test(value)) {
        return message;
      }
      return null;
    };
  },

  min: (minValue: number, message?: string): ValidationRule => {
    return (value: any) => {
      const num = Number(value);
      if (!isNaN(num) && num < minValue) {
        return message || `Must be at least ${minValue}`;
      }
      return null;
    };
  },

  max: (maxValue: number, message?: string): ValidationRule => {
    return (value: any) => {
      const num = Number(value);
      if (!isNaN(num) && num > maxValue) {
        return message || `Must be no more than ${maxValue}`;
      }
      return null;
    };
  },
};
