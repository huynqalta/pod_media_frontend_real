import React, { useMemo } from "react";

const Loop = props => {
    const { dataSet = [], onRender, memorize } = props;

    const _render = () => {
        const elements = [];

        for (let index = 0; index < dataSet.length; index++) {
            const elementData = dataSet[ index ];
            const element = onRender(elementData, index);
            if (!element) continue;

            elements.push(element);
        }

        return elements;
    }

    if (memorize) {
        return useMemo(() => {
            return _render();
        }, memorize);
    }

    return _render();
}

export default Loop;