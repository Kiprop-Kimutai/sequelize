const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;
module.exports = {
    create(req, res) {
        return Todo.create({title: req.body.title}).then(todo => {
            res.status(201).send(todo);
        }).catch(error => res.status(400).send(error));
    },
    list(req,res) {
        console.log(process.env.api_key);
        if(!req.payload.id) {
            res.status(400).json({message: 'unauthorized route!'});
        }
        else {
        return Todo.findAll({
            include: [{
                model: TodoItem, 
                as: 'todoItems'
            }]
        }).then(todos => {res.status(200).send(todos)}).catch(err => {
            res.status(400).send(err);
        })
    }
    },
    retrieve(req, res) {
        return Todo.findByPk(req.params.todoId, {
            include: [{
                model: TodoItem,
                as: 'todoItems'
            }]
        }).then(todo => {
            if(!todo) {
                return res.status(404).send('Todo not found!')
            }
            return res.status(200).send(todo);
        }).catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return Todo.findByPk(req.params.todoId, {
            include: [{
                model: TodoItem,
                as: 'todoItems'
            }]
        }).then(todo => {
            if(!todo) {
                return res.status(404).send({message:'Todo Not Found'})
            }
            return todo.update({
                title: req.body.title || todo.title
            }).then(() => res.status(200).send(todo)) // send back the updated todo
            .catch(error => res.status(400).send(error))
        }).catch(error => res.status(404).send(error));
    },
    delete(req,res) {
        return Todo.findByPk(req.params.todoId).then(todo => {
            if(!todo) {
                res.status(400).send({message: 'Todo not found'});
            }
            return todo.destroy().then(() => {res.status(200).send(todo)}) //send back the deleted todo
            .catch(error => {res.status(400).send({message: error})});
        })
    }
}
