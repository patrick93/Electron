module electron{
    "use strict";

    export interface IColumnFactory {
        makeAddColumn(addFunction: () => void): ColumnsAdd;
        makeBaseColumn(caption: string, model: string): ColumnsBase;
    }

    class ColumnFactory implements IColumnFactory {
        makeAddColumn(addFunction: () => void, width?: number) : ColumnsAdd {
            return {
                isAddEditColumn: true,
                AddFunction: addFunction,
                width: null
            };
        }

        makeBaseColumn(caption: string, model: string, width?: number): ColumnsBase {
            return {
                caption: caption,
                model: model,
                width: null
            };
        }
    }

    angular.module("electron").service("ColumnFactory", ColumnFactory);
}
