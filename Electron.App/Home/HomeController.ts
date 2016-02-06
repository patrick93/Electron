module electron {
    'use strict';

    interface IHomeScope {
        title: string;
        get(): void;
    }

    class HomeController implements IHomeScope {
        title: string;
        columns: IColumns[];
        dataGrid: IUser[];

        static $inject = [];
        constructor() {
            this.title = "Teste";
            this.setColumns();
            this.get();
        }

        private setColumns(): void {
            this.columns = [
                {
                    caption: "Name",
                    model: "Name"
                },
                {
                    caption: "Age",
                    model: "Age"
                },
                {
                    caption: "Text",
                    model: "Text"
                }
            ]
        }

        getData(row: IUser, column: IColumns): string {
            return row[column.model];
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
            ]
        }
    }

    angular.module('electron').controller('HomeController', HomeController);
}
