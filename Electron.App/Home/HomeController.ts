module electron {
    'use strict';

    interface IHomeScope {
        title: string;
        get(): void;
        delete(user: IUser): void;
        showModal(user?: IUser): void;
    }

    class HomeController implements IHomeScope {
        title: string;
        columns: Columns[];
        dataGrid: IUser[];

        static $inject = ["$mdDialog", "ColumnFactory"];
        constructor(private $mdDialog: angular.material.IDialogService,
                    private ColumnFactory: IColumnFactory) {
            this.title = "Teste";
            this.setColumns();
            this.get();
        }

        private setColumns(): void {
            this.columns = [
                this.ColumnFactory.makeAddColumn(() => { this.showModal(); },
                                                    (user:IUser) => {this.showModal(user)},
                                                    20),
                this.ColumnFactory.makeBaseColumn("Name", "Name"),
                this.ColumnFactory.makeBaseColumn("Age", "Age"),
                this.ColumnFactory.makeBaseColumn("Text", "Text"),
                this.ColumnFactory.makeDeleteColumn((user:IUser) => {this.delete(user)}, 20)
            ]
        }

        showModal(user?: IUser): void {
            this.$mdDialog.show({
                controller: AddModalUserController,
                controllerAs: "modalCtrl",
                templateUrl: "Electron.App/Home/AddModalUser.html",
                locals: {user: user}
            }).then((user: IUser) => {
                this.dataGrid.push(user);
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
            }, () => {console.log("canceled")});
        }

        private deleteFromGrid(user: IUser): void {
            var index: number;
            for (var i = 0; i < this.dataGrid.length; i++) {
                if (Entity.Equals(user, this.dataGrid[i])) {
                    index = i;
                    break;
                }
            }
            this.dataGrid.splice(index, 1);
        }

        get(): void {
            this.dataGrid = [
                {
                    ID: 1,
                    Name: "Patrick",
                    Age: 22
                },
                {
                    ID: 2,
                    Name: "Rodrigo",
                    Age: 24
                }
            ];
        }


    }

    angular.module('electron').controller('HomeController', HomeController);
}
