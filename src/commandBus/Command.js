/*
 * Command.js
 * Copyright (C) 2019 brice <brice@US5CD9011ZWN>
 *
 * Distributed under terms of the MIT license.
 *
 * Command Parent class this is abstract and should not be instantiated
 * you should create a new command in src/commandBus/ it should contain
 * a constructor and an execut method.
 */
export default class Command{

    /*
     * All Command subclasses must implememt this execute method
     * or they will always throw an error
     */
    execute(){
        throw new Error("This Method Must Be Implemented inside "+ this.constructor.name);
    }

}
