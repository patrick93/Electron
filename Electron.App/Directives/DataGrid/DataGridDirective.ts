module electron {
    "use strict";

    interface IDataGridControllerScope {
        columns: Columns[];
        dataGrid: any[];
        getColumnTemplate(column: Columns): string;
        getDataTemplate(row: any, column: Columns): string;
    }

    interface IDataGridScope extends ng.IScope {
        columns: Columns[];
        gridData: any[];
    }

    class DataGridController implements IDataGridControllerScope {
        columns: Columns[];
        dataGrid: any[];

        static $inject = ["$scope"]
        constructor(private $scope: IDataGridScope) {
            this.columns = this.$scope.columns;
            this.dataGrid = this.$scope.gridData;
        }

        getColumnTemplate(column: Columns): string {
            var columnTpl: string = "default-column.html";
            if (column instanceof ColumnsAdd) {
                columnTpl = "add-column-header.html";
            }
            return columnTpl
        }

        getDataTemplate(column: Columns): string {
            var columnTpl: string = "default-row.html";
            if (column instanceof ColumnsAdd) {
                columnTpl = "add-column-data.html";
            }
            return columnTpl
        }
    }

    DataGridDirective.$inject = [];
    function DataGridDirective(): ng.IDirective {
        return {
            restrict: 'E',
            templateUrl: "Electron.App/Directives/DataGrid/DataGridDirective.html",
            controller: DataGridController,
            controllerAs: "dataGridCtrl",
            scope: {
                columns: '=',
                gridData: '='
            }
        }
    }

    angular.module('electron').directive('grid', DataGridDirective);
}
