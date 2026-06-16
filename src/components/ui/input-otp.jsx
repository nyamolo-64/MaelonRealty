import * as React from "react";

const InputOTP = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={`flex items-center gap-2 ${className || ""}`} {...props}>
    {children}
  </div>
));
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`flex items-center ${className || ""}`} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`relative flex h-10 w-10 items-center justify-center border border-input text-sm rounded-md ${className || ""}`}
    {...props}
  />
));
InputOTPSlot.displayName = "InputOTPSlot";

export { InputOTP, InputOTPGroup, InputOTPSlot };