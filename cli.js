#!/usr/bin/node
const {program} = require("commander");
const api=require('./index.js')
const pkg=require('./package.json')
if(process.argv.length===2){
     void api.showAll()
}
if(process.argv.length>=3){
program
    .version(pkg.version)

program
    .command('add')
    .description('add a task')
    .action((...args) => {
        const words=args[1].args.join('')
        api.add(words).then(()=>{console.log('添加成功')},()=>{console.log('添加失败')})
    });
program
    .command('clear')
    .description('clear all tasks')
    .action(() => {
        api.clear().then(()=>{console.log('清除成功')},()=>{console.log('清除失败')});
    });
program.parse();}

