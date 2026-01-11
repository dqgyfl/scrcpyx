import {ScrollView, View} from "react-native";
import React from "react";

export default function ListView({data, renderItem, horizontal = false}) {
    data = data || []
    const children = data ? data.map((item, idx) => {
        const node = renderItem({index: idx, item: item})
        return <View key={idx}>{node}</View>
    }) : null
    return (
        <ScrollView style={{paddingVertical: 4}} horizontal={horizontal} showsHorizontalScrollIndicator={false}>
            <View style={{
                flexDirection: "row",
                flexWrap: horizontal ? "nowrap" : "wrap",
                alignItems: "flex-start",
                alignContent: "flex-end",
                justifyContent: "center",
                rowGap: 8,
                columnGap: 12
            }}>
                {children}
            </View>
        </ScrollView>
    )
}
