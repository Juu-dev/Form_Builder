import { useSelector, useDispatch } from "react-redux";

import "../TableStructure_CSS/toolBarHeader.css";

import {
    updateModal,
    updateItemTBGeneral,
    updateNode,
    incrementDropzone,
    updateGeneralPro,
    updateAllGenPro,
} from "../../../../features/builder";

function ToolBarHeader(props) {
    // --------------------------------------------------------------------
    // render toolbar of each component inside form is properties modifier
    // --------------------------------------------------------------------
    const dispatch = useDispatch();

    const dropzoneBorn = useSelector((state) => state.dropzoneBorn.value);
    const totalNode = useSelector((state) => state.totalNode.value);
    const allGenPro = useSelector((state) => state.allGenPro.value);

    var OrderDropzoneBorn = dropzoneBorn;

    const totalObject = JSON.parse(JSON.stringify(totalNode));
    const allGenObject = JSON.parse(JSON.stringify(allGenPro));

    const deleteObject = (array, birth, level) => {
        let indexNode = 0;

        array.forEach((ele) => {
            indexNode++;

            // Neu tim ra Object
            if (ele.dopzoneCurrent.birthOrder === birth) {
                deleteGenObject(ele.children, birth);
                return array.splice(indexNode - 1, 1);
            } else {
                if (ele.children !== []) {
                    if (level > ele.dopzoneCurrent.level) {
                        deleteObject(ele.children, birth, level);
                    }
                }
            }
        });

        return array;
    };

    const deleteGenObject = (arr, birth) => {
        // allGenObject[birth] = {};
        delete allGenObject[birth];

        subDeleteGenObject(arr);

        dispatch(updateAllGenPro({ ...allGenObject }));
    };

    const subDeleteGenObject = (arr) => {
        arr.forEach((ele) => {
            let birth = ele.dopzoneCurrent.birthOrder;
            if (ele.children !== []) {
                subDeleteGenObject(ele.children);
            }
            // allGenObject[birth] = {};
            delete allGenObject[birth];
        });
    };

    const copyObject = (array, birth, level) => {
        let indexNode = 0;

        array.forEach((ele) => {
            indexNode++;

            // Neu tim ra Object
            if (ele.dopzoneCurrent.birthOrder === birth) {
                OrderDropzoneBorn += ele.dopzoneCurrent.dropChild;
                let birthOrder = OrderDropzoneBorn;

                let childrenArray = ele.children.slice(0, ele.children.length);

                dispatch(incrementDropzone(OrderDropzoneBorn));
                const eleInsert = {
                    idParent: ele.idParent,
                    idName: ele.idName,
                    children: copyObjectChild(childrenArray),
                    dopzoneCurrent: {
                        level: ele.dopzoneCurrent.level,
                        birthOrder: birthOrder,
                        dropChild: ele.dopzoneCurrent.dropChild,
                    },
                };

                return array.splice(indexNode, 0, eleInsert);
            } else {
                if (ele.children !== []) {
                    if (level > ele.dopzoneCurrent.level) {
                        copyObject(ele.children, birth, level);
                    }
                }
            }
        });

        return array;
    };

    const copyObjectChild = (array) => {
        let indexNode = 0;
        array.forEach((ele) => {
            indexNode++;

            OrderDropzoneBorn += ele.dopzoneCurrent.dropChild;
            let birthOrder = OrderDropzoneBorn;
            dispatch(incrementDropzone(OrderDropzoneBorn));

            const eleInsert = {
                idParent: ele.idParent,
                idName: ele.idName,
                children: ele.child ? copyObjectChild(ele.child) : [],
                dopzoneCurrent: {
                    level: ele.dopzoneCurrent.level,
                    birthOrder: birthOrder,
                    dropChild: ele.dopzoneCurrent.dropChild,
                },
            };

            array.splice(indexNode - 1, 1, eleInsert);
        });
        return array;
    };

    return (
        <div className="toolBarHeader_container">
            <div className="toolBarHeader_title">{props.nameItemToolbox}</div>
            <i className="fa-solid fa-maximize"></i>
            <i
                className="fa-solid fa-pen-to-square"
                onClick={() => {
                    dispatch(updateGeneralPro({}));
                    dispatch(
                        updateModal({
                            check: true,
                            nameItem: props.nameItemToolbox,
                            orderBirth: props.orderNumber,
                            level: props.level,
                        })
                    );

                    dispatch(updateGeneralPro(allGenPro[props.orderNumber]));

                    dispatch(updateItemTBGeneral(props.nameItemToolbox));
                }}
            ></i>
            <i
                className="fa-solid fa-copy"
                onClick={() => {
                    dispatch(
                        updateNode([
                            ...copyObject(
                                totalObject,
                                props.orderNumber,
                                props.level
                            ),
                        ])
                    );
                }}
            ></i>
            <i
                className="fa-solid fa-trash-can"
                onClick={() => {
                    dispatch(
                        updateNode([
                            ...deleteObject(
                                totalObject,
                                props.orderNumber,
                                props.level
                            ),
                        ])
                    );
                }}
            ></i>
        </div>
    );
}

export default ToolBarHeader;
