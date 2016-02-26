module electron {
    "use strict";

    interface IBaseController {

    }

    export abstract class BaseController implements IBaseController {
        columns: Columns[];
        dataGrid: Entity[];

        constructor(protected $mdDialog: angular.material.IDialogService,
                    protected ColumnFactory: IColumnFactory,
                    protected DataService: IBaseDataService,
                    protected title: string) {
            this.setColumns();
            this.get();
        }

        private setColumns(): void {
            this.columns = [
                this.ColumnFactory.makeAddColumn(() => { this.add(); },
                                                    (entity:Entity) => {this.edit(entity.id)},
                                                    20)];
            this.columns = this.columns.concat(this.setBaseColumns());
            this.columns.push(this.ColumnFactory.makeDeleteColumn((entity:Entity) => {this.delete(entity)}, 20));
        }

        abstract setBaseColumns(): Columns[];

        abstract add(): void;

        abstract edit(id: number): void;

        delete(entity: Entity): void {
            var confirm: angular.material.IConfirmDialog = this.$mdDialog.confirm()
                .title("Atenção")
                .textContent("Tem certeza que quer deletar?")
                .ok("Confirmar")
                .cancel("Cancelar");

            this.$mdDialog.show(confirm).then(() => {
                this.deleteFromGrid(entity);
            }, () => {
                console.log("canceled")
            });
        }

        private deleteFromGrid(entity: Entity): void {
            this.DataService.delete(entity.id).then((entity: Entity): void => {
                console.log("Usuario deletado");
                this.get();
            }, (message: string): void => {
                console.log(message);
            });
        }

        get(): void {
            this.DataService.get().then((data: Entity[]): void => {
                this.dataGrid = data;
            }, (message: string): void => {
                console.log(message);
            })
        }
    }
}
