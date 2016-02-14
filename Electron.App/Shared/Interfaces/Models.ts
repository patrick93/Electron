module electron {
    'use strict';

    export class Entity {
        ID: number;

        static Equals(entity1: Entity, entity2: Entity) {
            return entity1.ID === entity2.ID;
        }
    }

    export class IUser extends Entity {
        Name: string;
        Age: number;
    }
}
