module electron {
    "use strict";


    export class AddOperacaoController extends electron.BaseModalController<Operation> {

        static $inject = ['$mdDialog', 'id', 'OperacaoDataService'];
        constructor(protected $mdDialog: angular.material.IDialogService,
                    id: number,
                    protected OperacaoDataService:IOperacaoDataService){
            super($mdDialog, id, OperacaoDataService);
        }

        GetTypes(): OperationType[] {
            return [
                OperationType.Active,
                OperationType.Receptive
            ]
        }

        GetType(type: number): string {
            return OperationType[type];
        }
    }

    angular.module("electron").controller("AddOperacaoController", AddOperacaoController);
}
