var auth = require('./auth'),
    users = require('../controllers/users'),
    brews = require('../controllers/brews'),
    recipes = require('../controllers/recipes');

module.exports = function (app) {
    // user stuff
    app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
    app.post('/api/users', users.createUser);
    app.put('/api/users', users.updateUser);
    app.post('/login', auth.authenticate);
    app.post('/logout', function (req, res) {
        req.logout();
        res.end();
    });
    
    // brews
    app.get('/api/brews', brews.getAllBrews); // TODO: maybe require admin role "all" retrieval?
    app.get('/api/brews/:id', brews.getBrewById);
    app.get('/api/brews/user/:id', brews.getBrewsByUserId);
    app.post('/api/brews', brews.saveNewBrew);
    app.put('/api/brews', brews.updateBrew);
    app.delete('/api/brews/:id', brews.deleteBrew);
    
    // recipes
    app.get('/api/recipes', recipes.getRecipes); // TODO: maybe require admin role for "all" retrieval?
    app.get('/api/recipes/:id', recipes.getRecipeById);
    app.get('/api/recipes/user/:id', recipes.getRecipesByUserId);
    app.post('/api/recipes', recipes.saveNewRecipe);
    app.put('/api/recipes', recipes.updateRecipe);
    
    // views
    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    // default    
    app.all('/api/*', function (req, res) {
        res.send(404);
    });
    
    app.get('*', function (req, res) {
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
};
