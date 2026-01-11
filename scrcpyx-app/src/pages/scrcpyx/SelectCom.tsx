import {Check, ChevronDown, ChevronUp} from '@tamagui/lucide-icons'
import React from 'react'

import type {FontSizeTokens, SelectProps} from 'tamagui'
import {Adapt, getFontSize, Select, Sheet, YStack} from 'tamagui'
import {LinearGradient} from 'tamagui/linear-gradient'

export function SelectDemoContents(
    {val, setVal, items = [], ...props}: SelectProps<any> & { trigger?: React.ReactNode } & any
) {
    console.log("render demo constants")
    return (
        <Select
            value={val}
            onValueChange={setVal}
            disablePreventBodyScroll
            {...props}
        >
            {props?.trigger || (
                <Select.Trigger maxWidth={220} iconAfter={ChevronDown}>
                    <Select.Value placeholder="Something"/>
                </Select.Trigger>
            )}

            <Select.Content zIndex={200000}>
                <Select.ScrollUpButton
                    items="center"
                    justify="center"
                    position="relative"
                    width="100%"
                    height="$3"
                >
                    <YStack z={10}>
                        <ChevronUp size={20}/>
                    </YStack>
                    <LinearGradient
                        start={[0, 0]}
                        end={[0, 1]}
                        fullscreen
                        colors={['$background', 'transparent']}
                        rounded="$4"
                    />
                </Select.ScrollUpButton>

                <Select.Viewport minW={200}>
                    <Select.Group>
                        {/*<Select.Label>Fruits</Select.Label>*/}
                        {/* for longer lists memoizing these is useful */}
                        {React.useMemo(
                            () =>
                                items?.map((item, i) => {
                                    return (
                                        <Select.Item
                                            index={i}
                                            key={item.value}
                                            value={item.value.toLowerCase()}
                                        >
                                            <Select.ItemText>{item.label}</Select.ItemText>
                                            <Select.ItemIndicator marginLeft="auto">
                                                <Check size={16}/>
                                            </Select.ItemIndicator>
                                        </Select.Item>
                                    )
                                }),
                            [items]
                        )}
                    </Select.Group>
                    {props.native && (
                        <YStack
                            position="absolute"
                            r={0}
                            t={0}
                            b={0}
                            items="center"
                            justify="center"
                            width={'$4'}
                            pointerEvents="none"
                        >
                            <ChevronDown
                                size={getFontSize((props.size as FontSizeTokens) ?? '$true')}
                            />
                        </YStack>
                    )}
                </Select.Viewport>

                <Select.ScrollDownButton
                    items="center"
                    justify="center"
                    position="relative"
                    width="100%"
                    height="$3"
                >
                    <YStack z={10}>
                        <ChevronDown size={20}/>
                    </YStack>
                    <LinearGradient
                        start={[0, 0]}
                        end={[0, 1]}
                        fullscreen
                        colors={['transparent', '$background']}
                        rounded="$4"
                    />
                </Select.ScrollDownButton>
            </Select.Content>
        </Select>
    )
}
