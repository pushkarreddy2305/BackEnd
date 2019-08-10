/*
 * testCommand.js
 * Copyright (C) 2019 brice <brice@US5CD9011ZWN>
 *
 * Distributed under terms of the MIT license.
 */

import Command from "../commandBus/Command";
import {createNewSpace,createNewPage} from '../services/confluence/createSpaceAndPage.js';

/*
 * this command creates confluece space and page.
 */
export default class CreateConfluenceCommand extends Command{

    key
    name
    description
    space
    title
    pageContent;

    /*
     * @param key string
     * @param name string
     * @param description string
     * @param space string
     * @param title string
     * @param pageContent string
     */
    constructor(key,name,description,space,title,pageContent){
        super();
        this.key = key;
        this.name = name;
        this.description = description;
        this.space = space;
        this.title=title;
        this.pageContent = pageContent;
    }

    async execute(){
        let newSpace = await createNewSpace(this.key,this.name,this.description);
        let newPageStatus  = await createNewPage(this.key,this.title,this.pageContent);
        return newSpace;
    }
}

