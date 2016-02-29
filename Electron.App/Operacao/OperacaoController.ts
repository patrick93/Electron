module electron {
    'use strict';

    interface IOperacaoScope {
        title: string;
        get(): void;
        delete(user: IUser): void;
        showModal(id?: number): void;
    }

    class OperacaoController extends electron.CRUDModalController implements IOperacaoScope {
        title: string;

        static $inject = ["$mdDialog", "ColumnFactory", "OperacaoDataService"];
        constructor($mdDialog: angular.material.IDialogService,
                    ColumnFactory: IColumnFactory,
                    OperacaoDataService: IOperacaoDataService) {
            super($mdDialog, ColumnFactory, OperacaoDataService, "Operacao", "Electron.App/Operacao/AddOperacaoModal.html", AddOperacaoController);
        }

        setBaseColumns(): Columns[] {
            return [
                this.ColumnFactory.makeBaseColumn("Name", "Name"),
                this.ColumnFactory.makeBaseColumn("Type", "Type")];
        }
    }

    angular.module('electron').controller('OperacaoController', OperacaoController);
}
