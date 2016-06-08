const seneca = require('seneca')();
const io = require('socket.io')(3002);
const oplog = require('mongo-oplog')('mongodb://127.0.0.1:3001/local/', {
  ns: 'tasks-tasks',
}).tail();


oplog.on('insert', (doc) => {
  const task = doc.o;
  io.emit('created', task._id, task);
});

oplog.on('update', (doc) => {
  const id = doc.o2._id;
  const fields = doc.o.$set;
  io.emit('updated', id, fields);
});

oplog.on('delete', (doc) => {
  const id = doc.o._id;
  io.emit('created', task._id, task);
});

seneca.use('mongo-store', {name: 'tasks', host: '127.0.0.1', port: 3001 }).use('./tasks').listen();