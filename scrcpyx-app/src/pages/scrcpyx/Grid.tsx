import {YStack, XStack, styled, View} from 'tamagui'
import React from 'react'

type ColProps = {
    span?: number // 1-24
    offset?: number // 0-23
    children?: React.ReactNode
}

type RowProps = {
    gutter?: number // spacing between columns
    justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'
    align?: 'start' | 'center' | 'end' | 'stretch'
    children?: React.ReactNode
}

// Column component
export const Col: React.FC<ColProps> = ({span = 24, offset = 0, children}) => {
    const widthPercent = (span / 24) * 100
    const marginLeftPercent = (offset / 24) * 100

    return (
        <View
            width={`${widthPercent}%`}
            height="100%"
            marginLeft={`${marginLeftPercent}%`}
            justifyContent="center"
            padding={"$2"}
        >
            {children}
        </View>
    )
}

// Row component
export const Row: React.FC<RowProps> = ({gutter = "$8", justify = 'space-between', align = 'start', children, ...props}) => {
    return (
        <XStack
            width="100%"
            flexWrap="nowrap"
            justifyContent={justify}
            alignItems={align}
            {...props}
        >
            {React.Children.map(children, child => (
                <>
                    {child}
                </>
            ))}
        </XStack>
    )
}

export const Grid = {
    Row, Col
}

// Example usage
export function GridExample() {
    return (
        <Row gutter={16}>
            <Col span={6}>
                <YStack backgroundColor="$gray5" padding={16}>Col 6</YStack>
            </Col>
            <Col span={6} offset={2}>
                <YStack backgroundColor="$gray4" padding={16}>Col 6 offset 2</YStack>
            </Col>
            <Col span={10}>
                <YStack backgroundColor="$gray3" padding={16}>Col 10</YStack>
            </Col>
        </Row>
    )
}
