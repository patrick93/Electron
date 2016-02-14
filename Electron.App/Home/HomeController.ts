module electron {
    'use strict';

    interface IHomeScope {
        title: string;
        get(): void;
        delete(user: IUser): void;
        showModal(id?: number): void;
    }

    class HomeController implements IHomeScope {
        title: string;
        columns: Columns[];
        dataGrid: IUser[];

        static $inject = ["$mdDialog", "ColumnFactory", "UserDataService"];
        constructor(private $mdDialog: angular.material.IDialogService,
                    private ColumnFactory: IColumnFactory,
                    private UserDataService: IUserDataService) {
            this.title = "Teste";
            this.setColumns();
            this.get();
        }

        private setColumns(): void {
            this.columns = [
                this.ColumnFactory.makeAddColumn(() => { this.showModal(); },
                                                    (user:IUser) => {this.showModal(user.id)},
                                                    20),
                this.ColumnFactory.makeBaseColumn("Name", "Name"),
                this.ColumnFactory.makeBaseColumn("Age", "Age"),
                this.ColumnFactory.makeBaseColumn("Text", "Text"),
                this.ColumnFactory.makeDeleteColumn((user:IUser) => {this.delete(user)}, 20)
            ]
        }

        showModal(id?: number): void {
            this.$mdDialog.show({
                controller: AddModalUserController,
                controllerAs: "modalCtrl",
                templateUrl: "Electron.App/Home/AddModalUser.html",
                locals: {id: id}
            }).then((user: IUser) => {
                this.get();
            }, () => {
                console.log("canceled")
            });
        }

        delete(user: IUser): void {
            var confirm: angular.material.IConfirmDialog = this.$mdDialog.confirm()
                .title("Atenção")
                .textContent("Tem certeza que quer deletar?")
                .ok("Confirmar")
                .cancel("Cancelar");

            this.$mdDialog.show(confirm).then(() => {
                this.deleteFromGrid(user);
            }, () => {
                console.log("canceled")
            });
        }

        private deleteFromGrid(user: IUser): void {
            this.UserDataService.delete(user.id).then((user: IUser): void => {
                console.log("Usuario deletado");
                this.get();
            }, (message: string): void => {
                console.log(message);
            });
        }

        get(): void {
            this.UserDataService.get().then((data: IUser[]): void => {
                this.dataGrid = data;
            }, (message: string): void => {
                console.log(message);
            })
        }
    }

    angular.module('electron').controller('HomeController', HomeController);
}
