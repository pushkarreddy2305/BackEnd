/*
 * testCommand.js
 * Copyright (C) 2019 brice <brice@US5CD9011ZWN>
 *
 * Distributed under terms of the MIT license.
 */

import Command from "./Command";

export default class TestCommand extends Command{

    message = "";

    constructor(message){
        super();
        this.message = message;
    }

    execute(){ return 'executing: ' + this.message;}
}

