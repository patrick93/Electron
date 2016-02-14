module electron{
    "use strict";

    export class Columns {
        width: number;
        customHeader: string;
        customTemplate: string;
    }

    class ColumnsBase extends Columns{
        caption: string;
        model: string;
    }

    class ColumnsAdd extends Columns {
        AddFunction: () => void;
        EditFunction: (entity: Entity) => void;
    }

    class ColumnsDelete extends Columns {
        DeleteFunction: (entity: Entity) => void;
    }

    export interface IColumnFactory {
        makeAddColumn(addFunction: () => void, editFunction: (entity: Entity) => void, width?: number): ColumnsAdd;
        makeBaseColumn(caption: string, model: string, width?: number): ColumnsBase;
        makeDeleteColumn(deleteFunction: (entity: Entity) => void, width?: number) : ColumnsDelete;
    }

    class ColumnFactory implements IColumnFactory {
        makeAddColumn(addFunction: () => void, editFunction: (entity: Entity) => void, width?: number) : ColumnsAdd {
            var column: ColumnsAdd = new ColumnsAdd();
            column.AddFunction = addFunction;
            column.EditFunction = editFunction;
            column.width = width || null;
            column.customHeader = "add-column-header.html";
            column.customTemplate = "add-column-data.html";
            return column;
        }

        makeBaseColumn(caption: string, model: string, width?: number): ColumnsBase {
            var column: ColumnsBase = new ColumnsBase();
            column.caption = caption,
            column.model = model,
            column.width = width || null
            column.customHeader = "default-column.html";
            column.customTemplate = "default-row.html";
            return column;
        }

        makeDeleteColumn(deleteFunction: (entity: Entity) => void, width?: number) : ColumnsDelete {
            var column: ColumnsDelete = new ColumnsDelete();
            column.DeleteFunction = deleteFunction;
            column.width = width || null;
            column.customTemplate = "delete-column-data.html";
            return column;
        }
    }

    angular.module("electron").service("ColumnFactory", ColumnFactory);
}
