// components/DynamicForm.tsx
import {Button, Card, Fieldset, Label, Text, XStack, YStack} from 'tamagui'
import {useMemo} from 'react'
import {FormField} from './XFormField'
import {FormGroup, FormOption} from "@/pages/scrcpyx/XFormField";

export function DynamicForm({
                                option,
                                model,
                                onChange,
                            }: {
    option: FormOption
    model: any
    onChange: (val: any) => void
    onSave: (val: any) => void
}) {

    const groups = useMemo<FormGroup[]>(() => {
        const first = [{column: option.column}]
        return option.group ? first.concat(option.group) : first
    }, [option])

    const update = (prop: string, value: any) => {
        onChange({...model, [prop]: value})
    }

    const isDisplay = (col: any) =>
        typeof col.display === 'function'
            ? col.display(model)
            : col.display !== false

    const isDisabled = (col: any) =>
        typeof col.disabled === 'function'
            ? col.disabled(model)
            : col.disabled === true

    return (
        <YStack gap="$4">
            {groups.map((group, gi) => (
                <Card key={gi} padding="$4">
                    {group.label && (
                        <Text fontWeight="700" marginBottom="$3">
                            {group.label}
                        </Text>
                    )}

                    <YStack flexWrap="wrap" gap="$4">
                        {group.column.map(col => {
                            if (!isDisplay(col)) return null

                            return (
                                <Fieldset horizontal
                                          key={col.prop}
                                          width={`${(col.span ?? 24) / 24 * 100}%`}
                                          gap="$2"
                                >
                                    <Label width={64} fontSize="$2">{col.label}</Label>
                                    <FormField
                                        flex={1}
                                        column={col}
                                        value={model[col.prop]}
                                        disabled={isDisabled(col)}
                                        onChange={(v: any) => update(col.prop, v)}
                                    />
                                </Fieldset>
                            )
                        })}
                    </YStack>
                </Card>
            ))}
        </YStack>
    )
}
