import { ComponentPropsWithRef, useId, forwardRef, type Ref } from "react";
import { FieldError } from "react-hook-form";


type Props = {
    label:string;
    error?: FieldError;
    inputClassName?:string;
    labelClassName?:string;
    value?:string;
} & ComponentPropsWithRef<'textarea'>

export const Textarea = forwardRef(({ label,error,inputClassName,labelClassName,value, ...rest } : Props, ref: Ref<HTMLTextAreaElement>) => {
    const id = useId();
    return (
        <div className='my-2'>
                <label htmlFor={id} className={labelClassName}>{label}</label>
                <textarea id={id} ref={ref}  {...rest} value={value} className={inputClassName}/>
                {error && <p className='text-red-500'>{error.message}</p>}
            </div>
    )
});