const db=require('./db.js')
const inquirer = require('inquirer');
module.exports . add =async (title) => {
const list=await db.read()
    list.push({title:title,done:false})
    await db.write(list)
};

module.exports .clear=async ()=>{
    await db.write([])
}
function done(list,index){
    list[index].done=true
     db.write(list).then(()=>{console.log('添加成功')},()=>{console.log('添加失败')})
}
function undone(list,index){
    list[index].done=false
    db.write(list).then(()=>{console.log('添加成功')},()=>{console.log('添加失败')})
}
function update(list,index){
    inquirer.prompt(
        {
            type: 'input',
            name: 'title',
            message: "请输入新任务",
        }
    ).then((answer) => {
        list[index].title=answer.title
        db.write(list).then(()=>{console.log('添加成功')},()=>{console.log('添加失败')})
    });
}
function remove(list,index){
    list.splice(index,1)
    db.write(list).then(()=>{console.log('添加成功')},()=>{console.log('添加失败')})
}
function askAndCreateTask(list){
    inquirer.prompt(
        {
            type: 'input',
            name: 'title',
            message: "请输入任务",
        }
    ).then((answer) => {
        list.push({title:answer.title,done:false})
        db.write(list).then(()=>{console.log('添加成功')},()=>{console.log('添加失败')})
    });
}
function operateTask(list,index){
    const actions={done,undone,update,remove}
    inquirer.prompt([
        {
            type:'list',
            name:'action',
            message:'请选择操作',
            choices:[
                {name:'退出',value:'quit'},
                {name:'已完成',value:'done'},
                {name:'未完成',value:'undone'},
                {name:'修改任务',value:'update'},
                {name:'删除',value:'remove'},
            ]
        }
    ]).then((answer2)=>{
        const action=actions[answer2.action]
        action && action(list,index)
        }
    )
}
function printTask(list){
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'index',
                message: '请选择你想操作的任务',
                choices: [{name:'退出',value:-1},...list.map((task,index)=>{
                    return {name:`${task.done?'[x]':'[_]'} ${index+1} - ${task.title}`,value:index}
                }),{name:'创建新任务',value: -2}
                ],
            },
        ])
        .then((answer) => {
            const index=parseInt(answer.index)
            if (index>=0){
                operateTask(list,index)
            }else if (index===-2){
                askAndCreateTask(list)
            }
        });
}
module.exports .showAll=async ()=>{
    const list=await db.read()
    printTask(list)
}