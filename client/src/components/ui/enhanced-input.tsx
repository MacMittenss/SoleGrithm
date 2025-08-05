import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Check, X, Search } from 'lucide-react';
import { Input, InputProps } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface EnhancedInputProps extends Omit<InputProps, 'type'> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  icon?: React.ReactNode;
  type?: 'text' | 'email' | 'password' | 'search' | 'number';
  showPasswordToggle?: boolean;
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => boolean | string;
  };
  onValidation?: (isValid: boolean, message?: string) => void;
}

export function EnhancedInput({
  label,
  helperText,
  error,
  success,
  icon,
  type = 'text',
  showPasswordToggle = true,
  validation,
  onValidation,
  className,
  onChange,
  onBlur,
  value,
  ...props
}: EnhancedInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [validationError, setValidationError] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const actualType = type === 'password' && showPassword ? 'text' : type;
  const hasError = error || validationError;
  const displaySuccess = success && !hasError && isValid;

  const validateInput = (inputValue: string) => {
    if (!validation) return true;

    const { required, minLength, maxLength, pattern, custom } = validation;

    if (required && !inputValue.trim()) {
      setValidationError('This field is required');
      setIsValid(false);
      onValidation?.(false, 'This field is required');
      return false;
    }

    if (minLength && inputValue.length < minLength) {
      const message = `Minimum ${minLength} characters required`;
      setValidationError(message);
      setIsValid(false);
      onValidation?.(false, message);
      return false;
    }

    if (maxLength && inputValue.length > maxLength) {
      const message = `Maximum ${maxLength} characters allowed`;
      setValidationError(message);
      setIsValid(false);
      onValidation?.(false, message);
      return false;
    }

    if (pattern && !pattern.test(inputValue)) {
      const message = 'Invalid format';
      setValidationError(message);
      setIsValid(false);
      onValidation?.(false, message);
      return false;
    }

    if (custom) {
      const result = custom(inputValue);
      if (typeof result === 'string') {
        setValidationError(result);
        setIsValid(false);
        onValidation?.(false, result);
        return false;
      }
      if (!result) {
        const message = 'Invalid input';
        setValidationError(message);
        setIsValid(false);
        onValidation?.(false, message);
        return false;
      }
    }

    setValidationError('');
    setIsValid(true);
    onValidation?.(true);
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange?.(e);
    
    if (validation) {
      validateInput(newValue);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
    
    if (validation && e.target.value) {
      validateInput(e.target.value);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <div className="space-y-2">
      {/* Label */}
      {label && (
        <motion.label
          className={cn(
            "block text-sm font-medium transition-colors",
            hasError ? "text-red-600" : displaySuccess ? "text-green-600" : "text-foreground"
          )}
          animate={{
            color: hasError ? "#dc2626" : displaySuccess ? "#16a34a" : undefined
          }}
          htmlFor={props.id}
        >
          {label}
          {validation?.required && <span className="text-red-500 ml-1">*</span>}
        </motion.label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Leading Icon */}
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            {type === 'search' ? <Search className="h-4 w-4" /> : icon}
          </div>
        )}

        {/* Input */}
        <motion.div
          className="relative"
          whileTap={{ scale: 0.995 }}
        >
          <Input
            ref={inputRef}
            type={actualType}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={cn(
              "transition-all duration-200",
              icon && "pl-10",
              (type === 'password' && showPasswordToggle) && "pr-20",
              (displaySuccess || hasError) && "pr-10",
              hasError && "border-red-500 focus:border-red-500 focus:ring-red-500",
              displaySuccess && "border-green-500 focus:border-green-500 focus:ring-green-500",
              isFocused && "ring-2 ring-primary/20",
              className
            )}
            {...props}
          />

          {/* Focus Ring Animation */}
          <motion.div
            className="absolute inset-0 rounded-md border-2 border-primary pointer-events-none"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{
              opacity: isFocused ? 0.2 : 0,
              scale: isFocused ? 1 : 1.02
            }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>

        {/* Trailing Icons */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          {/* Validation Icons */}
          <AnimatePresence>
            {displaySuccess && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Check className="h-4 w-4 text-green-500" />
              </motion.div>
            )}
            {hasError && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <X className="h-4 w-4 text-red-500" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Password Toggle */}
          {type === 'password' && showPasswordToggle && (
            <motion.button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              whileTap={{ scale: 0.95 }}
              data-testid="password-toggle"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </motion.button>
          )}
        </div>
      </div>

      {/* Helper Text / Error Message */}
      <AnimatePresence>
        {(helperText || hasError) && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={cn(
              "text-xs transition-colors",
              hasError ? "text-red-600" : "text-muted-foreground"
            )}
          >
            {hasError || helperText}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}