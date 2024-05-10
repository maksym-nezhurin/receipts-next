import { Checkbox } from "@/components/ui/checkbox"

export function CheckboxItem(props: any) {
    const { onChange, checked = true, id, label, ...rest } = props;
    return (
        <div className="flex items-center space-x-2">
            <Checkbox id={id} checked={checked} onCheckedChange={onChange} {...rest} />
            <label
                htmlFor={id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                {label}
            </label>
        </div>
    )
}