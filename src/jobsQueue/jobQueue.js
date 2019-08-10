/*
 * jobQueue.js
 * Copyright (C) 2019 brice <brice@US5CD9011ZWN>
 *
 * import this file on a page and add jobs to job queue
 * with the add function:
 *      jobQueue.add(job)
 * jobs must be json serializable so jobs should be in the format
 *      {
 *          name:"CommandClassConstructorName", // this is the string name of the command class. "Command" will be added to the end of the string.
 *          args:['arg1','arg2'],               // this is an array of constructor arguments in order.
 *      }
 */

import Queue from 'bull';
import {statusQueue} from './statusQueue.js';
import {Constructors}  from '../commandBus';

var jobQueue = new Queue('jobs');

jobQueue.process(async (job,done)=>{
    // since jobs data has to be serializable I can't send real class instances
    // so I have to pass the class name and the arguments, then instantiate the
    // class here. The Construtors object holds references to all command classes
    // then you spread the args and call it as a constructor. Then you will have
    // an executable command;
    let command = new Constructors[job.data.name+"Command"](...job.data.args)
    try{
        let result = await command.execute();
        result.service = job.data.service;
        done(null,result);
    }catch(e){
        statusQueue.add({
            success:false,
            projectId:job.data.projectId,
            jobId:job.id,
            result:e.message,
        });
        done(e.message,"failed:"+e.message);
    }

    jobQueue.on('failed',
        (job,err)=>{
            statusQueue.add({
                success:false,
                projectId:job.data.projectId,
                jobId:job.id,
                result:err.message,
            });
            console.log("job queue error",err);
        }
    );

    jobQueue.on('completed',
        (job,res)=>{
            statusQueue.add({
                jobId:job.id,
                projectId:job.data.projectId,
                success:true,
                result:res,
                service:job.data.service,
            });
        });
});

export {jobQueue};
