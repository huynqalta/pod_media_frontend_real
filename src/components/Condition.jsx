import React from "react";

const Condition = props => {

    const { If, ElseIf, Else } = props;

    const render = () => {
        if (If.condition) {
            return If.component || null;
        }

        if (ElseIf && Array.isArray(ElseIf)) {
            for (let index = 0; index < ElseIf.length; index++) {

                const conditionObject = ElseIf[ index ];
                if (!conditionObject) continue;

                const { condition, component } = conditionObject;
                if (!condition) continue;

                return component;
            }
        }

        if (!Else) return null;

        return Else;
    }

    return render();
}

export default Condition;