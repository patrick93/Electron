module electron {
    'use strict';

    interface IHomeScope {
        title: string;
        get(): void;
        delete(user: IUser): void;
        showModal(id?: number): void;
    }

    class HomeController extends electron.BaseModalController implements IHomeScope {
        title: string;

        static $inject = ["$mdDialog", "ColumnFactory", "UserDataService"];
        constructor($mdDialog: angular.material.IDialogService,
                    ColumnFactory: IColumnFactory,
                    UserDataService: IUserDataService) {
            super($mdDialog, ColumnFactory, UserDataService, "Teste", "Electron.App/Home/AddModalUser.html", AddModalUserController);
        }

        setBaseColumns(): Columns[] {
            return [
                this.ColumnFactory.makeBaseColumn("Name", "Name"),
                this.ColumnFactory.makeBaseColumn("Age", "Age"),
                this.ColumnFactory.makeBaseColumn("Text", "Text")];
        }
    }

    angular.module('electron').controller('HomeController', HomeController);
}
