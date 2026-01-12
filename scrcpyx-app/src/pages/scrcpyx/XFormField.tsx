import {Input, Switch, View} from 'tamagui'
import {SelectDemoContents} from "@/pages/scrcpyx/SelectCom";

export type FormColumn = {
    prop: string
    label?: string
    type?: 'input' | 'number' | 'select' | 'switch' | 'custom'
    span?: number
    display?: boolean | ((model: any) => boolean)
    disabled?: boolean | ((model: any) => boolean)
    required?: boolean
    rules?: ((value: any, model: any) => string | null)[]
    options?: { label: string; value: any }[]
}

export type FormGroup = {
    label?: string
    tabs?: boolean
    column: FormColumn[]
}

export type FormOption = {
    column: FormColumn[]
    group?: FormGroup[]
    tabs?: boolean
    labelWidth?: number
}

export function FormField({
                              column,
                              value,
                              onChange,
                              disabled, ...props
                          }: any) {
    if (column.render) {
        return column.render({value, onChange, column})
    }
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")

    switch (column.type) {
        case 'number':
            return (
                <Input
                    keyboardType="numeric"
                    value={String(value ?? '')}
                    onChangeText={(v) => onChange(Number(v))}
                    disabled={disabled}
                    {...props}
                />
            )
        case 'select':
            return (
                <SelectDemoContents val={value} setVal={onChange} items={column.options} required={column.required} {...props} />
            )
        case 'switch':
            return (
                <Switch checked={!!value} onCheckedChange={onChange}
                        {...props}
                />
            )
        default:
            return (
                <Input
                    value={value ?? ''}
                    onChangeText={onChange}
                    disabled={disabled}
                    {...props}
                />
            )
    }
}

