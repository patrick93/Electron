module electron {
    'use strict';

    interface IOperacaoScope {
        title: string;
        get(): void;
        delete(user: IUser): void;
        showModal(id?: number): void;
    }

    class OperacaoController extends electron.BaseController implements IOperacaoScope {
        title: string;

        static $inject = ["$mdDialog", "ColumnFactory", "UserDataService"];
        constructor($mdDialog: angular.material.IDialogService,
                    ColumnFactory: IColumnFactory,
                    UserDataService: IUserDataService) {
            super($mdDialog, ColumnFactory, UserDataService, "Teste");
        }

        setBaseColumns(): Columns[] {
            return [
                this.ColumnFactory.makeBaseColumn("Name", "Name"),
                this.ColumnFactory.makeBaseColumn("Type", "Type")];
        }
    }

    angular.module('electron').controller('OperacaoController', OperacaoController);
}
