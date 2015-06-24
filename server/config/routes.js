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
    app.get('/api/brews', brews.getBrews);
    app.get('/api/brews/:id', brews.getBrewById);
    
    // recipes
    app.get('/api/recipes', recipes.getRecipes);
    app.get('/api/recipes/:id', recipes.getRecipeById);
    
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
