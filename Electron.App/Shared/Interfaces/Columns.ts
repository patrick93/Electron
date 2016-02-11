module electron {
    'use strict';

    export class Columns {
        width: number;
    }

    export class ColumnsBase extends Columns{
        caption: string;
        model: string;
    }

    export class ColumnsAdd extends Columns {
        isAddEditColumn: boolean;
        AddFunction: () => void;
    }

    export class IUser {
        Name: string;
        Age: number;
    }
}
