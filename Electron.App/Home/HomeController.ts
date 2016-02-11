module electron {
    'use strict';

    interface IHomeScope {
        title: string;
        get(): void;
        add(): void;
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
                this.ColumnFactory.makeAddColumn(() => { this.add(); }),
                this.ColumnFactory.makeBaseColumn("Name", "Name"),
                this.ColumnFactory.makeBaseColumn("Age", "Age"),
                this.ColumnFactory.makeBaseColumn("Text", "Text")
            ]
        }

        get(): void {
            this.dataGrid = [
                {
                    Name: "Patrick",
                    Age: 22
                },
                {
                    Name: "Rodrigo",
                    Age: 24
                }
            ];
        }

        add(): void {
            this.$mdDialog.show({
                controller: electron.AddModalUserController,
                controllerAs: "modalCtrl",
                templateUrl: "Electron.App/Home/AddModalUser.html"
            }).then((user: IUser) => {
                this.dataGrid.push(user);
            }, () => {
                console.log("canceled")
            });
        }
    }

    angular.module('electron').controller('HomeController', HomeController);
}
