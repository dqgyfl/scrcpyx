import React, {useState} from 'react';
import {DynamicForm} from '@/pages/scrcpyx/XFrom';
import {FormOption} from "@/pages/scrcpyx/XFormField";

export default function AdvanceDemo() {
    const option: FormOption = {
        column: [
            {prop: 'name', label: 'Name', type: 'input', span: 12},
            {prop: 'age', label: 'Age', type: 'number', span: 12}
        ],
    }

    const [model, setModel] = useState({})

    return (
        <DynamicForm
            option={option}
            model={model}
            onChange={setModel}
        />)
}
