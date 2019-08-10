/*
 * index.js
 * Copyright (C) 2019 brice <brice@US5CD9011ZWN>
 *
 * Distributed under terms of the MIT license.
 *
 *
 *
 *  all commands must be imported here and added
 *  to the Constructors object so they can be used.
 *
 *
 */
import TestCommand from './testCommand'
import CreateConfluenceCommand from '../commands/createConfluence.js'

export const Constructors = {
    TestCommand,
    CreateConfluenceCommand,
}

