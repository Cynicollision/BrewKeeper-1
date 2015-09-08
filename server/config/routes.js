var auth = require('./auth'),
    users = require('../controllers/user'),
    brew = require('../controllers/brew'),
    recipe = require('../controllers/recipe');

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
    app.get('/api/brew', brew.getAllBrews); // TODO: maybe require admin role "all" retrieval?
    app.get('/api/brew/:id', brew.getBrewById);
    app.get('/api/brew/user/:id', brew.getBrewsByUserId);
    app.post('/api/brew', brew.saveNewBrew);
    app.put('/api/brew', brew.updateBrew);
    app.delete('/api/brew/:id', brew.deleteBrew);
    
    // recipes
    app.get('/api/recipe', recipe.getRecipes); // TODO: maybe require admin role for "all" retrieval?
    app.get('/api/recipe/:id', recipe.getRecipeById);
    app.get('/api/recipe/user/:id', recipe.getRecipesByUserId);
    app.post('/api/recipe', recipe.saveNewRecipe);
    app.put('/api/recipe', recipe.updateRecipe);
    
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
