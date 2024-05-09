import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(className, "flex-1")}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot> & {
    prefixIcon?: React.ReactNode;
    suffixIcon?: React.ReactNode;
    showErrorIcon?: boolean;
  }
>(({ prefixIcon, suffixIcon, showErrorIcon, ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  if (showErrorIcon === false) {
    return (
      <Slot
        ref={ref}
        id={formItemId}
        className={cn(error ? "!ring-destructive/50 border-destructive" : "")}
        aria-describedby={
          !error
            ? `${formDescriptionId}`
            : `${formDescriptionId} ${formMessageId}`
        }
        aria-invalid={!!error}
        {...props}
      />
    );
  }
  return (
    <div className="relative w-full">
      {prefixIcon ? (
        <span className="absolute z-[1] bottom-0 left-3 inline-flex items-center justify-center inset-y-0">
          {prefixIcon}
        </span>
      ) : null}

      <Slot
        ref={ref}
        id={formItemId}
        className={cn(error ? "!ring-destructive/50 border-destructive" : "")}
        aria-describedby={
          !error
            ? `${formDescriptionId}`
            : `${formDescriptionId} ${formMessageId}`
        }
        aria-invalid={!!error}
        {...props}
      />

      {error ? (
        <HoverCard>
          <HoverCardTrigger
            asChild
            className="absolute right-0 inline-flex inset-y-0 px-3 items-center justify-center text-destructive"
          >
            <span>
              <Info className="w-4 h-4" />
            </span>
          </HoverCardTrigger>
          <HoverCardContent className="w-auto p-3 text-sm">
            {error.message}
          </HoverCardContent>
        </HoverCard>
      ) : suffixIcon ? (
        <span className="absolute z-[1] bottom-0 right-3 inline-flex items-center justify-center inset-y-0 ">
          {suffixIcon}
        </span>
      ) : null}
    </div>
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn(
        "text-sm font-medium text-destructive leading-none",
        className
      )}
      {...props}
    >
      {body}
    </p>
  );
});

FormMessage.displayName = "FormMessage";

const FormLabelWithMessage = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, children, ...props }, ref) => {
  const { formItemId } = useFormField();

  return (
    <div
      className={cn(className, "flex gap-4 justify-between overflow-hidden")}
    >
      <Label ref={ref} className="flex-auto" htmlFor={formItemId} {...props}>
        {children}
      </Label>
      <FormMessage />
    </div>
  );
});
FormLabelWithMessage.displayName = "FormLabelWithMessage";

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormLabelWithMessage,
  FormField,
};
