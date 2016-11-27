(function () {
    'use strict';

    var auth = require('./auth'),
        config = require('./config'),
        users = require('../controllers/user'),
        brew = require('../controllers/brew'),
        recipe = require('../controllers/recipe');
    
    module.exports = function (app) {
        // authentication
        app.post('/login', auth.authenticate);
        app.post('/logout', function (req, res) {
            req.logout();
            res.end();
        });

        // accounts
        app.post('/api/users', users.createUser);
        app.put('/api/users', users.updateUser);

        // brews
        app.get('/api/brew/:id', brew.getBrewById);
        app.get('/api/brew/user/count/:id', brew.getBrewCountByUserId);
        app.get('/api/brew/user/:id', brew.getBrewsByUserId);
        app.get('/api/brew/user/first/:id', brew.getFirstBrewByDate);
        app.post('/api/brew', brew.saveNewBrew);
        app.put('/api/brew', brew.updateBrew);
        app.delete('/api/brew/:id', brew.deleteBrew);

        // recipes
        app.get('/api/recipe/:id', recipe.getRecipeById);
        app.get('/api/recipe/user/:id', recipe.getRecipesByUserId);
        app.get('/api/recipe/user/count/:id', recipe.getRecipeCountByUserId);
        app.get('/api/recipe/user/top/:id', recipe.getTopRecipes);
        app.post('/api/recipe', recipe.saveNewRecipe);
        app.put('/api/recipe', recipe.updateRecipe);
        app.delete('/api/recipe/:id', recipe.deleteRecipe);
        app.get('/api/recipe/count/:id', recipe.getRecipeBrewCountById);
        
        // views
        app.get('/partials/*', function (req, res) {
            res.render('../../public/app/' + req.params[0]);
        });
        
        // debug
        if (config.debug) {
            app.get('/api/debug/brews/', brew.debugGetAllBrews);
        }
        
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
})();
