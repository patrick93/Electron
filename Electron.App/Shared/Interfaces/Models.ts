module electron {
    'use strict';

    export class Entity {
        id: number;

        static Equals(entity1: Entity, entity2: Entity): boolean {
            return entity1.id === entity2.id;
        }

        static HasId(entity: Entity): boolean {
            return entity.id > 0;
        }
    }

    export class IUser extends Entity {
        Name: string;
        Age: number;
    }

    export class Operation extends Entity {
        Name: string;
        Type: OperationType;
    }

    enum OperationType {Active, Receptive}
}
