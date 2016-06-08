module.exports = function tasks() {
  const seneca = this;

  seneca.add({role: 'tasks', cmd: 'create' }, function (msg,done){
    seneca.make$('tasks',msg.task).save$(done);
  });
  seneca.add({role: 'tasks', cmd: 'check' }, function (msg,done){
    seneca.make$('tasks').load$({id:msg.id}, (error,task) =>{
      if(error) {
        done(error);
      } else {
        task.data$({checked: msg.checked}).save$(done);
      }
    });
  });
  seneca.add({role: 'tasks', cmd: 'remove' }, function (msg,done){
    seneca.make$('tasks').remove$({id: msg.id },done);
  });
  seneca.add({role: 'tasks', cmd: 'list' }, function (msg,done){
    seneca.make$('tasks').list$(done);
  });

};