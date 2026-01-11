import {ScrollView, View, XStack} from "tamagui";
import React from "react";

export default function ListView({data, renderItem, horizontal = false}) {
    data = data || []
    const children = data ? data.map((item, idx) => {
        const node = renderItem({index: idx, item: item})
        return <View key={idx}>{node}</View>
    }) : null
    return (
        <ScrollView style={{paddingVertical: 4}} horizontal={horizontal} showsHorizontalScrollIndicator={false}>
            <XStack gap="$2">
                {children}
            </XStack>
        </ScrollView>
    )
}
