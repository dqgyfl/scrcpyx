import {ScrollView, View, XStack} from "tamagui";
import React from "react";
import {FlashList} from "@shopify/flash-list";

export default function ListView({data, renderItem, horizontal = false}) {
    data = data || []
    // const children = data ? data.map((item, idx) => {
    //     const node = renderItem({index: idx, item: item})
    //     return <View key={idx}>{node}</View>
    // }) : null

    function renderItemWrap(...args) {
        return <View style={{marginHorizontal: 4}}>
            {renderItem(...args)}
        </View>
    }

    return (
        <ScrollView style={{paddingVertical: 4}} horizontal={horizontal} showsHorizontalScrollIndicator={false}>
            <FlashList data={data} horizontal={horizontal} renderItem={renderItemWrap} estimatedItemSize={80}/>
        </ScrollView>
    )
}
