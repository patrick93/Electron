module electron {
    "use strict";

    interface IDataGridControllerScope {
        columns: Columns[];
        dataGrid: any[];
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
